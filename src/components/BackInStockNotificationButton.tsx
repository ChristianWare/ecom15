import { useCreateBackInStockNotificationRequest } from "@/hooks/back-in-stock";
import { requiredString } from "@/lib/validation";
import { products } from "@wix/stores";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { env } from "@/env";
import { useState } from "react";
import Modal from "./Modal/Modal";

const formSchema = z.object({
  email: requiredString.email(),
});

type FormValues = z.infer<typeof formSchema>;

interface BackInStockNotificationButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
}

export default function BackInStockNotificationButton({
  product,
  selectedOptions,
  ...props
}: BackInStockNotificationButtonProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [sheetOpen, setSheetOpen] = useState(false);

  const mutation = useCreateBackInStockNotificationRequest();

  async function onSubmit({ email }: FormValues) {
    mutation.mutate({
      email,
      itemUrl: env.NEXT_PUBLIC_BASE_URL + "/products/" + product.slug,
      product,
      selectedOptions,
    });
  }

  return (
    <div>
      <button
        onClick={() => setSheetOpen(true)}
        className="rounded-md bg-orange-500 p-3 text-white"
      >
        Notify when available
      </button>
      <Modal isOpen={sheetOpen} onClose={() => setSheetOpen(false)}>
        <button className="rounded-md bg-orange-500 p-3 text-white">
          Notify when available
        </button>
      </Modal>
    </div>
  );
}
