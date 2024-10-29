"use client";

import { useCart } from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import { useState } from "react";

interface ShoppingCartButtonProps {
  initialData: currentCart.Cart | null;
}

export default function ShoppingCartButton({
  initialData,
}: ShoppingCartButtonProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const cartQuery = useCart(initialData);

  const totalQuantity =
    cartQuery.data?.lineItems?.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0,
    ) || 0;
  return (
    <div className="relative">
      <button onClick={() => setSheetOpen(true)} className="flex items-center justify-center gap-2">
        🛒
        <span className=" size-5 bg-red-500 text-xs text-white rounded-full flex items-center justify-center">
          {totalQuantity < 10 ? totalQuantity : "9+"}
        </span>
      </button>
    </div>
  );
}
