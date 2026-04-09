import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={[
        "bg-cream rounded-xl shadow-[0_2px_8px_rgba(58,58,58,0.06)] p-6",
        hover
          ? "hover:shadow-[0_4px_16px_rgba(58,58,58,0.1)] transition-shadow duration-300"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
