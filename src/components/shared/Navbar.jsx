"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useTheme } from "@/app/providers/ThemeProvider"; // থিম হুক ইমপোর্ট
import { Sun, Moon } from "lucide-react"; // আইকন ইমপোর্ট

const Navbar = () => {
  const { dark, toggleTheme } = useTheme(); // থিম স্টেট ও ফাংশন
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/review", label: "Reviews" },
    { href: "/aboutUs", label: "About us" },
  ];

  if (session) {
    navLinks.push({ href: "/add-service", label: "Add Service" });
  }

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href) ?? false;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="https://img.freepik.com/premium-vector/vector-car-logo-design_714931-342.jpg?semt=ais_hybrid&w=740&q=80"
            className="h-10 w-10 rounded-full object-cover"
            alt="Logo"
          />
          <span className="text-[17px] font-medium tracking-tight text-gray-900 dark:text-gray-100">
            CarClean
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(href)
                  ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50 font-semibold"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions (Theme Toggle + Auth) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {status === "loading" ? (
            <div className="flex items-center gap-2 px-5 py-2">
              <div className="w-4 h-4 rounded-full border-2 border-emerald-200 border-t-emerald-600 animate-spin" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Loading
              </span>
            </div>
          ) : session ? (
            <>
              <Link href="/dashboard">
                <button className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={() => signOut()}
                className="px-5 py-2 text-sm font-medium text-red-600 border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Actions (Theme Toggle + Auth + Hamburger) */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {status !== "loading" && session && (
            <Link href="/dashboard">
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
                Dashboard
              </button>
            </Link>
          )}
          {status !== "loading" && !session && (
            <button
              onClick={() => router.push("/login")}
              className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              Login
            </button>
          )}

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 pb-4">
          <div className="flex flex-col gap-1 pt-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive(href)
                    ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50 font-semibold"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Mobile Sign Out */}
            {session && (
              <button
                onClick={() => {
                  signOut();
                  closeMenu();
                }}
                className="mt-1 px-4 py-2.5 text-sm font-medium text-red-600 border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors text-left"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
