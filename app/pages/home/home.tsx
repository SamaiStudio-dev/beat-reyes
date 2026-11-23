import { useEffect } from "react";
import { useLocation } from "react-router";
import type { Route } from "./+types/home";
import { content } from "~/constants/content";
import { AboutSection, AdvisorySection, CoursesSection, Footer, HeroSection } from "~/components/organisms";

export function meta({}: Route.MetaArgs) {
  return [
    { title: content.home.metaTitle },
    {
      name: "description",
      content: content.home.metaDescription,
    },
  ];
}

function scrollToHash() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
}

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    scrollToHash();
    const timeout = window.setTimeout(scrollToHash, 250);
    return () => window.clearTimeout(timeout);
  }, [hash]);

  return (
    <>
      <main>
        <HeroSection
          title={content.home.heroTitle}
          description={content.home.heroDescription}
          action={{ label: content.home.heroActionLabel, to: content.home.heroActionPath }}
          imageLabel={content.home.heroImageLabel}
          decorationSrc={content.home.heroDecorationSrc}
          decorationAlt={content.home.heroDecorationAlt}
          scrollHint={content.home.heroScrollHint}
          scrollHintTargetId={content.about.id}
          onReady={scrollToHash}
        />
        <AboutSection
          id={content.about.id}
          imageSrc={content.about.imageSrc}
          imageAlt={content.about.imageAlt}
          title={content.about.title}
          description={content.about.description}
          highlights={[...content.about.highlights]}
        />
        <CoursesSection
          id={content.courses.id}
          badges={[...content.courses.badges]}
          title={content.courses.title}
          description={content.courses.description}
          filters={[...content.courses.filters]}
          courses={[...content.courses.items]}
          cardBackgroundColor="white-smoke-soft"
        />
        <AdvisorySection
          id={content.advisory.id}
          eyebrow={content.advisory.eyebrow}
          title={content.advisory.title}
          description={content.advisory.description}
          imageSrc={content.advisory.imageSrc}
          imageAlt={content.advisory.imageAlt}
          scopeEyebrow={content.advisory.scopeEyebrow}
          scopeTitle={content.advisory.scopeTitle}
          areas={[...content.advisory.areas]}
        />
      </main>
      <Footer
        brand={content.brand}
        homeTo={content.homePath}
        links={[...content.navigation.links]}
        note={content.footer.note}
        label={content.footer.label}
        edgeSrc={content.footer.edgeSrc}
        edgeAlt={content.footer.edgeAlt}
      />
    </>
  );
}
