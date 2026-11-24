import { createSign } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { data } from "react-router";

const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.readonly";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const FOLDER_MIME = "application/vnd.google-apps.folder";

export type DriveKind = "folder" | "document" | "sheet" | "slides" | "file";

export type DriveEntry = {
  id: string;
  name: string;
  kind: DriveKind;
  shared?: boolean;
  modifiedTime?: string;
  href?: string;
  previewSrc?: string;
  view?: "image" | "video" | "frame" | "pptx";
};

export type DriveCrumb = {
  name: string;
  href: string;
};

export type DriveLibrary = {
  connected: boolean;
  error?: "config" | "auth" | "disabled" | "missing" | "read";
  inFolder: boolean;
  crumbs: DriveCrumb[];
  items: DriveEntry[];
};

type GoogleFile = {
  id?: string;
  name?: string;
  mimeType?: string;
  modifiedTime?: string;
  parents?: string[];
};

let dotEnv: Record<string, string> | null = null;

function readDotEnv() {
  if (dotEnv) return dotEnv;
  dotEnv = {};
  const file = path.resolve(process.cwd(), ".env");
  if (!existsSync(file)) return dotEnv;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    dotEnv[key] = value;
  }
  return dotEnv;
}

function serverEnv(name: string) {
  return process.env[name] || readDotEnv()[name];
}

