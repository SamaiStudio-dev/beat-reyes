import type { ReactNode } from "react";

export const chipColors = [
  "coffee-bean",
  "silver",
  "white-smoke",
  "neon-grass",
  "bright-fern",
] as const;

export type ChipColor = (typeof chipColors)[number];
export type ChipVariant = "solid" | "outline";

type ChipProps = {
  children: ReactNode;
  color?: ChipColor;
  variant?: ChipVariant;
  onClick?: () => void;
};

const solidColor: Record<ChipColor, string> = {
  "coffee-bean": "bg-coffee-bean text-white-smoke",
  silver: "bg-silver text-coffee-bean",
  "white-smoke": "bg-white-smoke text-coffee-bean",
  "neon-grass": "bg-neon-grass text-coffee-bean",
  "bright-fern": "bg-bright-fern text-coffee-bean",
};

const outlineColor: Record<ChipColor, string> = {
  "coffee-bean": "border-coffee-bean",
  silver: "border-silver",
  "white-smoke": "border-white-smoke",
  "neon-grass": "border-neon-grass",
  "bright-fern": "border-bright-fern",
};

export function Chip({
  children,
  color = "neon-grass",
  variant = "solid",
  onClick,
}: ChipProps) {
  const surface =
    variant === "outline"
      ? `border-2 bg-transparent text-white-smoke ${outlineColor[color]}`
      : solidColor[color];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium tracking-wide uppercase ${surface}`}
    >
      {children}
    </button>
  );
}
