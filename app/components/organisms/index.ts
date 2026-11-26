/**
 * Organisms — bloques de UI complejos formados por molecules y atoms.
 * Ejemplos: Header, Footer, ProductCard, FramePlayer, Sidebar.
 *
 * Convención: app/components/organisms/<Nombre>/<Nombre>.tsx
 *             app/components/organisms/<Nombre>/index.ts
 */

export { AboutSection, type AboutHighlight } from "./about-section";
export { AdvisorySection, type AdvisoryArea } from "./advisory-section";
export { CourseDetail } from "./course-detail";
export { CoursesSection } from "./courses-section";
export { DriveBrowser, type DriveBrowserCrumb, type DriveBrowserItem } from "./drive-browser";
export { Footer, type FooterLink } from "./footer";
export { Carousel, type CarouselSlide } from "./image-carousel";
export { HeroSection } from "./hero-section";
export { Navbar, type NavbarLink } from "./navbar";
