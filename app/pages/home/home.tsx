import type { Route } from "./+types/home";
import { content } from "~/constants/content";
import { AboutSection, HeroSection } from "~/components/organisms";

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
      <AboutSection
        imageSrc={content.about.imageSrc}
        imageAlt={content.about.imageAlt}
        title={content.about.title}
        description={content.about.description}
        stats={[...content.about.stats]}
      />
    </main>
  );
}
