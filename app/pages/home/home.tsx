import type { Route } from "./+types/home";
import { content } from "~/constants/content";
import { HeroSection } from "~/components/organisms";

export function meta({}: Route.MetaArgs) {
  return [
    { title: content.home.metaTitle },
    {
      name: "description",
      content: content.home.metaDescription,
    },
  ];
}

export default function Home() {
  return (
    <main>
      <HeroSection
        title={content.home.heroTitle}
        description={content.home.heroDescription}
        action={{ label: content.home.heroActionLabel, to: content.home.heroActionPath }}
        imageLabel={content.home.heroImageLabel}
      />
      <section className="flex min-h-[40vh] items-center justify-center px-6 py-24">
        <p className="max-w-md text-center text-lg text-silver">
          {content.home.ending}
        </p>
      </section>
    </main>
  );
}
