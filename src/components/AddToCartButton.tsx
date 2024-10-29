import { useAdditemToCart } from "@/hooks/cart";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { addToCart } from "@/wix-api/cart";
import { products } from "@wix/stores";

interface AddToCartButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  ...props
}: AddToCartButtonProps) {
  const mutation = useAdditemToCart();

  return (
    <button
      onClick={() =>
        mutation.mutate({
          product,
          selectedOptions,
          quantity,
        })
      }
      {...props}
      className="flex items-center justify-center rounded-full bg-red-500 text-xs text-white p-3"
    >
      Add To Cart
    </button>
  );
}
