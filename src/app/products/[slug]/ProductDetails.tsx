"use client";

import WixImage from "@/components/WixImage";
import { products } from "@wix/stores";
import ProductOptions from "./ProductOptions";
import { useState } from "react";
import { checkInStock, findVariant } from "@/lib/utils";
import ProductPrice from "./ProductPrice";

interface ProductDetailsProps {
  product: products.Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQunatity] = useState(1);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {},
  );

  const selectedVariant = findVariant(product, selectedOptions);

  const inStock = checkInStock(product, selectedOptions);

  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      <div className="basis-2/5">
        <WixImage
          mediaIdentifier={product.media?.mainMedia?.image?.url}
          alt={product.media?.mainMedia?.image?.altText}
          width={1000}
          height={1000}
          className="sticky top-0"
        />
      </div>
      <div className="basis-3/5 space-y-5">
        <div className="space-y-2.5">
          <h1 className="text-3xl font-bold lg:text-4xl">{product.name}</h1>
          {product.brand && <p>Brand: {product.brand}</p>}
          {product.ribbon && <p>Ribbon: {product.ribbon}</p>}
          {product.description && (
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              className="prose"
            ></div>
          )}
          <ProductPrice product={product} selectedVariant={selectedVariant} />
          <ProductOptions
            product={product}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </div>
        <div>
          Variant:
          {JSON.stringify(selectedVariant?.choices)}
        </div>
      </div>
    </div>
  );
}
