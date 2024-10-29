"use client";

import { useCart, useUpdateCartItemQuantity } from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import { useState } from "react";
import styles from "./ShoppingCartButton.module.css";
import Modal from "./Modal/Modal";
import Link from "next/link";
import WixImage from "./WixImage";

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
    <>
      <div className="relative">
        <button onClick={() => setSheetOpen(true)} className={styles.navParent}>
          🛒
          <span className={styles.quantity}>
            {totalQuantity < 10 ? totalQuantity : "9+"}
          </span>
        </button>
        <Modal isOpen={sheetOpen} onClose={() => setSheetOpen(false)}>
          Your cart{" "}
          <span className="text-base">
            ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
          </span>
          <br />
          <br />
          <br />
          <div className="flex grow flex-col space-y-5 overflow-y-auto">
            <ul className="space-y-5">
              {cartQuery.data?.lineItems?.map((item) => (
                <ShoppingCartItem key={item._id} item={item} />
              ))}
            </ul>
            {cartQuery.isPending && <p>Loading...</p>}
            {cartQuery.error && (
              <p className="text-destructive">{cartQuery.error.message}</p>
            )}
            {!cartQuery.isPending && !cartQuery.data?.lineItems?.length && (
              <div className="flex grow items-center justify-center text-center">
                <div className="space-y-1.5">
                  <p className="text-lg font-semibold">Your cart is empty</p>
                  <Link
                    href="/shop"
                    className="text-primary hover:underline"
                    onClick={() => setSheetOpen(false)}
                  >
                    Start shopping now
                  </Link>
                </div>
              </div>
            )}
          </div>
          <br />
          <hr />
          <br />
          <div className="flex items-center justify-between gap-5">
            <div className="space-y-0.5">
              <p className="text-sm">Subtotal Amount</p>
              <p className="font-bold">
                {/* @ts-expect-error */}
                {cartQuery.data?.subtotal?.formattedConvertedAmount}
              </p>
              <p className="text-muted-foreground text-xs">
                Shipping and taxes calculated at checkout
              </p>
              <button
                className="rounded-md bg-orange-500 p-3 text-white"
                disabled={!totalQuantity || cartQuery.isFetching}
              >
                Checkout
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

interface ShoppingCartItemProps {
  item: currentCart.LineItem;
}

function ShoppingCartItem({ item }: ShoppingCartItemProps) {
  const updateQuantityMutation = useUpdateCartItemQuantity();

  const productId = item._id;

  if (!productId) return null;

  const slug = item.url?.split("/").pop;

  const quantityLimitReached =
    !!item.quantity &&
    !!item.availability?.quantityAvailable &&
    item.quantity >= item.availability.quantityAvailable;

  return (
    <li className="flex items-center gap-3">
      <Link href={`/products/${slug}`}>
        <WixImage
          mediaIdentifier={item.image}
          width={75}
          height={75}
          alt={item.productName?.translated || "Product image"}
          className="flex-none"
        />
      </Link>
      <div className="space-y-1.5 text-sm">
        <Link href={`/products/${slug}`}>
          <p className="font-bold">{item.productName?.translated || "Item"}</p>
        </Link>
        {!!item.descriptionLines?.length && (
          <p>
            {item.descriptionLines
              .map(
                (line) =>
                  line.colorInfo?.translated || line.plainText?.translated,
              )
              .join(", ")}
          </p>
        )}
        <div className="flex items-center gap-2">
          {item.quantity} x {item.price?.formattedConvertedAmount}
          {item.fullPrice && item.fullPrice.amount !== item.price?.amount && (
            <span className="text-muted-foreground line-through">
              {item.fullPrice.formattedConvertedAmount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            disabled={item.quantity === 1}
            onClick={() =>
              updateQuantityMutation.mutate({
                productId,
                newQuantity: !item.quantity ? 0 : item.quantity - 1,
              })
            }
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            disabled={quantityLimitReached}
            onClick={() =>
              updateQuantityMutation.mutate({
                productId,
                newQuantity: !item.quantity ? 1 : item.quantity + 1,
              })
            }
          >
            +
          </button>
          {quantityLimitReached && <span>Quantity limit reached</span>}
        </div>
      </div>
    </li>
  );
}
