"use client";

interface ProcessProps {
  children?: React.ReactNode;
}

export default function Process({ children }: ProcessProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm">[Process]</p>
        {children}
      </div>
    </section>
  );
}
