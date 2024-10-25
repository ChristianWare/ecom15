/* eslint-disable @next/next/no-img-element */
import { products } from "@wix/stores";
import Link from "next/link";
import { media as wixMedia } from "@wix/sdk";
import WixImage from "./WixImage";
import { formatCurrency } from "@/lib/utils";

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  return (
    <div>
      <Link
        href={`/products/${product.slug}`}
        className="bg-card h-full border"
      >
        <div className="relative overflow-hidden">
          <WixImage
            mediaIdentifier={mainImage?.url}
            alt={mainImage?.altText}
            width={700}
            height={700}
            className="transition-transform duration-300 hover:scale-105"
          />
          {product.ribbon && (
            <div className="absolute bottom-3 right-3 flex flex-wrap items-center gap-2 bg-red-500 p-2 text-white">
              <p>{product.ribbon}</p>
            </div>
          )}
        </div>
        <div className="space-y-3 p-3">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p>{getFormattedPrice(product)}</p>
          <div
            className="line-clamp-5"
            dangerouslySetInnerHTML={{ __html: product.description || "" }}
          />
        </div>
      </Link>
    </div>
  );
}

function getFormattedPrice(product: products.Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(minPrice, product.priceData?.currency)}`;
  } else {
    return (
      product.priceData?.formatted?.discountedPrice ||
      product.priceData?.formatted?.price ||
      "n/a"
    );
  }
  9;
}
