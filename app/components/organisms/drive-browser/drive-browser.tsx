import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/atoms";
import { SlidePreview } from "~/components/molecules";

export type DriveBrowserItem = {
  id: string;
  name: string;
  meta: string;
  href?: string;
  previewSrc?: string;
  view?: "image" | "video" | "frame" | "pptx";
};

export type DriveBrowserCrumb = {
  name: string;
  href: string;
};

type DriveBrowserProps = {
  title: string;
  description: string;
  connected: boolean;
  setupMessage?: string;
  errorMessage?: string;
  emptyLabel: string;
  closeLabel: string;
  previewLabel: string;
  downloadLabel: string;
  previewFallback: string;
  crumbs: DriveBrowserCrumb[];
  items: DriveBrowserItem[];
};

export function DriveBrowser({
  title,
  description,
  connected,
  setupMessage,
  errorMessage,
  emptyLabel,
  closeLabel,
  previewLabel,
  downloadLabel,
  previewFallback,
  crumbs,
  items,
}: DriveBrowserProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = items.find((item) => item.id === activeId && item.previewSrc);

  return (
    <section className="min-h-screen bg-black px-5 pt-28 pb-16 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white-smoke uppercase">{title}</h1>
        <p className="mt-4 max-w-3xl text-base text-white-smoke sm:text-lg">{description}</p>

        {setupMessage ? <p className="mt-8 max-w-3xl text-sm text-silver">{setupMessage}</p> : null}
        {errorMessage ? <p className="mt-6 text-sm text-neon-grass">{errorMessage}</p> : null}

        {crumbs.length > 0 ? (
          <nav className="mt-8 flex flex-wrap items-center gap-2 text-sm text-silver" aria-label={title}>
            {crumbs.map((crumb, index) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                <Link to={crumb.href} className="text-white-smoke hover:text-neon-grass">
                  {crumb.name}
                </Link>
              </span>
            ))}
          </nav>
        ) : null}

        {connected && !errorMessage && items.length === 0 ? <p className="mt-10 text-silver">{emptyLabel}</p> : null}

        {items.length > 0 ? (
          <ul className="mt-10 grid gap-3">
            {items.map((item) => {
              const className =
                "flex w-full items-center justify-between gap-4 rounded bg-white-smoke/5 px-4 py-4 text-left transition-colors hover:bg-white-smoke/10";
              const body = (
                <>
                  <span className="font-bold text-white-smoke">{item.name}</span>
                  <span className="shrink-0 text-xs tracking-wide text-neon-grass uppercase">{item.meta}</span>
                </>
              );

              return (
                <li key={item.id}>
                  {item.href ? (
                    <Link to={item.href} className={className}>
                      {body}
                    </Link>
                  ) : (
                    <button type="button" className={className} onClick={() => setActiveId(item.id)}>
                      {body}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      {active?.previewSrc ? (
        <div className="fixed inset-0 z-40 flex flex-col bg-black/90 px-4 pt-24 pb-6 sm:px-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-white-smoke">
              <span className="mr-3 text-xs tracking-wide text-neon-grass uppercase">{previewLabel}</span>
              {active.name}
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <Button to={`${active.previewSrc}?download=1`} download variant="outlined" color="white">
                {downloadLabel}
              </Button>
              <Button type="button" variant="outlined" color="white" onClick={() => setActiveId(null)}>
                {closeLabel}
              </Button>
            </div>
          </div>
          {active.view === "image" ? (
            <img src={active.previewSrc} alt={active.name} className="min-h-0 w-full flex-1 rounded bg-white object-contain" />
          ) : active.view === "video" ? (
            <video src={active.previewSrc} controls className="min-h-0 w-full flex-1 rounded bg-black" />
          ) : active.view === "pptx" ? (
            <SlidePreview src={active.previewSrc} label={active.name} fallback={previewFallback} />
          ) : (
            <iframe
              src={active.previewSrc}
              title={active.name}
              className="min-h-0 w-full flex-1 rounded bg-white"
              allow="fullscreen"
            />
          )}
        </div>
      ) : null}
    </section>
  );
}
