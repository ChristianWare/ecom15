import { useQuickBuy } from "@/hooks/checkout";
import { products } from "@wix/stores";
import LoadingButton from "./LoadingButton";

interface BuyNowButtonProps {
  product: products.Product;
  quantity: number;
  selectedOptions: Record<string, string>;
}

export default function BuyNowButton({
  product,
  quantity,
  selectedOptions,
  ...props
}: BuyNowButtonProps) {
  const { startCheckoutFlow, pending } = useQuickBuy();

  return (
    <button
      onClick={() => startCheckoutFlow({ product, quantity, selectedOptions })}
      className="bg-blue-500 text-white p-3 rounded-md"
      {...props}
    >
      
      Buy now
    </button>
  );
}
