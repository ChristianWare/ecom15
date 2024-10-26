import { getProductBySlug } from "@/wix-api/products";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";

interface PageProps {
  params: { slug: string };
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
