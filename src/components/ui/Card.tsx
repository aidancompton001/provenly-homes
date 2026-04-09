interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={className}>
      <p className="text-gray-400 text-sm">[Card]</p>
      {children}
    </div>
  );
}
