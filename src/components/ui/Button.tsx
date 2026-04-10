"use client";

import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { getHref } from "@/lib/getImageUrl";

type ButtonVariant = "primary" | "secondary" | "ghost" | "primary-dark";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-charcoal text-cream hover:bg-copper hover:text-white focus:outline-2 focus:outline-copper focus:outline-offset-2",
  secondary:
    "bg-transparent text-charcoal border border-charcoal hover:bg-charcoal hover:text-cream",
  "primary-dark":
    "bg-copper text-white hover:bg-copper-light",
  ghost:
    "bg-transparent text-cream border border-cream hover:bg-cream hover:text-charcoal",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = [
    "font-body font-semibold rounded-lg transition-colors duration-200 inline-flex items-center justify-center leading-none",
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    return (
      <a href={getHref(href)} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
