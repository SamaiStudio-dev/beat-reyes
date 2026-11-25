import { loadDriveLibrary } from "~/lib/drive.server";
import type { Route } from "./+types/drive-library";

export async function loader({ request }: Route.LoaderArgs) {
  const library = await loadDriveLibrary(request);
  const fresh = library.connected && !library.error;
  return Response.json(library, {
    headers: { "Cache-Control": fresh ? "private, max-age=60" : "no-store" },
  });
}
