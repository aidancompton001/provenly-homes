"use client";

interface SignaturesProps {
  children?: React.ReactNode;
}

export default function Signatures({ children }: SignaturesProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm">[Signatures]</p>
        {children}
      </div>
    </section>
  );
}
