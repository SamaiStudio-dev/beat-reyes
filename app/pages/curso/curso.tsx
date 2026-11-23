import type { Route } from "./+types/curso";
import { content } from "~/constants/content";
import { CourseDetail } from "~/components/organisms";

function findCourse(id: string | undefined) {
  return content.courses.items.find((item) => item.id === id);
}

export function loader({ params }: Route.LoaderArgs) {
  const course = findCourse(params.id);

  if (!course) {
    throw new Response(content.errors.notFound, { status: 404 });
  }

  return course;
}

export function meta({ loaderData: course }: Route.MetaArgs) {
  if (!course) {
    return [{ title: content.errors.notFoundTitle }];
  }

  return [
    { title: course.title },
    { name: "description", content: course.description },
  ];
}

export default function Curso({ loaderData: course }: Route.ComponentProps) {
  return (
    <main>
      <CourseDetail
        title={course.title}
        description={course.description}
        meta={course.meta}
        imageSrc={course.imageSrc}
        imageAlt={course.imageAlt}
      />
    </main>
  );
}
