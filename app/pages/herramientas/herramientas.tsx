import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { DriveBrowser, type DriveBrowserCrumb, type DriveBrowserItem } from "~/components/organisms";
import { content } from "~/constants/content";
import type { DriveKind, DriveLibrary } from "~/lib/drive.server";

export function meta() {
  return [
    { title: `${content.tools.title} | ${content.brand}` },
    { name: "description", content: content.tools.description },
  ];
}

const kinds: Record<DriveKind, string> = content.tools.kinds;
const LIBRARY_TTL = 60_000;
const libraryMemory = new Map<string, DriveLibrary>();

function readLibrary(query: string) {
  const known = libraryMemory.get(query);
  if (known) return known;
  if (typeof sessionStorage === "undefined") return null;
  const raw = sessionStorage.getItem(`drive-library:${query}`);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { savedAt: number; library: DriveLibrary };
    if (Date.now() - parsed.savedAt > LIBRARY_TTL) return null;
    libraryMemory.set(query, parsed.library);
    return parsed.library;
  } catch {
    return null;
  }
}

function rememberLibrary(query: string, library: DriveLibrary) {
  if (!library.connected || library.error) return;
  libraryMemory.set(query, library);
  try {
    sessionStorage.setItem(`drive-library:${query}`, JSON.stringify({ savedAt: Date.now(), library }));
  } catch {
    /* La lista queda en memoria aunque el navegador bloquee el almacenamiento. */
  }
}

export default function Herramientas() {
  const [search] = useSearchParams();
  const query = search.toString();
  const [library, setLibrary] = useState<DriveLibrary | null>(() => readLibrary(query));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const known = readLibrary(query);
    if (known) setLibrary(known);
    else {
      setLibrary(null);
      setFailed(false);
    }

    fetch(query ? `/herramientas/datos?${query}` : "/herramientas/datos", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("load");
        return (await response.json()) as DriveLibrary;
      })
      .then((data) => {
        if (controller.signal.aborted) return;
        rememberLibrary(query, data);
        setLibrary(data);
        setFailed(false);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (!controller.signal.aborted && !readLibrary(query)) setFailed(true);
      });

    return () => controller.abort();
  }, [query]);

  const devDetail =
    import.meta.env.DEV && library && !library.connected
      ? library.error === "config"
        ? content.tools.setup
        : library.error
          ? content.tools.errors[library.error]
          : content.tools.unavailable
      : import.meta.env.DEV && library?.error
        ? content.tools.errors[library.error]
        : undefined;
  const failure = failed || Boolean(library && (!library.connected || library.error));
  const items: DriveBrowserItem[] = (library?.items ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    meta: kinds[item.kind],
    href: item.href,
    previewSrc: item.previewSrc,
    view: item.view,
  }));
  const crumbs: DriveBrowserCrumb[] = [
    { name: content.tools.root, href: "/herramientas" },
    ...(library?.crumbs ?? []),
  ];

  return (
    <DriveBrowser
      title={content.tools.title}
      description={content.tools.description}
      crumbs={library?.inFolder ? crumbs : []}
      items={items}
      connected={Boolean(library?.connected)}
      loading={!library && !failed}
      loadingLabel={content.tools.loading}
      failure={
        failure
          ? {
              title: content.tools.failureTitle,
              hint: content.tools.failureHint,
              detail: devDetail,
            }
          : undefined
      }
      emptyLabel={content.tools.empty}
      closeLabel={content.tools.close}
      downloadLabel={content.tools.download}
      previewLabel={content.tools.preview}
      previewFallback={content.tools.previewFallback}
    />
  );
}
