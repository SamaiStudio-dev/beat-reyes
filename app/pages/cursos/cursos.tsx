import type { Route } from "./+types/cursos";
import { content } from "~/constants/content";
import { CoursesSection } from "~/components/organisms";

export function meta({}: Route.MetaArgs) {
  return [
    { title: content.courses.metaTitle },
    {
      name: "description",
      content: content.courses.metaDescription,
    },
  ];
}

export default function Courses() {
  return (
    <main>
      <CoursesSection title={content.courses.title} />
    </main>
  );
}
