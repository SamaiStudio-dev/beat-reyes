import { useEffect, useRef, useState } from "react";
import { Card, type CardColor } from "~/components/atoms";

export type AboutStat = {
  value: string;
  label: string;
};

type AboutSectionProps = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  stats: AboutStat[];
  cardColor?: CardColor;
};

function AboutImage({ src, alt }: { src: string; alt: string }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0) setFailed(true);
  }, [src]);

  return (
    <div className="flex h-full max-h-[34vh] items-center justify-center overflow-hidden lg:max-h-full">
      {failed ? null : (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="max-h-full w-full object-contain"
        />
      )}
    </div>
  );
}

export function AboutSection({
  id,
  imageSrc,
  imageAlt,
  title,
  description,
  stats,
  cardColor = "neon-grass",
}: AboutSectionProps) {
  return (
    <section
      id={id}
      className="flex h-screen items-center overflow-hidden bg-coffee-bean px-5 sm:px-8"
    >
      <div className="mx-auto grid h-full w-full max-w-6xl items-center gap-8 py-16 lg:grid-cols-2">
        <AboutImage src={imageSrc} alt={imageAlt} />
        <div>
          <h2 className="text-3xl font-bold text-white-smoke sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-xl text-base text-silver sm:text-lg">{description}</p>
          <ul className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <li key={`${stat.value}-${stat.label}`}>
                <Card variant="outlined" color={cardColor}>
                  <p className="text-2xl font-bold text-neon-grass">{stat.value}</p>
                  <p className="mt-2 text-xs tracking-wide text-white-smoke uppercase">{stat.label}</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
