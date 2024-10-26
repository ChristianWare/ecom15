import { products } from "@wix/stores";

interface DiscountBadgeProps {
  data: products.Discount;
}

export default function DiscountBadge({ data }: DiscountBadgeProps) {
  if (data.type !== "PERCENT") {
    return null;
  }

  return <span className="bg-orange-400 p-2 text-white rounded-md">-{data.value}%</span>;
}
