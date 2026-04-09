import { type ReactNode } from "react";

type BadgeVariant = "copper" | "charcoal" | "sand";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  copper: "bg-copper/10 text-copper",
  charcoal: "bg-charcoal/10 text-charcoal",
  sand: "bg-sand/20 text-charcoal-light",
};

export default function Badge({ variant = "copper", children, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "rounded-full px-3 py-1 text-xs font-medium font-body inline-block",
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
