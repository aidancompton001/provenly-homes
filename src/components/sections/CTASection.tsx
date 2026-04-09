"use client";

interface CTASectionProps {
  children?: React.ReactNode;
}

export default function CTASection({ children }: CTASectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm">[CTASection]</p>
        {children}
      </div>
    </section>
  );
}
