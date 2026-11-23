import { useEffect, useRef, useState } from "react";

type CourseDetailProps = {
  title: string;
  description: string;
  meta: string;
  price?: string;
  imageSrc?: string;
  imageAlt?: string;
};

function CourseImage({ src, alt }: { src: string; alt: string }) {
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
      className="mt-8 aspect-[16/10] w-full rounded object-cover"
    />
  );
}

export function CourseDetail({
  title,
  description,
  meta,
  price,
  imageSrc,
  imageAlt = "",
}: CourseDetailProps) {
  return (
    <section className="min-h-screen bg-coffee-bean px-5 pt-28 pb-16 sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-xs tracking-wide text-neon-grass uppercase">{meta}</p>
        <h1 className="mt-3 text-4xl font-bold text-white-smoke">{title}</h1>
        {price ? <p className="mt-3 text-white-smoke">{price}</p> : null}
        <p className="mt-4 text-base text-silver">{description}</p>
        {imageSrc ? <CourseImage src={imageSrc} alt={imageAlt} /> : null}
      </div>
    </section>
  );
}
