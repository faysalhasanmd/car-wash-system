"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

const ROLE_BADGE = {
  admin: { label: "Admin", color: "bg-red-100 text-red-700" },
  manager: { label: "Manager", color: "bg-blue-100 text-blue-700" },
  user: { label: "User", color: "bg-emerald-100 text-emerald-700" },
};

const DashboardNavbar = ({ title = "Dashboard" }) => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const dropdownRef = useRef(null);

  const role = session?.user?.role ?? "user";
  const badge = ROLE_BADGE[role] ?? ROLE_BADGE.user;

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ Fix: redirect callback bypass করে নিজে hard-navigate করছি
  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await signOut({ redirect: false });
      window.location.href = "/login";
    } catch (err) {
      console.error("Sign out failed:", err);
      setSigningOut(false);
    }
  };

  return (
    <header className="h-[64px] bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
      <div>
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <p className="text-[11px] text-gray-400">CarClean Management System</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-1 ring-white" />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            {session?.user?.image ? (
              <img
                src={session.user.image}
                className="h-7 w-7 rounded-full object-cover"
                alt={session?.user?.name}
              />
            ) : (
              <div className="h-7 w-7 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-emerald-700 text-xs font-semibold">
                  {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
                </span>
              </div>
            )}
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-gray-800 leading-tight">
                {session?.user?.name ?? "User"}
              </p>
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${badge.color}`}
              >
                {badge.label}
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-gray-100 shadow-lg py-1.5 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {session?.user?.email}
                </p>
              </div>

              <div className="py-1">
                <Link
                  href="/dashboard"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <LayoutDashboard size={14} className="text-gray-400" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <User size={14} className="text-gray-400" />
                  My Profile
                </Link>
                {(role === "admin" || role === "manager") && (
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <Settings size={14} className="text-gray-400" />
                    Settings
                  </Link>
                )}
              </div>

              <div className="border-t border-gray-100 pt-1">
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogOut size={14} />
                  {signingOut ? "Signing out..." : "Sign Out"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
