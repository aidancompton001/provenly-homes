"use client";

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm">[Header]</p>
        {children}
      </div>
    </header>
  );
}
