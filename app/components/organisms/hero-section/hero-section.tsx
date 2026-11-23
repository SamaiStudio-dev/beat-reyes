import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button, Icon } from "~/components/atoms";
import { FRAME_COUNT, frameSrc } from "~/frames";
import { palette } from "~/styles/primitives";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PIXELS_PER_FRAME = 18;

type HeroAction = {
  label: string;
  to: string;
};

type HeroSectionProps = {
  title: string;
  description: string;
  action: HeroAction;
  imageLabel: string;
  decorationSrc?: string;
  decorationAlt?: string;
  scrollHint?: string;
  scrollHintTargetId?: string;
};

function loadImage(index: number) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`No se pudo cargar el frame ${index}`));
    image.src = frameSrc(index);
  });
}

function paint(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;

  ctx.fillStyle = palette.black;
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(image, x, y, drawWidth, drawHeight);
}

export function HeroSection({
  title,
  description,
  action,
  imageLabel,
  decorationSrc,
  decorationAlt = "",
  scrollHint,
  scrollHintTargetId,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const images: Array<HTMLImageElement | undefined> = new Array(FRAME_COUNT);
    const playhead = { frame: 0 };
    let lastPainted = -1;
    let cancelled = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      return { width, height };
    };

    const draw = (frame = playhead.frame) => {
      const index = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(frame)));
      const image = images[index];
      if (!image?.complete || image.naturalWidth === 0) return;

      const { width, height } = resize();
      if (width < 2 || height < 2) return;

      paint(ctx, image, width, height);
      lastPainted = index;
    };

    const onResize = () => {
      resize();
      if (lastPainted >= 0) draw(lastPainted);
    };

    window.addEventListener("resize", onResize);

    const preload = async (count: number) => {
      let cursor = 0;
      const workers = Array.from({ length: Math.min(4, count) }, async () => {
        while (!cancelled && cursor < count) {
          const index = cursor;
          cursor += 1;
          try {
            images[index] = await loadImage(index);
            if (cancelled) return;
            if (index === 0) draw(0);
            if (Math.round(playhead.frame) === index) draw(index);
          } catch {
            // Un frame que falla no detiene el resto de la secuencia.
          }
        }
      });
      await Promise.all(workers);
    };

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      void preload(1);
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(playhead, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${FRAME_COUNT * PIXELS_PER_FRAME}`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
        },
        onUpdate: () => draw(),
      });
      void preload(FRAME_COUNT);
    });

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative flex h-screen items-center bg-black px-5 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="contents lg:block">
          <h1 className="order-1 origin-left -rotate-[0.5deg] text-4xl font-bold text-white-smoke sm:text-6xl">
            {title}
          </h1>
          <p className="order-2 max-w-md text-base text-white-smoke sm:text-lg lg:mt-8">
            {description}
          </p>
          <div className="order-4 mt-12 justify-self-center lg:mt-8 lg:justify-self-start">
            <Button to={action.to} variant="animated" size="lg">{action.label}</Button>
          </div>
        </div>
        <div className="relative order-3 lg:order-none">
          <div className="overflow-hidden rounded border border-white-smoke/15">
            <canvas
              ref={canvasRef}
              className="block aspect-video w-full"
              aria-label={imageLabel}
            />
          </div>
          {decorationSrc ? (
            <img
              src={decorationSrc}
              alt={decorationAlt}
              className="pointer-events-none absolute right-0 bottom-0 z-10 w-[68%] translate-x-[10%] translate-y-[62%]"
            />
          ) : null}
        </div>
        {scrollHint ? (
          <button
            type="button"
            onClick={() => {
              if (!scrollHintTargetId) return;
              document.getElementById(scrollHintTargetId)?.scrollIntoView({ behavior: "smooth" });
            }}
            className="absolute inset-x-0 bottom-6 z-20 flex cursor-pointer flex-col items-center gap-2 text-sm text-white-smoke focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white-smoke"
          >
            {scrollHint}
            <Icon name="arrow-down" className="size-5" />
          </button>
        ) : null}
      </div>
    </section>
  );
}
