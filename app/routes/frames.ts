import { content } from "~/constants/content";
import { readFrame } from "../lib/frames.server";
import type { Route } from "./+types/frames";

export async function loader({ params }: Route.LoaderArgs) {
  const data = await readFrame(params.name ?? "");
  if (!data) {
    throw new Response(content.errors.frameNotFound, { status: 404 });
  }

  const body = new ArrayBuffer(data.byteLength);
  new Uint8Array(body).set(data);

  return new Response(body, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(body.byteLength),
    },
  });
}
