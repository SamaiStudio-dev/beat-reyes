import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const FRAMES_DIR = path.resolve(
  "/Users/u632303/Desktop/animacion-cafetera/output",
);

const FRAME_NAME = /^frame_\d{4}\.png$/;

export async function readFrame(name: string): Promise<Uint8Array | null> {
  if (!FRAME_NAME.test(name)) return null;

  const filePath = path.resolve(FRAMES_DIR, name);
  if (!filePath.startsWith(`${FRAMES_DIR}${path.sep}`)) return null;

  try {
    const info = await stat(filePath);
    if (!info.isFile()) return null;
    return await readFile(filePath);
  } catch {
    return null;
  }
}
