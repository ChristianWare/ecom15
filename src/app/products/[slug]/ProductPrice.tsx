import DiscountBadge from "@/components/DiscountBadge";
import { products } from "@wix/stores";

interface ProductPriceProps {
  product: products.Product;
  selectedVariant: products.Variant | null;
}

export default function ProductPrice({
  product,
  selectedVariant,
}: ProductPriceProps) {
  const priceData = selectedVariant?.variant?.priceData || product.priceData;

  if (!priceData) return null;

  const hasDiscount = priceData.discountedPrice !== priceData.price;

  return (
    <div className="flex items-center gap-2.5 from-black text-xl">
      <span
        className={`${hasDiscount ? "text-muted-foreground line-through" : ""}`}
      >
        {priceData.formatted?.price}
      </span>
      {hasDiscount && <span>{priceData.formatted?.discountedPrice}</span>}
      {product.discount && <DiscountBadge data={product.discount} />}
    </div>
  );
}
