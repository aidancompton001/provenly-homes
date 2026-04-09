interface PricingCardProps {
  children?: React.ReactNode;
  className?: string;
}

export default function PricingCard({ children, className }: PricingCardProps) {
  return (
    <div className={className}>
      <p className="text-gray-400 text-sm">[PricingCard]</p>
      {children}
    </div>
  );
}
