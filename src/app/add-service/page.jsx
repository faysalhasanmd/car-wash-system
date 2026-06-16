"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Urgent"];

const AddServicePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    date: "",
    priority: "Medium",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "imageUrl") setImagePreview(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.shortDescription.trim() || !form.price) {
      setToast({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setToast({ type: "success", message: "Service added successfully!" });
    setForm({
      title: "",
      shortDescription: "",
      fullDescription: "",
      price: "",
      date: "",
      priority: "Medium",
      imageUrl: "",
    });
    setImagePreview("");
    setLoading(false);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-emerald-200 border-t-emerald-600 animate-spin" />
          <span className="text-sm text-gray-500">Checking session...</span>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all duration-300 ${
            toast.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          {toast.message}
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-emerald-600 font-medium">Add Service</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Add New Service
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to list a new car care service.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Preview */}
          {imagePreview && (
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-white">
              <img
                src={imagePreview}
                alt="Service preview"
                className="w-full h-48 object-cover"
                onError={() => setImagePreview("")}
              />
            </div>
          )}

          {/* Service Info Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-5">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
              Service Info
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Premium Full Car Wash"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-300 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Short Description <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="One-line summary shown on service cards"
                maxLength={120}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-300 transition"
              />
              <p className="text-xs text-gray-400 mt-1 text-right">
                {form.shortDescription.length}/120
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Description
              </label>
              <textarea
                name="fullDescription"
                value={form.fullDescription}
                onChange={handleChange}
                rows={5}
                placeholder="Detailed description — what's included, duration, benefits..."
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-300 transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Image URL{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-300 transition"
              />
            </div>
          </div>

          {/* Pricing & Details Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-5">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
              Pricing & Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price (৳) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                    ৳
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full pl-8 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-300 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Available From
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <div className="flex flex-wrap gap-2">
                {PRIORITY_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, priority: option }))
                    }
                    className={`px-4 py-1.5 text-sm rounded-full border font-medium transition-colors ${
                      form.priority === option
                        ? option === "Urgent"
                          ? "bg-red-500 border-red-500 text-white"
                          : option === "High"
                            ? "bg-orange-500 border-orange-500 text-white"
                            : option === "Medium"
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "bg-gray-600 border-gray-600 text-white"
                        : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-4 pb-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-7 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-emerald-300 border-t-white animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Service
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServicePage;
