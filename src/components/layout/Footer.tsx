interface FooterProps {
  children?: React.ReactNode;
}

export default function Footer({ children }: FooterProps) {
  return (
    <footer className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm">[Footer]</p>
        {children}
      </div>
    </footer>
  );
}
