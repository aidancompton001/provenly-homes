"use client";

interface PricingProps {
  children?: React.ReactNode;
}

export default function Pricing({ children }: PricingProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm">[Pricing]</p>
        {children}
      </div>
    </section>
  );
}
