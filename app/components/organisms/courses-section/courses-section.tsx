type CoursesSectionProps = {
  title: string;
};

export function CoursesSection({ title }: CoursesSectionProps) {
  return (
    <section className="flex h-screen items-center bg-coffee-bean px-5 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-white-smoke sm:text-6xl">{title}</h1>
      </div>
    </section>
  );
}
