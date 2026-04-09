import type { PricingPackage } from "@/data/types";
import Button from "./Button";

interface PricingCardProps extends PricingPackage {
  highlighted?: boolean;
  className?: string;
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 text-copper mt-0.5"
      aria-hidden="true"
    >
      <path
        d="M4.5 9L7.5 12L13.5 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingCard({
  name,
  percentage,
  subtitle,
  features,
  cta,
  highlighted = false,
  className = "",
}: PricingCardProps) {
  return (
    <div
      className={[
        "bg-cream rounded-xl p-6 flex flex-col shadow-[0_2px_8px_rgba(58,58,58,0.06)] hover:shadow-[0_4px_16px_rgba(58,58,58,0.1)] transition-shadow duration-300",
        highlighted ? "ring-2 ring-copper" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {highlighted && (
        <span className="inline-block self-start rounded-full bg-copper/10 text-copper px-3 py-1 text-xs font-medium font-body mb-4">
          Empfohlen
        </span>
      )}

      <h3 className="font-heading text-2xl font-semibold text-charcoal">{name}</h3>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-heading text-5xl font-bold text-charcoal">{percentage}</span>
        <span className="font-body text-xl text-charcoal-light">%</span>
      </div>

      <p className="mt-3 font-body text-sm text-charcoal-light leading-relaxed">{subtitle}</p>

      <ul className="mt-6 flex flex-col gap-3 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 font-body text-sm text-charcoal">
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          variant={highlighted ? "primary" : "secondary"}
          size="md"
          className="w-full"
        >
          {cta}
        </Button>
      </div>
    </div>
  );
}
