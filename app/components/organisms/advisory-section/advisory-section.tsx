import { useEffect, useRef, useState } from "react";
import { ChoiceCard } from "~/components/molecules";

export type AdvisoryArea = {
  id: string;
  index: string;
  label: string;
  title: string;
  description: string;
};

type AdvisorySectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  scopeEyebrow: string;
  scopeTitle: string;
  areas: AdvisoryArea[];
};

function AdvisoryImage({
  src,
  alt,
  onFail,
}: {
  src: string;
  alt: string;
  onFail: () => void;
}) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0) onFail();
  }, [onFail, src]);

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      onError={onFail}
      className="aspect-[16/10] w-full rounded object-cover"
    />
  );
}

export function AdvisorySection({
  id,
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt = "",
  scopeEyebrow,
  scopeTitle,
  areas,
}: AdvisorySectionProps) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [imageSrc]);

  const showImage = Boolean(imageSrc) && !imageFailed;

  return (
    <section id={id} className="bg-black px-5 pt-28 pb-36 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className={`grid items-center gap-10 ${showImage ? "lg:grid-cols-2" : ""}`}>
          <div>
            <p className="text-xs font-medium tracking-[0.16em] text-neon-grass uppercase">{eyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.05] whitespace-pre-line text-white-smoke sm:text-5xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base text-white-smoke sm:text-lg">{description}</p>
          </div>
          {showImage && imageSrc ? (
            <AdvisoryImage src={imageSrc} alt={imageAlt} onFail={() => setImageFailed(true)} />
          ) : null}
        </div>

        <hr className="my-12 border-white-smoke/15" />

        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-neon-grass uppercase">{scopeEyebrow}</p>
          <h3 className="mt-3 text-3xl font-bold text-white-smoke sm:text-3xl">{scopeTitle}</h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {areas.map((area) => (
              <li key={area.id}>
                <ChoiceCard
                  index={area.index}
                  label={area.label}
                  title={area.title}
                  description={area.description}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
