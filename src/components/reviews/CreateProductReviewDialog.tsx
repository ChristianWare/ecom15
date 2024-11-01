/* eslint-disable @next/next/no-img-element */
"use client";

import { useCreateProductReview } from "@/hooks/reviews";
import { zodResolver } from "@hookform/resolvers/zod";
import { products } from "@wix/stores";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "../LoadingButton";
import WixImage from "../WixImage";
import { StarIcon } from "lucide-react";
import useMediaUpload, { MediaAttachment } from "./useMediaUpload";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Must be at least 5 characters")
    .max(100, "Can't be longer than 100 characters")
    .or(z.literal("")),
  body: z
    .string()
    .trim()
    .min(10, "Must be at least 10 characters")
    .max(3000, "Can't be longer than 3000 characters")
    .or(z.literal("")),
  rating: z.number().int().min(1, "Please rate this product"),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateProductReviewDialogProps {
  product: products.Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted: () => void;
}

export default function CreateProductReviewDialog({
  product,
  open,
  onOpenChange,
  onSubmitted,
}: CreateProductReviewDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      rating: 0,
    },
  });

  const mutation = useCreateProductReview();
  const { attachments, startUpload, removeAttachment, clearAttachments } =
    useMediaUpload();
  const router = useRouter();

  const rating = form.watch("rating"); // Watch the rating value in real time

  async function onSubmit({ title, body, rating }: FormValues) {
    if (!product._id) {
      throw Error("Product ID is missing");
    }

    mutation.mutate(
      {
        productId: product._id,
        title,
        body,
        rating,
        media: attachments
          .filter((m) => m.url)
          .map((m) => ({
            url: m.url!,
            type: m.file.type.startsWith("image") ? "image" : "video",
          })),
      },
      {
        onSuccess: () => {
          form.reset();
          clearAttachments();
          onSubmitted();
          setTimeout(() => {
            router.refresh();
          }, 2000);
        },
      },
    );
  }

  const uploadInProgress = attachments.some((m) => m.state === "uploading");

  return (
    open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-800">Write a review</h2>
          <p className="mb-5 text-sm text-gray-600">
            Did you like this product? Share your thoughts with other customers.
          </p>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Product
              </label>
              <div className="flex items-center gap-3">
                <WixImage
                  mediaIdentifier={product.media?.mainMedia?.image?.url}
                  width={50}
                  height={50}
                />
                <span className="font-bold">{product.name}</span>
              </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Rating Field */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Rating
                </label>
                <StarRatingInput
                  value={rating} // Pass the real-time watched rating
                  onChange={(value) => form.setValue("rating", value)}
                />
                {form.formState.errors.rating && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.rating.message}
                  </p>
                )}
              </div>

              {/* Title Field */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  placeholder="Title"
                  {...form.register("title")}
                  className="mt-1 rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {form.formState.errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>

              {/* Body Field */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  placeholder="Tell others about your experience..."
                  {...form.register("body")}
                  className="mt-1 rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {form.formState.errors.body && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.body.message}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Write a detailed review to help other customers.
                </p>
              </div>

              {/* Attachments */}
              {/* <div className="flex flex-wrap gap-5">
                {attachments.map((attachment) => (
                  <AttachmentPreview
                    key={attachment.id}
                    attachment={attachment}
                    onRemoveClick={removeAttachment}
                  />
                ))}
                <AddMediaButton
                  onFileSelected={startUpload}
                  disabled={
                    attachments.filter((a) => a.state !== "failed").length >= 5
                  }
                />
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={uploadInProgress}
                className="rounded-md bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

function StarRatingInput({ value, onChange }: StarRatingInputProps) {
  const ratingsText = ["Terrible", "Bad", "Okay", "Good", "Great"];

  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          type="button"
          className="h-7 w-7"
        >
          <StarIcon
            width={20}
            height={20}
            className={i < value ? "text-yellow-500" : "text-gray-300"}
            fill={i < value ? "currentColor" : "none"}
          />
        </button>
      ))}
      <span className="text-sm text-gray-600">{ratingsText[value - 1]}</span>
    </div>
  );
}

interface AddMediaButtonProps {
  onFileSelected: (file: File) => void;
  disabled: boolean;
}

function AddMediaButton({ onFileSelected, disabled }: AddMediaButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={`rounded-md border border-gray-300 p-2 ${
          disabled ? "cursor-not-allowed bg-gray-300" : "bg-white"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        Upload
      </button>
      <input
        type="file"
        accept="image/*, video/*"
        ref={fileInputRef}
        className="sr-only hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) {
            onFileSelected(files[0]);
            e.target.value = "";
          }
        }}
      />
    </>
  );
}

interface AttachmentPreviewProps {
  attachment: MediaAttachment;
  onRemoveClick: (id: string) => void;
}

function AttachmentPreview({
  attachment: { id, file, state, url },
  onRemoveClick,
}: AttachmentPreviewProps) {
  return (
    <div className="relative max-h-24 max-w-xs overflow-hidden rounded-md border">
      {file.type.startsWith("image") ? (
        <img
          src={url || URL.createObjectURL(file)}
          alt="Attachment preview"
          className={`h-full w-full object-cover ${!url ? "opacity-50" : ""}`}
        />
      ) : (
        <video controls className="h-full w-full object-cover">
          <source src={url || URL.createObjectURL(file)} type={file.type} />
        </video>
      )}
      {state === "uploading" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="loader" />
        </div>
      )}
      {state === "failed" && (
        <div
          className="absolute inset-0 flex items-center justify-center text-red-600"
          title="Failed to upload media"
        >
          !
        </div>
      )}
      <button
        type="button"
        onClick={() => onRemoveClick(id)}
        className="absolute right-1 top-1 rounded-full bg-white p-1"
        title="Remove media"
      >
        &times;
      </button>
    </div>
  );
}
