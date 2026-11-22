import type { ReactNode } from "react";

export const cardColors = [
  "coffee-bean",
  "silver",
  "white-smoke",
  "neon-grass",
  "bright-fern",
] as const;

export type CardColor = (typeof cardColors)[number];
export type CardVariant = "solid" | "outlined";

type CardProps = {
  children: ReactNode;
  color: CardColor;
  variant?: CardVariant;
};

const solidColor: Record<CardColor, string> = {
  "coffee-bean": "bg-coffee-bean text-white-smoke",
  silver: "bg-silver text-coffee-bean",
  "white-smoke": "bg-white-smoke text-coffee-bean",
  "neon-grass": "bg-neon-grass text-coffee-bean",
  "bright-fern": "bg-bright-fern text-coffee-bean",
};

const outlinedColor: Record<CardColor, string> = {
  "coffee-bean": "border-coffee-bean",
  silver: "border-silver",
  "white-smoke": "border-white-smoke",
  "neon-grass": "border-neon-grass",
  "bright-fern": "border-bright-fern",
};

export function Card({ children, color, variant = "solid" }: CardProps) {
  const surface =
    variant === "outlined"
      ? `border bg-transparent ${outlinedColor[color]}`
      : solidColor[color];

  return <div className={`rounded p-3 ${surface}`}>{children}</div>;
}
