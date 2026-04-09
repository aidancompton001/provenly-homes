"use client";

interface ServicesProps {
  children?: React.ReactNode;
}

export default function Services({ children }: ServicesProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm">[Services]</p>
        {children}
      </div>
    </section>
  );
}
