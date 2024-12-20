import Product from "@/components/Product";
import { delay } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: { slug: string };
}

// Update generateMetadata to handle params asynchronously
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const collection = await getCollectionBySlug(
    await getWixServerClient(),
    slug,
  );

  if (!collection) notFound();

  const banner = collection.media?.mainMedia?.image;

  return {
    title: collection.name,
    description: collection.description,
    openGraph: {
      images: banner ? [{ url: banner.url }] : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await Promise.resolve(params); // Await params before destructuring
  const collection = await getCollectionBySlug(
    await getWixServerClient(),
    slug,
  );

  if (!collection?._id) notFound();

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Products</h2>
      <Suspense fallback={"Loading..."}>
        <Products collectionId={collection._id} />
      </Suspense>
    </div>
  );
}

interface ProductProps {
  collectionId: string;
}

async function Products({ collectionId }: ProductProps) {
  //   await delay(2000);

  const collectionProducts = await queryProducts(await getWixServerClient(), {
    collectionIds: collectionId,
  });

  if (!collectionProducts.length) notFound();

  return (
    <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {collectionProducts.items.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}
