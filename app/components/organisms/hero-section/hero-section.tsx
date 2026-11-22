import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "~/components/atoms";
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

  ctx.fillStyle = palette.coffeeBean;
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(image, x, y, drawWidth, drawHeight);
}

export function HeroSection({ title, description, action, imageLabel }: HeroSectionProps) {
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
    <section ref={sectionRef} className="relative h-screen bg-coffee-bean">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-label={imageLabel}
      />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center px-5 sm:px-8">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold text-white-smoke sm:text-6xl">{title}</h1>
          <p className="mt-4 max-w-md text-base text-white-smoke sm:text-lg">{description}</p>
          <div className="pointer-events-auto mt-8">
            <Button to={action.to} variant="animated" size="lg">{action.label}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
