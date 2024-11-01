import { wixBrowserClient } from "@/lib/wix-client.browser";
import { updateMemberInfo, UpdateMemberInfoValues } from "@/wix-api/members";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useUpdateMember() {
  const router = useRouter();

  return useMutation({
    mutationFn: (variables: UpdateMemberInfoValues) =>
      updateMemberInfo(wixBrowserClient, variables),
    onSuccess() {
      toast.success("Profile Updated");
      setTimeout(() => {
        router.refresh();
      }, 2000);
    },
    onError(error) {
      console.error(error);

      toast.error("Failed to update profile. Please try again.");
    },
  });
}
