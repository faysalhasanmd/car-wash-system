"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Star,
  Pencil,
  Trash2,
  RefreshCw,
  MessageSquareOff,
  X,
  Check,
} from "lucide-react";

const StarRating = ({ rating, size = 16, interactive = false, onChange }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        disabled={!interactive}
        onClick={() => interactive && onChange?.(n)}
        className={interactive ? "cursor-pointer" : "cursor-default"}
        aria-label={`${n} star${n > 1 ? "s" : ""}`}
      >
        <Star
          size={size}
          className={
            n <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      </button>
    ))}
  </div>
);

const MyReviewsPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [reviews, setReviews] = useState([
    {
      _id: "r1",
      serviceTitle: "Premium Full Car Wash",
      serviceImage: "",
      rating: 5,
      comment:
        "অসাধারণ সার্ভিস! গাড়িটা একদম নতুনের মতো হয়ে গেছে। টিম খুব professional ছিল।",
      createdAt: "2026-05-12",
    },
    {
      _id: "r2",
      serviceTitle: "Interior Detailing",
      serviceImage: "",
      rating: 4,
      comment:
        "সিটগুলো খুব ভালোভাবে পরিষ্কার করেছে, তবে একটু বেশি সময় লেগেছে।",
      createdAt: "2026-04-02",
    },
    {
      _id: "r3",
      serviceTitle: "Engine Bay Cleaning",
      serviceImage: "",
      rating: 3,
      comment:
        "কাজ মোটামুটি ভালো হয়েছে, কিন্তু কিছু জায়গা মিস হয়ে গেছে। আরও মনোযোগ দরকার ছিল।",
      createdAt: "2026-03-18",
    },
    {
      _id: "r4",
      serviceTitle: "Exterior Polish & Wax",
      serviceImage: "",
      rating: 5,
      comment:
        "গাড়ির রং একদম চকচকে হয়ে গেছে! দাম অনুযায়ী সার্ভিস খুবই ভালো। আবার আসব।",
      createdAt: "2026-02-25",
    },
    {
      _id: "r5",
      serviceTitle: "Tire & Rim Cleaning",
      serviceImage: "",
      rating: 4,
      comment:
        "টায়ার এবং রিম দুটোই ভালো পরিষ্কার হয়েছে। সময়মতো কাজ শেষ করেছে।",
      createdAt: "2026-01-10",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ rating: 5, comment: "" });
  const [savingId, setSavingId] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const startEdit = (review) => {
    setEditingId(review._id);
    setEditForm({ rating: review.rating, comment: review.comment });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ rating: 5, comment: "" });
  };

  const saveEdit = async (id) => {
    if (!editForm.comment.trim()) {
      setToast({ type: "error", message: "Review can't be empty." });
      return;
    }

    setSavingId(id);
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to update review.");
      }

      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, ...editForm } : r)),
      );
      setToast({ type: "success", message: "Review updated." });
      setEditingId(null);
    } catch (err) {
      // Hardcode mode: just update locally
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, ...editForm } : r)),
      );
      setToast({ type: "success", message: "Review updated." });
      setEditingId(null);
    } finally {
      setSavingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/reviews/${deleteTarget._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to delete review.");
      }

      setReviews((prev) => prev.filter((r) => r._id !== deleteTarget._id));
      setToast({ type: "success", message: "Review deleted." });
    } catch (err) {
      // Hardcode mode: just delete locally
      setReviews((prev) => prev.filter((r) => r._id !== deleteTarget._id));
      setToast({ type: "success", message: "Review deleted." });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        <RefreshCw size={16} className="mr-2 animate-spin" />
        Checking session...
      </div>
    );
  }

  if (status !== "authenticated") return null;

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg text-sm font-medium text-white transition-all ${
            toast.type === "success" ? "bg-emerald-600" : "bg-red-500"
          }`}
        >
          {toast.type === "success" ? <Check size={16} /> : <X size={16} />}
          {toast.message}
        </div>
      )}

      <div>
        <h1 className="text-lg font-bold text-gray-800">My Reviews</h1>
        <p className="text-sm text-gray-500">
          {reviews.length} review{reviews.length !== 1 ? "s" : ""} you&apos;ve
          left
        </p>
        {error && (
          <p className="text-xs text-red-500 mt-1">
            {error} — showing fallback data.
          </p>
        )}
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 flex items-center justify-center text-gray-400 text-sm">
          <RefreshCw size={16} className="mr-2 animate-spin" />
          Loading your reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 flex flex-col items-center justify-center text-center px-6">
          <MessageSquareOff size={32} className="text-gray-300 mb-3" />
          <p className="text-sm font-medium text-gray-600">No reviews yet</p>
          <p className="text-xs text-gray-400 mt-1 max-w-xs">
            Once you book and complete a service, you can leave a review for it
            here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => {
            const isEditing = editingId === review._id;
            return (
              <div
                key={review._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 overflow-hidden">
                      {review.serviceImage ? (
                        <img
                          src={review.serviceImage}
                          alt={review.serviceTitle}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Star size={18} className="text-emerald-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {review.serviceTitle}
                      </p>
                      <p className="text-xs text-gray-400">
                        {review.createdAt?.slice(0, 10)}
                      </p>
                    </div>
                  </div>

                  {!isEditing && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => startEdit(review)}
                        className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                        aria-label="Edit review"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(review)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        aria-label="Delete review"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="mt-4 space-y-3">
                    <StarRating
                      rating={editForm.rating}
                      size={20}
                      interactive
                      onChange={(n) =>
                        setEditForm((p) => ({ ...p, rating: n }))
                      }
                    />
                    <textarea
                      value={editForm.comment}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, comment: e.target.value }))
                      }
                      rows={3}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-1.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveEdit(review._id)}
                        disabled={savingId === review._id}
                        className="px-4 py-1.5 text-xs font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-60 transition-colors"
                      >
                        {savingId === review._id ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mt-3">
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {review.comment}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-base font-semibold text-gray-800">
              Delete this review?
            </h3>
            <p className="text-sm text-gray-500 mt-1.5">
              Your review for &quot;{deleteTarget.serviceTitle}&quot; will be
              permanently removed. This can&apos;t be undone.
            </p>
            <div className="flex items-center justify-end gap-2 mt-5">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviewsPage;
