import { useEffect, useRef, useState } from "react";
import { Icon } from "~/components/atoms";
import { Stepper } from "~/components/molecules";

export type CarouselSlide = {
  src: string;
  alt: string;
};

type CarouselProps = {
  slides: CarouselSlide[];
  label: string;
  previousLabel: string;
  nextLabel: string;
};

const gap = 16;

function useColumns() {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const tablet = window.matchMedia("(min-width: 640px)");
    const update = () => setColumns(desktop.matches ? 3 : tablet.matches ? 2 : 1);
    update();
    desktop.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  return columns;
}

export function Carousel({ slides, label, previousLabel, nextLabel }: CarouselProps) {
  const count = slides.length;
  const columns = useColumns();
  const visible = Math.min(columns, Math.max(count, 1));
  const [index, setIndex] = useState(visible);
  const [motion, setMotion] = useState(true);
  const lock = useRef(false);
  const moveId = useRef(0);

  useEffect(() => {
    lock.current = false;
    moveId.current += 1;
    setMotion(false);
    setIndex(visible);
  }, [visible, count]);

  if (count === 0) return null;

  const active = ((index - visible) % count + count) % count;
  const track = [...slides.slice(-visible), ...slides, ...slides.slice(0, visible)];

  const finish = (value: number, id: number) => {
    if (moveId.current !== id) return;
    moveId.current += 1;
    const logical = ((value - visible) % count + count) % count;
    const normalized = visible + logical;
    if (normalized !== value) {
      setMotion(false);
      setIndex(normalized);
    }
    lock.current = false;
  };

  const moveTo = (nextIndex: number) => {
    if (lock.current || nextIndex === index) return;
    const id = moveId.current + 1;
    moveId.current = id;
    lock.current = true;
    setMotion(true);
    setIndex(nextIndex);
    window.setTimeout(() => finish(nextIndex, id), 560);
  };

  return (
    <section aria-roledescription="carrusel" aria-label={label} className="bg-black px-5 py-12 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <Stepper count={count} active={active} label={label} onSelect={(step) => moveTo(visible + step)} />
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={previousLabel}
              onClick={() => moveTo(index - 1)}
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white-smoke transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-fern"
            >
              <Icon name="chevron-left" className="size-5" />
            </button>
            <button
              type="button"
              aria-label={nextLabel}
              onClick={() => moveTo(index + 1)}
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white-smoke transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-fern"
            >
              <Icon name="chevron-right" className="size-5" />
            </button>
          </div>
        </div>
        <div className="overflow-hidden">
          <ul
            className={`flex w-full ${motion ? "transition-transform duration-500 ease-out motion-reduce:transition-none" : ""}`}
            style={{
              gap,
              transform: `translateX(calc(${-index} * (100% + ${gap}px) / ${visible}))`,
            }}
            onTransitionEnd={(event) => {
              if (event.propertyName !== "transform" || event.target !== event.currentTarget) return;
              finish(index, moveId.current);
            }}
          >
            {track.map((slide, slideIndex) => {
              const shown = slideIndex >= index && slideIndex < index + visible;

              return (
                <li
                  key={`${slide.src}-${slideIndex}`}
                  aria-hidden={shown ? undefined : true}
                  className="min-w-0 shrink-0"
                  style={{ width: `calc((100% - ${(visible - 1) * gap}px) / ${visible})` }}
                >
                  <img
                    src={slide.src}
                    alt={shown ? slide.alt : ""}
                    draggable={false}
                    className="aspect-[4/3] w-full rounded-xl object-cover"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
