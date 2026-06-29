"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { dark, toggleTheme } = useTheme();
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const role = session?.user?.role; // "admin" | "manager" | "user" | undefined

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/review", label: "Reviews" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/aboutUs", label: "About Us" },
  ];

  const roleLinks = {
    user: [
      { href: "/add-service", label: "Add Service" },
      // { href: "/my-bookings", label: "My Bookings" },
    ],
    manager: [
      { href: "/add-service", label: "Add Service" },
      // { href: "/manage-services", label: "Manage Services" },
      { href: "/dashboard/bookings", label: "All Bookings" },
    ],
    admin: [
      { href: "/add-service", label: "Add Service" },
      // { href: "/manage-services", label: "Manage Services" },
      { href: "/dashboard/bookings", label: "All Bookings" },
      { href: "/dashboard/users", label: "Manage Users" },
    ],
  };

  const extraLinks = role ? (roleLinks[role] ?? []) : [];
  const navLinks = [...publicLinks, ...extraLinks];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href) ?? false;
  };

  const closeMenu = () => setMenuOpen(false);

  // Role badge color
  const roleBadge = {
    admin: "bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400",
    manager: "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
    user: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[68px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="https://img.freepik.com/premium-vector/vector-car-logo-design_714931-342.jpg?semt=ais_hybrid&w=740&q=80"
            className="h-9 w-9 rounded-full object-cover"
            alt="CarClean Logo"
          />
          <span className="text-[16px] font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            CarClean
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-0.5 flex-wrap">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                isActive(href)
                  ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50 font-semibold"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {status === "loading" ? (
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="w-4 h-4 rounded-full border-2 border-emerald-200 border-t-emerald-600 animate-spin" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Loading
              </span>
            </div>
          ) : session ? (
            <div className="flex items-center gap-2">
              {/* Role Badge */}
              {role && (
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${roleBadge[role]}`}
                >
                  {role}
                </span>
              )}
              <Link href="/dashboard">
                <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Right Side */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile Role Badge */}
          {status !== "loading" && session && role && (
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${roleBadge[role]}`}
            >
              {role}
            </span>
          )}

          {/* Mobile Dashboard/Login */}
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

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
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
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 pb-4">
          <div className="flex flex-col gap-1 pt-3">
            {/* Nav Links */}
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
