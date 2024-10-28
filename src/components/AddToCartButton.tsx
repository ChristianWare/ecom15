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
  return (
    <button
      onClick={() =>
        addToCart(wixBrowserClient, {
          product,
          selectedOptions,
          quantity,
        })
      }
      {...props}
      className="rounded-md bg-red-700 p-3 text-white"
    >
      Add To Cart
    </button>
  );
}
