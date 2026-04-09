import { type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react";

interface ContainerProps<T extends ElementType = "div"> {
  children: ReactNode;
  className?: string;
  as?: T;
}

export default function Container<T extends ElementType = "div">({
  children,
  className = "",
  as,
  ...rest
}: ContainerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Component = as || "div";
  return (
    <Component
      className={["max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Component>
  );
}
