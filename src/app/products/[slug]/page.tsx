import { getProductBySlug } from "@/wix-api/products";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params; // Await params here

  const product = await getProductBySlug(slug);

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

export default async function Page(props: PageProps) {
  const { slug } = await props.params; // Await params here

  const product = await getProductBySlug(slug);

  if (!product?._id) notFound();

  return (
    <main className="py10 mx-auto max-w-7xl space-y-10 px-5">
      <ProductDetails product={product} />
    </main>
  );
}
