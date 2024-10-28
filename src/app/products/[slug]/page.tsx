import { getProductBySlug } from "@/wix-api/products";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { Metadata } from "next";
import { getWixServerClient } from "@/lib/wix-client.server";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params; // Await params here

  const wixClient = await getWixServerClient();
  const product = await getProductBySlug(wixClient, slug);

  if (!product) notFound();

  const mainImage = product.media?.mainMedia?.image;

  return {
    title: product.name,
    description: "Get this product on flowshop",
    openGraph: {
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: mainImage.altText || "",
            },
          ]
        : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params; // Await params here

  const wixClient = await getWixServerClient();
  const product = await getProductBySlug(wixClient, slug);

  if (!product?._id) notFound();

  return (
    <main className="py10 mx-auto max-w-7xl space-y-10 px-5">
      <ProductDetails product={product} />
    </main>
  );
}
