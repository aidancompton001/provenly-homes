"use client";

interface FAQProps {
  children?: React.ReactNode;
}

export default function FAQ({ children }: FAQProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm">[FAQ]</p>
        {children}
      </div>
    </section>
  );
}
