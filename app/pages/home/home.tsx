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

declare global {
  interface Window {
    __beatReyesPopstate?: boolean;
  }
}

let skipHashScroll = false;
let previousPath = typeof window !== "undefined" ? window.location.pathname : "/";
const initialUrl = typeof window !== "undefined" ? window.location.href : "";
let stayAtTopOnLoad =
  typeof window !== "undefined" &&
  (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type === "reload";

if (typeof window !== "undefined" && !window.__beatReyesPopstate) {
  window.__beatReyesPopstate = true;
  const pushState = window.history.pushState.bind(window.history);
  window.history.pushState = (...args) => {
    pushState(...args);
    previousPath = window.location.pathname;
  };
  window.addEventListener("popstate", () => {
    skipHashScroll = !previousPath.startsWith("/cursos/");
    previousPath = window.location.pathname;
  });
}

function openedByReload() {
  return stayAtTopOnLoad && window.location.href === initialUrl;
}

function scrollToHash() {
  if (openedByReload()) return;
  const id = window.location.hash.slice(1);
  if (!id) return;
  document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
}

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (openedByReload()) {
      stayAtTopOnLoad = false;
      window.scrollTo(0, 0);
      const timeout = window.setTimeout(() => window.scrollTo(0, 0), 250);
      return () => window.clearTimeout(timeout);
    }
    const returningElsewhere = skipHashScroll;
    skipHashScroll = false;
    if (returningElsewhere || !hash) return;
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
          onReady={() => {
            if (openedByReload()) {
              window.scrollTo(0, 0);
              return;
            }
            if (skipHashScroll) return;
            scrollToHash();
          }}
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
