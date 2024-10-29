import { wixBrowserClient } from "@/lib/wix-client.browser";
import {
  addToCart,
  AddToCartValues,
  getCart,
  clearCart,
  removeCartItem,
  updateCartItemQuantity,
  UpdateCartItemQuantityValues,
} from "@/wix-api/cart";
import {
  QueryKey,
  MutationKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import toast from "react-hot-toast";

const queryKey: QueryKey = ["cart"];

export function useCart(initialData: currentCart.Cart | null) {
  return useQuery({
    queryKey,
    queryFn: () => getCart(wixBrowserClient),
    initialData,
  });
}

export function useAdditemToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: AddToCartValues) =>
      addToCart(wixBrowserClient, values),
    onSuccess(data) {
      toast.success("Item added to Cart");
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, data.cart);
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to add items to cart. Please try again");
    },
  });
}

export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();

  const mutationKey: MutationKey = ["updateCartItemQuantity"];

  return useMutation({
    mutationKey,
    mutationFn: (values: UpdateCartItemQuantityValues) =>
      updateCartItemQuantity(wixBrowserClient, values),
    onMutate: async ({ productId, newQuantity }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousState =
        queryClient.getQueryData<currentCart.Cart>(queryKey);

      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => ({
        ...oldData,
        lineItems: oldData?.lineItems?.map((lineItem) =>
          lineItem._id === productId
            ? { ...lineItem, quantity: newQuantity }
            : lineItem,
        ),
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);

      toast.error("Something went wrong. Please try again.");
    },
    onSettled() {
      if (queryClient.isMutating({ mutationKey }) === 1) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      removeCartItem(wixBrowserClient, productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousState =
        queryClient.getQueryData<currentCart.Cart>(queryKey);

      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => ({
        ...oldData,
        lineItems: oldData?.lineItems?.filter(
          (lineItem) => lineItem._id !== productId,
        ),
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);

      toast.error("Something went wrong. Please try again.");
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCart(wixBrowserClient),
    onSuccess() {
      queryClient.setQueryData(queryKey, null);
      queryClient.invalidateQueries({ queryKey });
    },
    retry: 3,
  });
}
