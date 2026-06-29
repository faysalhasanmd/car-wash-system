"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  User,
  CalendarCheck,
  LogOut,
  LayoutDashboard,
  Users,
  Settings,
  ShieldCheck,
  BarChart2,
  Wrench,
  Star,
  Bell,
  Menu,
  X,
  Globe,
} from "lucide-react";

// ─── Role-based dashboard nav config ──────────────────────────────────────────
const NAV_CONFIG = {
  user: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    {
      href: "/dashboard/my-bookings",
      label: "My Bookings",
      icon: CalendarCheck,
    },
    { href: "/dashboard/reviews", label: "My Reviews", icon: Star },
  ],
  manager: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/bookings", label: "All Bookings", icon: CalendarCheck },
    { href: "/dashboard/services", label: "Services", icon: Wrench },
    { href: "/dashboard/reports", label: "Reports", icon: BarChart2 },
    { href: "/dashboard/reviews", label: "Reviews", icon: Star },
  ],
  admin: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/users", label: "Manage Users", icon: Users },
    { href: "/dashboard/bookings", label: "All Bookings", icon: CalendarCheck },
    { href: "/dashboard/services", label: "Services", icon: Wrench },
    { href: "/dashboard/reports", label: "Reports", icon: BarChart2 },
    { href: "/dashboard/reviews", label: "Reviews", icon: Star },
    { href: "/dashboard/roles", label: "Roles & Perms", icon: ShieldCheck },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ],
};

// ─── Main site nav config (same routes as the public Navbar) ─────────────────
const SITE_PUBLIC_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/review", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/aboutUs", label: "About Us" },
];

const SITE_ROLE_LINKS = {
  user: [{ href: "/add-service", label: "Add Service" }],
  manager: [
    { href: "/add-service", label: "Add Service" },
    { href: "/dashboard/bookings", label: "All Bookings" },
  ],
  admin: [
    { href: "/add-service", label: "Add Service" },
    { href: "/dashboard/bookings", label: "All Bookings" },
    { href: "/dashboard/users", label: "Manage Users" },
  ],
};

const ROLE_BADGE = {
  admin: { label: "Admin", color: "bg-red-100 text-red-700" },
  manager: { label: "Manager", color: "bg-blue-100 text-blue-700" },
  user: { label: "User", color: "bg-emerald-100 text-emerald-700" },
};

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false); // sidebar drawer
  const [siteNavOpen, setSiteNavOpen] = useState(false); // new: site routes dropdown
  const siteNavRef = useRef(null);

  const role = session?.user?.role ?? "user";
  const navItems = NAV_CONFIG[role] ?? NAV_CONFIG.user;
  const badge = ROLE_BADGE[role] ?? ROLE_BADGE.user;

  const siteLinks = [...SITE_PUBLIC_LINKS, ...(SITE_ROLE_LINKS[role] ?? [])];

  const isActive = (href) =>
    href === "/dashboard" ? pathname === href : pathname?.startsWith(href);

  // Close the site-nav dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (siteNavRef.current && !siteNavRef.current.contains(e.target)) {
        setSiteNavOpen(false);
      }
    };
    if (siteNavOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [siteNavOpen]);

  return (
    <>
      {/* ── Mobile / Tablet top bar (hidden on lg+) ────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 z-50">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="https://img.freepik.com/premium-vector/vector-car-logo-design_714931-342.jpg?semt=ais_hybrid&w=740&q=80"
            className="h-8 w-8 rounded-full object-cover ring-2 ring-emerald-100"
            alt="CarClean"
          />
          <span className="text-[14px] font-semibold text-gray-800 tracking-tight">
            CarClean
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {/* ── NEW: Site routes dropdown trigger ── */}
          <div className="relative" ref={siteNavRef}>
            <button
              onClick={() => setSiteNavOpen((v) => !v)}
              aria-label="Open site navigation"
              className="p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100"
            >
              <Globe size={20} className="text-gray-700" />
            </button>

            {siteNavOpen && (
              <div className="absolute right-0 top-full mt-3 w-64 max-w-[85vw] bg-white rounded-2xl border border-gray-100 shadow-2xl ring-1 ring-black/5 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                {/* Caret pointing up to the trigger button */}
                <span className="absolute -top-1.5 right-4 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />

                <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
                  <Globe size={13} className="text-emerald-500" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                    Site Pages
                  </span>
                </div>
                <div className="max-h-[60vh] overflow-y-auto py-1.5">
                  {siteLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setSiteNavOpen(false)}
                      className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive(href)
                          ? "text-emerald-600 bg-emerald-50 font-semibold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Existing: Sidebar drawer trigger ── */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100"
          >
            <Menu size={22} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* ── Backdrop overlay (mobile/tablet only, shown when sidebar open) ── */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        className={`w-[260px] sm:w-[240px] h-screen bg-white border-r border-gray-100 fixed left-0 top-0 flex flex-col shadow-sm z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Close button — mobile/tablet only */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
          className="lg:hidden absolute top-3 right-3 p-1.5 rounded-lg hover:bg-gray-50 text-gray-400"
        >
          <X size={18} />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 px-5 py-[18px] border-b border-gray-100 hover:bg-gray-50 transition-colors shrink-0"
        >
          <img
            src="https://img.freepik.com/premium-vector/vector-car-logo-design_714931-342.jpg?semt=ais_hybrid&w=740&q=80"
            className="h-9 w-9 rounded-full object-cover ring-2 ring-emerald-100"
            alt="CarClean"
          />
          <span className="text-[15px] font-semibold text-gray-800 tracking-tight">
            CarClean
          </span>
        </Link>

        {/* User Info + Role Badge */}
        {session?.user && (
          <div className="px-4 py-4 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-3">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  className="h-9 w-9 rounded-full object-cover shrink-0 ring-2 ring-gray-100"
                  alt={session.user.name}
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <span className="text-emerald-700 text-sm font-semibold">
                    {session.user.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {session.user.name ?? "User"}
                </p>
                <p className="text-[11px] text-gray-400 truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
            <span
              className={`mt-2 inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${badge.color}`}
            >
              {badge.label}
            </span>
          </div>
        )}

        {/* Section label */}
        <div className="px-5 pt-4 pb-1 shrink-0">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Navigation
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 flex flex-col gap-0.5 px-3 overflow-y-auto pb-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive(href)
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon
                size={15}
                className={
                  isActive(href) ? "text-emerald-600" : "text-gray-400"
                }
              />
              {label}
            </Link>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="px-3 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
