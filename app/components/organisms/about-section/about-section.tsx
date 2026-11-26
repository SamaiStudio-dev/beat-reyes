import { useEffect, useRef, useState } from "react";

export type AboutHighlight = {
  src: string;
  alt: string;
};

type AboutSectionProps = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  highlights: AboutHighlight[];
};

function AboutImage({ src, alt }: { src: string; alt: string }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0) setFailed(true);
  }, [failed, src]);

  return (
    <div className="flex h-full max-h-[34vh] items-center justify-start lg:max-h-[70vh]">
      {failed ? null : (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="max-h-[34vh] w-auto max-w-full rounded-[.5rem] object-contain lg:max-h-[70vh]"
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
  highlights,
}: AboutSectionProps) {
  return (
    <section
      id={id}
      className="flex min-h-screen items-center bg-black px-5 py-24 sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-center gap-10">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <AboutImage src={imageSrc} alt={imageAlt} />
          <div>
            <h2 className="text-3xl font-bold text-white-smoke sm:text-5xl">{title}</h2>
            <p className="mt-4 max-w-xl text-base text-silver sm:text-lg">{description}</p>
            <ul className="mt-8 grid w-full max-w-sm grid-cols-2 gap-3">
              {highlights.map((highlight) => (
                <li key={highlight.src}>
                  <img
                    src={highlight.src}
                    alt={highlight.alt}
                    className="w-full rounded object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
