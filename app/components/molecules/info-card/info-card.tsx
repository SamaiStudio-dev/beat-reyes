import { useEffect, useRef, useState } from "react";
import { Button, type CardColor } from "~/components/atoms";

export type InfoCardVariant = "image" | "plain";
export type InfoCardBackground = CardColor | "transparent" | "white-smoke-soft";

type InfoCardProps = {
  variant?: InfoCardVariant;
  backgroundColor: InfoCardBackground;
  imageSrc?: string;
  imageAlt?: string;
  meta: string;
  price?: string;
  title: string;
  description: string;
  actionLabel: string;
  actionTo: string;
};

function CardImage({ src, alt }: { src: string; alt: string }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed) return null;

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="aspect-[16/10] w-full rounded object-cover"
    />
  );
}

const cardBackground: Record<InfoCardBackground, string> = {
  transparent: "bg-transparent",
  "white-smoke-soft": "bg-white-smoke/5",
  "coffee-bean": "bg-coffee-bean",
  silver: "bg-silver",
  "white-smoke": "bg-white-smoke",
  "neon-grass": "bg-neon-grass",
  "bright-fern": "bg-bright-fern",
};

const lightBackground: Record<InfoCardBackground, boolean> = {
  transparent: false,
  "white-smoke-soft": false,
  "coffee-bean": false,
  silver: true,
  "white-smoke": true,
  "neon-grass": true,
  "bright-fern": true,
};

export function InfoCard({
  variant = "plain",
  backgroundColor,
  imageSrc,
  imageAlt = "",
  meta,
  price,
  title,
  description,
  actionLabel,
  actionTo,
}: InfoCardProps) {
  const light = lightBackground[backgroundColor];
  const heading = light ? "text-coffee-bean" : "text-white-smoke";
  const body = light ? "text-coffee-bean" : "text-silver";
  const metaColor =
    backgroundColor === "neon-grass" || backgroundColor === "bright-fern"
      ? "text-coffee-bean"
      : "text-neon-grass";

  return (
    <article className={`flex h-full flex-col rounded p-4 ${cardBackground[backgroundColor]}`}>
      {variant === "image" && imageSrc ? <CardImage src={imageSrc} alt={imageAlt} /> : null}
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-4 text-xs tracking-wide uppercase">
          <p className={metaColor}>{meta}</p>
          {price ? <p className={heading}>{price}</p> : null}
        </div>
        <h2 className={`mt-3 text-2xl font-bold ${heading}`}>{title}</h2>
        <p className={`mt-2 flex-1 text-sm ${body}`}>{description}</p>
        <div className="mt-6">
          <Button
            variant="outlined"
            color={light ? "coffee-bean" : "white"}
            animateOnHover
            fullWidth
            to={actionTo}
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