function serviceAccount() {
  const email = serverEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL")?.trim();
  const rawKey = serverEnv("GOOGLE_PRIVATE_KEY")?.trim().replace(/^["']|["']$/g, "");
  if (!email || !rawKey) return null;
  return { email, privateKey: rawKey.replace(/\\n/g, "\n") };
}

function safeId(value: string | null) {
  if (!value || !/^[a-zA-Z0-9_-]{10,}$/.test(value)) return null;
  return value;
}

function kindOf(mimeType: string): DriveKind {
  if (mimeType === FOLDER_MIME) return "folder";
  if (mimeType === "application/vnd.google-apps.document") return "document";
  if (mimeType === "application/vnd.google-apps.spreadsheet") return "sheet";
  if (
    mimeType === "application/vnd.google-apps.presentation" ||
    mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    return "slides";
  }
  return "file";
}

function viewOf(mimeType: string): "image" | "video" | "frame" | "pptx" {
  if (mimeType.startsWith("image/") || mimeType === "application/vnd.google-apps.drawing") return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation") return "pptx";
  return "frame";
}

function libraryRoot() {
  return safeId(serverEnv("GOOGLE_DRIVE_FOLDER_ID") ?? null);
}

function folderHref(id: string, driveId: string | null) {
  const params = new URLSearchParams({ folder: id });
  if (driveId) params.set("drive", driveId);
  return `/herramientas?${params.toString()}`;
}

let cachedToken: { value: string; expiresAt: number } | null = null;

function serviceAssertion(email: string, privateKey: string) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const claim = Buffer.from(
    JSON.stringify({
      iss: email,
      scope: DRIVE_SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  ).toString("base64url");
  const unsigned = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  return `${unsigned}.${signer.sign(privateKey).toString("base64url")}`;
}

async function ownerAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const account = serviceAccount();
  if (!account) return null;

  let assertion: string;
  try {
    assertion = serviceAssertion(account.email, account.privateKey);
  } catch {
    return null;
  }

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!response.ok) return null;
  const payload = (await response.json()) as { access_token?: string; expires_in?: number };
  if (!payload.access_token) return null;
  cachedToken = {
    value: payload.access_token,
    expiresAt: Date.now() + (payload.expires_in ?? 3600) * 1000,
  };
  return payload.access_token;
}

async function driveGet<T>(token: string, path: string) {
  const response = await fetch(`https://www.googleapis.com${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 401) return { unauthorized: true as const, disabled: false, payload: null };
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: { errors?: Array<{ reason?: string }> };
    } | null;
    const disabled = body?.error?.errors?.some((error) => error.reason === "accessNotConfigured") ?? false;
    return { unauthorized: false as const, disabled, payload: null };
  }
  return { unauthorized: false as const, disabled: false, payload: (await response.json()) as T };
}

function toEntry(file: GoogleFile, driveId: string | null): DriveEntry | null {
  if (!file.id || !file.name || !file.mimeType) return null;
  const kind = kindOf(file.mimeType);
  return {
    id: file.id,
    name: file.name,
    kind,
    modifiedTime: file.modifiedTime,
    href: kind === "folder" ? folderHref(file.id, driveId) : undefined,
    previewSrc: kind === "folder" ? undefined : `/herramientas/archivo/${file.id}`,
    view: kind === "folder" ? undefined : viewOf(file.mimeType),
  };
}

async function listChildren(token: string, folderId: string, driveId: string | null) {
  const items: DriveEntry[] = [];
  let pageToken = "";

  for (let page = 0; page < 3; page += 1) {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "nextPageToken,files(id,name,mimeType,modifiedTime)",
      orderBy: "folder,name",
      pageSize: "100",
      supportsAllDrives: "true",
      includeItemsFromAllDrives: "true",
    });
    if (driveId) {
      params.set("corpora", "drive");
      params.set("driveId", driveId);
    } else {
      params.set("corpora", "user");
    }
    if (pageToken) params.set("pageToken", pageToken);

    const result = await driveGet<{ files?: GoogleFile[]; nextPageToken?: string }>(
      token,
      `/drive/v3/files?${params.toString()}`,
    );
    if (result.disabled) return { unauthorized: false as const, disabled: true, items: null };
    if (result.unauthorized) return { unauthorized: true as const, disabled: false, items };
    if (!result.payload) return { unauthorized: false as const, disabled: false, items: null };

    for (const file of result.payload.files ?? []) {
      const entry = toEntry(file, driveId);
      if (entry) items.push(entry);
    }
    pageToken = result.payload.nextPageToken ?? "";
    if (!pageToken) break;
  }

  return { unauthorized: false as const, disabled: false, items };
}

async function folderChain(token: string, folderId: string, driveId: string | null) {
  const chain: DriveCrumb[] = [];
  let current: string | undefined = folderId;

  for (let depth = 0; depth < 8 && current && current !== "root"; depth += 1) {
    const result: { unauthorized: boolean; payload: GoogleFile | null } = await driveGet<GoogleFile>(
      token,
      `/drive/v3/files/${current}?fields=id,name,parents&supportsAllDrives=true`,
    );
    if (!result.payload?.id || !result.payload.name) break;
    chain.unshift({
      name: result.payload.name,
      href: folderHref(result.payload.id, driveId),
    });
    const parent: string | undefined = result.payload.parents?.[0];
    if (!parent || parent === "root" || parent === libraryRoot()) break;
    current = parent;
  }

  return chain;
}

export async function loadDriveLibrary(request: Request) {
  const folderId = safeId(new URL(request.url).searchParams.get("folder"));
  const empty = (connected: boolean, error?: DriveLibrary["error"]): DriveLibrary => ({
    connected,
    error,
    inFolder: false,
    crumbs: [],
    items: [],
  });

  const root = libraryRoot();
  if (!serviceAccount() || !root) return data(empty(false, "config"));

  const token = await ownerAccessToken();
  if (!token) return data(empty(false, "auth"));

  const visible = await folderVisible(token, root);
  if (visible === "disabled") return data(empty(true, "disabled"));
  if (visible === "missing") return data(empty(true, "missing"));

  const current = folderId ?? root;
  if (folderId && !(await withinLibrary(token, folderId, root))) return data(empty(true));

  const listed = await listChildren(token, current, null);
  if (listed.disabled) return data(empty(true, "disabled"));
  if (listed.unauthorized || !listed.items) return data(empty(true, "read"));

  const library: DriveLibrary = {
    connected: true,
    inFolder: Boolean(folderId),
    crumbs: folderId ? await folderChain(token, folderId, null) : [],
    items: listed.items,
  };
  return data(library);
}

async function folderVisible(token: string, folderId: string) {
  const result = await driveGet<GoogleFile>(
    token,
    `/drive/v3/files/${folderId}?fields=id,mimeType&supportsAllDrives=true`,
  );
  if (result.disabled) return "disabled" as const;
  if (!result.payload?.id || (result.payload.mimeType && result.payload.mimeType !== FOLDER_MIME)) {
    return "missing" as const;
  }
  return "ok" as const;
}

async function withinLibrary(token: string, fileOrFolderId: string, root: string) {
  if (fileOrFolderId === root) return true;

  let current: string | undefined = fileOrFolderId;
  for (let depth = 0; depth < 8 && current && current !== "root"; depth += 1) {
    const result: { unauthorized: boolean; payload: GoogleFile | null } = await driveGet<GoogleFile>(
      token,
      `/drive/v3/files/${current}?fields=id,parents&supportsAllDrives=true`,
    );
    if (!result.payload) return false;
    const parent: string | undefined = result.payload.parents?.[0];
    if (!parent) return root === "root";
    if (parent === root || (parent === "root" && root === "root")) return true;
    current = parent;
  }

  return false;
}

export async function openDriveFile(fileId: string, request?: Request) {
  const id = safeId(fileId);
  const token = await ownerAccessToken();
  if (!id || !token) return new Response(null, { status: 404 });

  const metaResult: { unauthorized: boolean; payload: GoogleFile | null } = await driveGet<GoogleFile>(
    token,
    `/drive/v3/files/${id}?fields=id,name,mimeType,parents&supportsAllDrives=true`,
  );
  const file = metaResult.payload;
  if (!file?.id || !file.mimeType || !file.name || file.mimeType === FOLDER_MIME) {
    return new Response(null, { status: 404 });
  }
  const root = libraryRoot();
  if (!root || !(await withinLibrary(token, file.id, root))) {
    return new Response(null, { status: 404 });
  }

  const googleExport = exportMime(file.mimeType);
  const upstream = googleExport
    ? await fetch(
        `https://www.googleapis.com/drive/v3/files/${id}/export?mimeType=${encodeURIComponent(googleExport)}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
    : await fetch(
        `https://www.googleapis.com/drive/v3/files/${id}?alt=media&supportsAllDrives=true`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
  if (!upstream.ok || !upstream.body) return new Response(null, { status: 404 });

  const contentType = googleExport || file.mimeType;
  const download = request ? new URL(request.url).searchParams.get("download") === "1" : false;
  const filename = exportedName(file.name, googleExport);
  return new Response(upstream.body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "private, max-age=300",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function exportedName(name: string, exported: string | null) {
  if (exported === "application/pdf" && !name.toLowerCase().endsWith(".pdf")) return `${name}.pdf`;
  if (exported === "image/png" && !name.toLowerCase().endsWith(".png")) return `${name}.png`;
  return name;
}

function exportMime(mimeType: string) {
  if (mimeType === "application/vnd.google-apps.drawing") return "image/png";
  if (
    mimeType === "application/vnd.google-apps.document" ||
    mimeType === "application/vnd.google-apps.spreadsheet" ||
    mimeType === "application/vnd.google-apps.presentation"
  ) {
    return "application/pdf";
  }
  return null;
}
