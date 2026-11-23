import { useState } from "react";
import { useNavigate } from "react-router";
import { Chip, type ChipVariant } from "~/components/atoms";
import { HorizontalCard, InfoCard, type InfoCardBackground, type InfoCardVariant } from "~/components/molecules";

export type CourseBadge = {
  label: string;
  variant: ChipVariant;
};

export type CourseFilter = {
  id: string;
  label: string;
};

export type CourseItem = {
  id: string;
  category: string;
  variant: InfoCardVariant;
  imageSrc?: string;
  imageAlt?: string;
  meta: string;
  price?: string;
  title: string;
  description: string;
  actionLabel: string;
  actionTo: string;
};

type CoursesSectionProps = {
  id: string;
  badges: CourseBadge[];
  title: string;
  description: string;
  filters: CourseFilter[];
  courses: CourseItem[];
  cardBackgroundColor: InfoCardBackground;
};

export function CoursesSection({
  id,
  badges,
  title,
  description,
  filters,
  courses,
  cardBackgroundColor,
}: CoursesSectionProps) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(filters[0]?.id ?? "all");
  const visibleCourses =
    activeFilter === "all" ? courses : courses.filter((course) => course.category === activeFilter);

  return (
    <section id={id} className="min-h-screen bg-black px-5 pt-28 pb-16 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <ul className="flex flex-wrap gap-3">
          {badges.map((badge) => (
            <li key={badge.label}>
              <Chip variant={badge.variant} color="white-smoke">{badge.label}</Chip>
            </li>
          ))}
        </ul>
        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white-smoke uppercase sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base text-white-smoke sm:text-lg">{description}</p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {filters.map((filter) => {
            const selected = filter.id === activeFilter;
            const label = filter.id === "all" ? `${filter.label} ( ${courses.length} )` : filter.label;

            return (
              <li key={filter.id}>
                <Chip
                  size="sm"
                  variant={selected ? "solid" : "outline"}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {label}
                </Chip>
              </li>
            );
          })}
        </ul>
        <ul
          className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-8"
          onClickCapture={(event) => {
            const anchor = (event.target as HTMLElement).closest("a");
            const href = anchor?.getAttribute("href");
            if (!anchor || !href?.startsWith("/cursos/")) return;
            event.preventDefault();
            event.stopPropagation();
            navigate({ hash: id }, { replace: true });
            window.setTimeout(() => navigate(href), 0);
          }}
        >
          {visibleCourses.map((course) => (
            <li key={course.id}>
              <div className="lg:hidden">
                <HorizontalCard
                  backgroundColor={cardBackgroundColor}
                  imageSrc={course.imageSrc}
                  imageAlt={course.imageAlt}
                  title={course.title}
                  description={course.description}
                  actionLabel={course.actionLabel}
                  actionTo={course.actionTo}
                />
              </div>
              <div className="hidden h-full lg:block">
                <InfoCard
                  variant={course.variant}
                  backgroundColor={cardBackgroundColor}
                  imageSrc={course.imageSrc}
                  imageAlt={course.imageAlt}
                  meta={course.meta}
                  price={course.price}
                  title={course.title}
                  description={course.description}
                  actionLabel={course.actionLabel}
                  actionTo={course.actionTo}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
