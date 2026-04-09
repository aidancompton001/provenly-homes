interface PropertyCardProps {
  children?: React.ReactNode;
  className?: string;
}

export default function PropertyCard({ children, className }: PropertyCardProps) {
  return (
    <div className={className}>
      <p className="text-gray-400 text-sm">[PropertyCard]</p>
      {children}
    </div>
  );
}
