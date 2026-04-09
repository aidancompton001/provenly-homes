"use client";

interface ScrollRevealProps {
  children?: React.ReactNode;
}

export default function ScrollReveal({ children }: ScrollRevealProps) {
  return (
    <div>
      {children}
    </div>
  );
}
