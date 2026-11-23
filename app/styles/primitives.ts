export const palette = {
  black: "#000000",
  coffeeBean: "#0f0608",
  silver: "#a5a5a5",
  whiteSmoke: "#f2f2f2",
  neonGrass: "#5aff15",
  brightFern: "#29bf12",
} as const;

export const radius = 8;

export const fontFamily = "Ubuntu";

export type PaletteName = keyof typeof palette;
