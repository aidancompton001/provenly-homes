"use client";

interface StatsProps {
  children?: React.ReactNode;
}

export default function Stats({ children }: StatsProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm">[Stats]</p>
        {children}
      </div>
    </section>
  );
}
