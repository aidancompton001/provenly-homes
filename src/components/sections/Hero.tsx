"use client";

interface HeroProps {
  children?: React.ReactNode;
}

export default function Hero({ children }: HeroProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm">[Hero]</p>
        {children}
      </div>
    </section>
  );
}
