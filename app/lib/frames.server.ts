import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const FRAME_DIRS = [
  path.resolve("public/frames"),
  path.resolve("/Users/u632303/Desktop/animacion-cafetera/output"),
];

const FRAME_NAME = /^frame_\d{4}\.webp$/;

export async function readFrame(name: string): Promise<Uint8Array | null> {
  if (!FRAME_NAME.test(name)) return null;

  for (const directory of FRAME_DIRS) {
    const filePath = path.resolve(directory, name);
    if (!filePath.startsWith(`${directory}${path.sep}`)) continue;
    try {
      const info = await stat(filePath);
      if (!info.isFile()) continue;
      return await readFile(filePath);
    } catch {
      continue;
    }
  }

  return null;
}
