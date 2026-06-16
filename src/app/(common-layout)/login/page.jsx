"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.ok) {
      toast.success("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1000);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <Toaster position="top-center" />

      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800">
            Welcome Back
          </h1>
          <p className="text-slate-500 mt-2 text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <a href="#" className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-xl transition-colors duration-200 text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-4 space-y-2">
          <button
            onClick={() => {
              toast.loading("Redirecting to Google...", { duration: 2000 });
              signIn("google", { callbackUrl: "/dashboard" });
            }}
            className="w-full border border-slate-200 text-slate-700 font-medium py-2.5 rounded-xl text-sm hover:bg-slate-50 transition"
          >
            Continue with Google
          </button>
          <button
            onClick={() => {
              toast.loading("Redirecting to GitHub...", { duration: 2000 });
              signIn("github", { callbackUrl: "/dashboard" });
            }}
            className="w-full border border-slate-200 text-slate-700 font-medium py-2.5 rounded-xl text-sm hover:bg-slate-50 transition"
          >
            Continue with GitHub
          </button>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
