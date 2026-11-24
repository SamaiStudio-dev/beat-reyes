import { useEffect, useRef, useState } from "react";

type SlidePreviewer = {
  destroy: () => void;
  preview: (file: ArrayBuffer) => Promise<unknown>;
};

type SlidePreviewProps = {
  src: string;
  label: string;
  fallback: string;
};

export function SlidePreview({ src, label, fallback }: SlidePreviewProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let previewer: SlidePreviewer | null = null;
    setFailed(false);
    host.replaceChildren();

    const width = Math.max(host.clientWidth, 320);

    import("pptx-preview")
      .then(async ({ init }) => {
        if (cancelled) return;
        previewer = init(host, { width, height: Math.round((width * 9) / 16), mode: "slide" });
        const response = await fetch(src);
        if (!response.ok) throw new Error("preview");
        const buffer = await response.arrayBuffer();
        if (cancelled) return;
        await previewer.preview(buffer);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      previewer?.destroy();
    };
  }, [src]);

  return (
    <div className="min-h-0 w-full flex-1 overflow-auto rounded bg-white" aria-label={label}>
      {failed ? <p className="p-6 text-sm text-coffee-bean">{fallback}</p> : null}
      <div ref={hostRef} />
    </div>
  );
}
