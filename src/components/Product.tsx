/* eslint-disable @next/next/no-img-element */
import { products } from "@wix/stores";
import Link from "next/link";
import { media as wixMedia } from "@wix/sdk";

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  const resizedImageUrl = mainImage?.url
    ? wixMedia.getScaledToFillImageUrl(mainImage.url, 700, 700, {})
    : null;

  return (
    <div>
      <Link href={`/products/${product.slug}`}>
        <img
          src={resizedImageUrl || "/placeholder.png"}
          alt={mainImage?.altText || ""}
        />
        <div className="space-y-3 p-3">
          <h3 className="txt-lg font-bold">{product.name}</h3>
          <div
            className="line-clamp-2"
            dangerouslySetInnerHTML={{ __html: product.description || "" }}
          />
        </div>
      </Link>
    </div>
  );
}