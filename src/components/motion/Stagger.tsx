"use client";

interface StaggerProps {
  children?: React.ReactNode;
}

export default function Stagger({ children }: StaggerProps) {
  return (
    <div>
      {children}
    </div>
  );
}
