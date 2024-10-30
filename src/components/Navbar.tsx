import { getWixClient } from "@/lib/wix-client.base";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import ShoppingCartButton from "./ShoppingCartButton";
import UserButton from "./UserButton";

export default async function Navbar() {
  const wixClient = await getWixServerClient(); // Await the async function here
  const cart = await getCart(wixClient);

  const totalQuantity =
    cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logo} alt="Flow Shop logo" width={40} height={40} />
          <span className="text-xl font-bold">Flow Shop</span>
        </Link>
        <div className="flex items-center justify-center gap-5">
          <UserButton />
          <ShoppingCartButton initialData={cart} />
        </div>
      </div>
    </header>
  );
}
