type ChoiceCardProps = {
  index: string;
  label: string;
  title: string;
  description: string;
};

export function ChoiceCard({ index, label, title, description }: ChoiceCardProps) {
  return (
    <article className="h-full rounded border-2 border-white-smoke/20 bg-white-smoke/5 p-4">
      <p className="text-[11px] font-medium tracking-wide text-neon-grass uppercase">
        {index} · {label}
      </p>
      <h3 className="mt-3 text-xl font-bold text-white-smoke">{title}</h3>
      <p className="mt-1 text-sm text-silver">{description}</p>
    </article>
  );
}
