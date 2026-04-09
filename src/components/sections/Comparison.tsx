"use client";

interface ComparisonProps {
  children?: React.ReactNode;
}

export default function Comparison({ children }: ComparisonProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm">[Comparison]</p>
        {children}
      </div>
    </section>
  );
}
