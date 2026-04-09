"use client";

interface AccordionProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Accordion({ children, className }: AccordionProps) {
  return (
    <div className={className}>
      <p className="text-gray-400 text-sm">[Accordion]</p>
      {children}
    </div>
  );
}
