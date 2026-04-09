"use client";

interface TestimonialsProps {
  children?: React.ReactNode;
}

export default function Testimonials({ children }: TestimonialsProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm">[Testimonials]</p>
        {children}
      </div>
    </section>
  );
}
