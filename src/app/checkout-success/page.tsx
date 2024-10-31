import { getWixServerClient } from "@/lib/wix-client.server";
import { getOrder } from "@/wix-api/orders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout Success",
};

interface PageProps {
  searchParams: { orderId: string };
}

export default async function Page({ searchParams: { orderId } }: PageProps) {
  const wixClient = getWixServerClient();

  const [] = await Promise.all([getOrder(await wixClient, orderId)]);

  return (
    <main>
      <h1>Success!</h1>
    </main>
  );
}
