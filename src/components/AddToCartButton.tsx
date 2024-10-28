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
        addToCart({
          product,
          selectedOptions,
          quantity,
        })
      }
      {...props}
      className="rounded-md bg-red-700 text-white p-3"
    >
      Add To Cart
    </button>
  );
}
