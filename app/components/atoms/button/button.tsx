import { Link } from "react-router";

export const buttonColors = [
  "coffee-bean",
  "silver",
  "white-smoke",
  "neon-grass",
  "bright-fern",
  "white",
] as const;

export type ButtonColor = (typeof buttonColors)[number];
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonTextColor = "white" | "black";

type ButtonBase = {
  children: string;
  size?: ButtonSize;
  fullWidth?: boolean;
  uppercase?: boolean;
  onClick?: () => void;
} & ({ to: string; type?: never } | { to?: undefined; type?: "button" | "submit" });

type SolidButton = ButtonBase & {
  variant?: "solid";
  color?: ButtonColor;
};

type OutlinedButton = ButtonBase & {
  variant: "outlined";
  color?: ButtonColor;
  animateOnHover?: boolean;
};

type LinkButton = ButtonBase & {
  variant: "link";
  color?: ButtonColor;
};

type AnimatedButton = ButtonBase & {
  variant: "animated";
  textColor?: ButtonTextColor;
};

type ButtonProps = SolidButton | OutlinedButton | LinkButton | AnimatedButton;

const boxedSize: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base",
};

const linkSize: Record<ButtonSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const solidColor: Record<ButtonColor, string> = {
  "coffee-bean": "bg-coffee-bean text-white-smoke",
  silver: "bg-silver text-coffee-bean",
  "white-smoke": "bg-white-smoke text-coffee-bean",
  "neon-grass": "bg-neon-grass text-coffee-bean",
  "bright-fern": "bg-bright-fern text-coffee-bean",
  white: "bg-white text-coffee-bean",
};

const outlinedColor: Record<ButtonColor, string> = {
  "coffee-bean": "border-coffee-bean text-coffee-bean",
  silver: "border-silver text-silver",
  "white-smoke": "border-white-smoke text-white-smoke",
  "neon-grass": "border-neon-grass text-neon-grass",
  "bright-fern": "border-bright-fern text-bright-fern",
  white: "border-white text-white",
};

const linkColor: Record<ButtonColor, string> = {
  "coffee-bean": "text-coffee-bean hover:text-white-smoke",
  silver: "text-silver hover:text-white",
  "white-smoke": "text-white-smoke hover:text-neon-grass",
  "neon-grass": "text-neon-grass hover:text-white",
  "bright-fern": "text-bright-fern hover:text-white",
  white: "text-white hover:text-neon-grass",
};

const textColorClass: Record<ButtonTextColor, string> = {
  white: "text-white",
  black: "text-black",
};

function variantClass(props: ButtonProps) {
  if (props.variant === "outlined") {
    return `border bg-transparent font-bold ${outlinedColor[props.color ?? "neon-grass"]}`;
  }

  if (props.variant === "link") {
    return `bg-transparent p-0 font-normal ${linkColor[props.color ?? "white-smoke"]}`;
  }

  if (props.variant === "animated") {
    return `button-animated-border bg-transparent font-bold ${textColorClass[props.textColor ?? "white"]}`;
  }

  return `font-bold ${solidColor[props.color ?? "neon-grass"]}`;
}

export function Button(props: ButtonProps) {
  const { children, size = "md", fullWidth = false, uppercase = false, onClick } = props;
  const variant = props.variant ?? "solid";
  const animateOnHover = props.variant === "outlined" && props.animateOnHover;
  const to = "to" in props ? props.to : undefined;

  const className = [
    "inline-flex items-center justify-center rounded transition-colors",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
    variant === "link" ? linkSize[size] : boxedSize[size],
    fullWidth ? "w-full" : "",
    uppercase ? "uppercase tracking-wide" : "",
    animateOnHover ? "button-outline-hover-animated" : "",
    variantClass(props),
  ]
    .filter(Boolean)
    .join(" ");

  const label =
    variant === "animated" || animateOnHover ? (
      <span className="relative z-10">{children}</span>
    ) : (
      children
    );

  if (to && /^https?:\/\//.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
        {label}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <button type={"type" in props ? props.type ?? "button" : "button"} onClick={onClick} className={className}>
      {label}
    </button>
  );
}
