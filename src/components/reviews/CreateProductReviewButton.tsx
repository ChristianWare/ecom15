"use client";

import { members } from "@wix/members";
import { products } from "@wix/stores";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import CreateProductReviewDialog from "./CreateProductReviewDialog";

interface CreateProductReviewButtonProps {
  product: products.Product;
  loggedInMember: members.Member | null;
  hasExistingReview: boolean;
}

export default function CreateProductReviewButton({
  product,
  loggedInMember,
  hasExistingReview,
}: CreateProductReviewButtonProps) {
  const searchParams = useSearchParams();

  const [showReviewDialog, setShowReviewDialog] = useState(
    searchParams.has("createReview"),
  );

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowReviewDialog(true)}
        disabled={!loggedInMember}
        className={`rounded-md px-4 py-2 font-semibold text-white ${
          loggedInMember
            ? "bg-blue-600 hover:bg-blue-700"
            : "cursor-not-allowed bg-gray-400"
        }`}
      >
        {loggedInMember ? "Write a review" : "Log in to write a review"}
      </button>

      <CreateProductReviewDialog
        product={product}
        open={showReviewDialog && !hasExistingReview && !!loggedInMember}
        onOpenChange={setShowReviewDialog}
        onSubmitted={() => {
          setShowReviewDialog(false);
          setShowConfirmationDialog(true);
        }}
      />

      <ReviewSubmittedDialog
        open={showConfirmationDialog}
        onOpenChange={setShowConfirmationDialog}
      />

      <ReviewAlreadyExistsDialog
        open={showReviewDialog && hasExistingReview}
        onOpenChange={setShowReviewDialog}
      />
    </>
  );
}

interface ReviewSubmittedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ReviewSubmittedDialog({
  open,
  onOpenChange,
}: ReviewSubmittedDialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            Thank you for your review!
          </h2>
          <p className="text-sm text-gray-600">
            Your review has been submitted successfully. It will be visible once
            it has been approved by our team.
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface ReviewAlreadyExistsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ReviewAlreadyExistsDialog({
  open,
  onOpenChange,
}: ReviewAlreadyExistsDialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            Review already exists
          </h2>
          <p className="text-sm text-gray-600">
            You have already written a review for this product. You can only
            write one review per product.
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
