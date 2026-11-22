import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FRAME_COUNT, frameSrc } from "~/frames";
import { palette } from "~/styles/primitives";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PIXELS_PER_FRAME = 18;

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

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [firstReady, setFirstReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

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
      if (counterRef.current) {
        counterRef.current.textContent = `${String(index + 1).padStart(3, "0")} / ${FRAME_COUNT}`;
      }
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
            if (index === 0) {
              setFirstReady(true);
              draw(0);
            }
            setLoadedCount((current) => current + 1);
            if (Math.round(playhead.frame) === index) draw(index);
          } catch {
            if (!cancelled) setLoadedCount((current) => current + 1);
          }
        }
      });
      await Promise.all(workers);
    };

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      setReducedMotion(true);
      void preload(1);
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      setReducedMotion(false);
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

  const loadProgress = Math.round((loadedCount / FRAME_COUNT) * 100);

  return (
    <section ref={sectionRef} className="relative h-screen bg-coffee-bean">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-label="Secuencia de la cafetera controlada con el scroll"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-8">
        <p className="max-w-xs text-sm text-white-smoke/80">
          {reducedMotion
            ? "Tu sistema pide menos movimiento, así que la secuencia queda en el primer frame."
            : firstReady
              ? "Deslizá para reproducir la secuencia."
              : "Preparando el primer frame…"}
        </p>
        <div className="text-right text-xs tracking-wide text-silver">
          <span ref={counterRef}>001 / {FRAME_COUNT}</span>
          {loadedCount < FRAME_COUNT && !reducedMotion ? (
            <span className="mt-1 block">Cargando {loadProgress}%</span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
