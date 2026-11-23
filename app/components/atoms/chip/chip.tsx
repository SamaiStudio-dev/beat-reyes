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
export type ChipSize = "sm" | "md" | "lg";

type ChipProps = {
  children: ReactNode;
  color?: ChipColor;
  variant?: ChipVariant;
  size?: ChipSize;
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

const chipSize: Record<ChipSize, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-5 py-2 text-sm",
  lg: "px-6 py-2.5 text-base",
};

export function Chip({
  children,
  color = "neon-grass",
  variant = "solid",
  size = "md",
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
      className={`inline-flex items-center justify-center rounded-full font-medium tracking-wide uppercase ${chipSize[size]} ${surface}`}
    >
      {children}
    </button>
  );
}
