import { wixBrowserClient } from "@/lib/wix-client.browser";
import {
  getCheckoutUrlForCurrentCart,
} from "@/wix-api/checkout";
import { useState } from "react";
import toast from "react-hot-toast";

export function useCartCheckout() {
  const [pending, setPending] = useState(false);

  async function startCheckoutFlow() {
    setPending(true);

    try {
      const checkoutUrl = await getCheckoutUrlForCurrentCart(wixBrowserClient);
      window.location.href = checkoutUrl;
    } catch (error: any) {
      setPending(false);
      console.error(error);

      if (error.message.includes("Site must accept payments")) {
        toast.error("Please set up a payment method to proceed with checkout.");
      } else {
        toast.error("Failed to load checkout. Please try again.");
      }
    }
  }


  return { startCheckoutFlow, pending };
}