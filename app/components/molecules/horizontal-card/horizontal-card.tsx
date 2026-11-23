import { useEffect, useRef, useState } from "react";
import { Button, type CardColor } from "~/components/atoms";

export type HorizontalCardBackground = CardColor | "transparent" | "white-smoke-soft";

type HorizontalCardProps = {
  backgroundColor?: HorizontalCardBackground;
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description: string;
  actionLabel: string;
  actionTo: string;
};

const cardBackground: Record<HorizontalCardBackground, string> = {
  transparent: "bg-transparent",
  "white-smoke-soft": "bg-white-smoke/5",
  "coffee-bean": "bg-coffee-bean",
  silver: "bg-silver",
  "white-smoke": "bg-white-smoke",
  "neon-grass": "bg-neon-grass",
  "bright-fern": "bg-bright-fern",
};

const lightBackground: Record<HorizontalCardBackground, boolean> = {
  transparent: false,
  "white-smoke-soft": false,
  "coffee-bean": false,
  silver: true,
  "white-smoke": true,
  "neon-grass": true,
  "bright-fern": true,
};

function CardImage({ src, alt }: { src: string; alt: string }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0) setFailed(true);
  }, [failed, src]);

  if (failed) return null;

  return (
    <div className="relative w-28 shrink-0 self-stretch">
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

export function HorizontalCard({
  backgroundColor = "transparent",
  imageSrc,
  imageAlt = "",
  title,
  description,
  actionLabel,
  actionTo,
}: HorizontalCardProps) {
  const light = lightBackground[backgroundColor];
  const heading = light ? "text-coffee-bean" : "text-white-smoke";
  const body = light ? "text-coffee-bean" : "text-silver";

  return (
    <article className={`flex overflow-hidden rounded ${cardBackground[backgroundColor]}`}>
      {imageSrc ? <CardImage src={imageSrc} alt={imageAlt} /> : null}
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <h2 className={`text-lg font-bold ${heading}`}>{title}</h2>
        <p className={`mt-1 flex-1 text-sm ${body}`}>{description}</p>
        <div className="mt-3">
          <Button variant="link" color={light ? "coffee-bean" : "neon-grass"} size="sm" to={actionTo}>
            {actionLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
