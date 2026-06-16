"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/review", label: "Reviews" },
    { href: "/aboutUs", label: "About us" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      style={{ borderBottom: "0.5px solid #e5e7eb" }}
      className="bg-white px-8 sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="https://img.freepik.com/premium-vector/vector-car-logo-design_714931-342.jpg?semt=ais_hybrid&w=740&q=80"
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="text-[17px] font-medium tracking-tight">
            CarClean
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(href)
                  ? "text-emerald-600 bg-emerald-50 font-semibold"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {label}
            </Link>
          ))}

          {session && (
            <Link
              href="/add-service"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive("/add-service")
                  ? "text-emerald-600 bg-emerald-50 font-semibold"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Add Service
            </Link>
          )}
        </div>

        {status === "loading" ? (
          <div className="flex items-center gap-2 px-5 py-2">
            <div className="w-4 h-4 rounded-full border-2 border-emerald-200 border-t-emerald-600 animate-spin" />
            <span className="text-sm font-medium text-emerald-600">
              Loading
            </span>
          </div>
        ) : session ? (
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
                Dashboard
              </button>
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")} // ✅ custom login page
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
