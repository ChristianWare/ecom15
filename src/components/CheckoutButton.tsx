import { useCartCheckout } from "@/hooks/checkout";
import { LoadingButton } from "./LoadingButton";

export default function CheckoutButton(props: any) {
  const { startCheckoutFlow, pending } = useCartCheckout();

  const handleCheckout = async () => {
    try {
      console.log("Starting checkout flow...");
      await startCheckoutFlow();
      console.log("Checkout flow started.");
    } catch (error) {
      console.error("Error during checkout flow:", error);
    }
  };

  return (
      <LoadingButton onClick={handleCheckout} loading={pending} {...props}>
        Checkout
      </LoadingButton>
  );
}
