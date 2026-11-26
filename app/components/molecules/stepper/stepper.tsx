type StepperProps = {
  count: number;
  active: number;
  label: string;
  onSelect: (index: number) => void;
};

export function Stepper({ count, active, label, onSelect }: StepperProps) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label={label}>
      {Array.from({ length: count }, (_, index) => {
        const selected = index === active;

        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-label={`${label} ${index + 1} de ${count}`}
            onClick={() => onSelect(index)}
            className={`rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bright-fern ${
              selected ? "h-2 w-7 bg-bright-fern" : "size-2 bg-white/35 hover:bg-white/60"
            }`}
          />
        );
      })}
    </div>
  );
}
