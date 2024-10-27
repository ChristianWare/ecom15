import Product from "@/components/Product";
import { delay } from "@/lib/utils";
import { getWixClient } from "@/lib/wix-client.base";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="bg-secondary flex items-center md:h-96">
        <h1>Hero stuff here</h1>
      </div>{" "}
      <Suspense fallback="Loading...">
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}

async function FeaturedProducts() {
  // await delay(1000);

  const collection = await getCollectionBySlug("featured-products");

  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await queryProducts({
    collectionIds: collection._id,
  });
  if (!featuredProducts.items.length) {
    return null;
  }

  return (
    <div className="spacey5">
      <h2 className="text-2xl font-bold">Featured Products</h2>
      <div className="flex grid-cols-2 flex-col gap-4 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.items.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
