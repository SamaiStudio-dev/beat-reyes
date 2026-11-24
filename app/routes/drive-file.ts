import { openDriveFile } from "~/lib/drive.server";
import type { Route } from "./+types/drive-file";

export function loader({ params, request }: Route.LoaderArgs) {
  return openDriveFile(params.id ?? "", request);
}
