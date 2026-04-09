"use client";

interface ParallaxProps {
  children?: React.ReactNode;
}

export default function Parallax({ children }: ParallaxProps) {
  return (
    <div>
      {children}
    </div>
  );
}
