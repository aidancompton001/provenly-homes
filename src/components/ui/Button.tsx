interface ButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Button({ children, className }: ButtonProps) {
  return (
    <button className={className}>
      {children ?? "[Button]"}
    </button>
  );
}
