import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { nodeFileTrace } from "@vercel/nft";

const root = process.cwd();
const serverDir = path.join(root, "build/server");
const bundles = existsSync(serverDir)
  ? readdirSync(serverDir).filter((name) => existsSync(path.join(serverDir, name, "index.js")))
  : [];
const bundleDir = bundles.length === 1 ? path.join(serverDir, bundles[0]) : serverDir;
const serverBuild = path.join(bundleDir, "index.js");

if (!existsSync(serverBuild)) {
  throw new Error("No está el build del servidor. Corré react-router build primero.");
}

const entry = path.join(bundleDir, "vercel-entry.mjs");
writeFileSync(
  entry,
  `import { createRequestListener } from "@react-router/node";
import { RouterContextProvider } from "react-router";
import * as serverBuild from "./index.js";

const build = serverBuild.default ?? serverBuild;

export default createRequestListener({
  build,
  getLoadContext() {
    return new RouterContextProvider();
  },
});
`,
);

const traced = await nodeFileTrace([entry], {
  base: root,
  processCwd: root,
});
const output = path.join(root, ".vercel/output");
const functionDir = path.join(output, "functions/index.func");
rmSync(output, { recursive: true, force: true });
mkdirSync(functionDir, { recursive: true });

for (const file of traced.fileList) {
  if (file === ".env" || file.startsWith(".env/") || file.startsWith(".env.")) continue;
  const source = path.join(root, file);
  if (!existsSync(source)) continue;
  const target = path.join(functionDir, file);
  mkdirSync(path.dirname(target), { recursive: true });
  cpSync(source, target);
}

cpSync(path.join(root, "build/client"), path.join(output, "static"), { recursive: true });

const handler = path.relative(root, entry).split(path.sep).join("/");
writeFileSync(
  path.join(functionDir, ".vc-config.json"),
  `${JSON.stringify(
    {
      runtime: "nodejs22.x",
      handler,
      launcherType: "Nodejs",
      shouldAddHelpers: false,
      supportsResponseStreaming: true,
    },
    null,
    2,
  )}\n`,
);
writeFileSync(
  path.join(output, "config.json"),
  `${JSON.stringify(
    {
      version: 3,
      routes: [
        { handle: "filesystem" },
        { src: "/(.*)", dest: "index" },
        { handle: "hit" },
      ],
    },
    null,
    2,
  )}\n`,
);

console.log(`Salida de Vercel lista: ${handler}`);
