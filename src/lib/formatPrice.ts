export function formatPrice(price: number): string {
  const formatted = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return `ab ${formatted}\u20AC / Nacht`;
}
