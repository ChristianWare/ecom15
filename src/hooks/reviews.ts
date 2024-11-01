import { wixBrowserClient } from "@/lib/wix-client.browser";
import {
  createProductReview,
  CreateProductReviewValues,
} from "@/wix-api/reviews";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateProductReview() {
  return useMutation({
    mutationFn: (values: CreateProductReviewValues) =>
      createProductReview(wixBrowserClient, values),
    onError(error) {
      console.error(error);
      toast.error("Failed to create review. Please try again.");
    },
  });
}
