import type { Route } from "./+types/herramientas";
import { DriveBrowser } from "~/components/organisms";
import { content } from "~/constants/content";
import { loadDriveLibrary, type DriveKind } from "~/lib/drive.server";

const kindLabel: Record<DriveKind, string> = {
  folder: content.tools.kinds.folder,
  document: content.tools.kinds.document,
  sheet: content.tools.kinds.sheet,
  slides: content.tools.kinds.slides,
  file: content.tools.kinds.file,
};

export function meta({}: Route.MetaArgs) {
  return [{ title: content.tools.title }, { name: "description", content: content.tools.description }];
}

export function loader({ request }: Route.LoaderArgs) {
  return loadDriveLibrary(request);
}

export default function Herramientas({ loaderData }: Route.ComponentProps) {
  const library = loaderData;
  const errorMessage = library.error ? content.tools.errors[library.error] : undefined;

  return (
    <main>
      <DriveBrowser
        title={content.tools.title}
        description={content.tools.description}
        connected={library.connected}
        setupMessage={
          library.connected
            ? undefined
            : import.meta.env.DEV && library.error === "auth"
              ? content.tools.errors.auth
              : import.meta.env.DEV && library.error === "config"
                ? content.tools.setup
                : content.tools.unavailable
        }
        errorMessage={library.connected && library.error ? errorMessage : undefined}
        emptyLabel={content.tools.empty}
        closeLabel={content.tools.close}
        previewLabel={content.tools.preview}
        downloadLabel={content.tools.download}
        previewFallback={content.tools.previewFallback}
        crumbs={
          library.inFolder
            ? [{ name: content.tools.root, href: "/herramientas" }, ...library.crumbs]
            : []
        }
        items={library.items.map((item) => ({
          id: item.id,
          name: item.name,
          meta: item.shared ? content.tools.kinds.sharedDrive : kindLabel[item.kind],
          href: item.href,
          previewSrc: item.previewSrc,
          view: item.view,
        }))}
      />
    </main>
  );
}
