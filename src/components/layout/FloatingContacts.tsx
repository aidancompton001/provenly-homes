"use client";

interface FloatingContactsProps {
  children?: React.ReactNode;
}

export default function FloatingContacts({ children }: FloatingContactsProps) {
  return (
    <div className="fixed bottom-4 right-4">
      <p className="text-gray-400 text-sm">[FloatingContacts]</p>
      {children}
    </div>
  );
}
