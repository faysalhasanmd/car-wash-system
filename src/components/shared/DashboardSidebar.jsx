"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, CalendarCheck, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/my-booking", label: "My Bookings", icon: CalendarCheck },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isActive = (href) => pathname === href;

  return (
    <aside className="w-[220px] h-screen bg-white border-r border-gray-100 fixed left-0 top-0 flex flex-col shadow-sm z-50">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-3 px-5 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors shrink-0"
      >
        <img
          src="https://img.freepik.com/premium-vector/vector-car-logo-design_714931-342.jpg?semt=ais_hybrid&w=740&q=80"
          className="h-9 w-9 rounded-full object-cover ring-2 ring-emerald-100"
        />
        <span className="text-[15px] font-semibold text-gray-800 tracking-tight">
          CarClean
        </span>
      </Link>

      {/* User Info */}
      {session?.user && (
        <div className="px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            {session.user.image ? (
              <img
                src={session.user.image}
                className="h-8 w-8 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <span className="text-emerald-700 text-xs font-semibold">
                  {session.user.name?.[0]?.toUpperCase() ?? "U"}
                </span>
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {session.user.name ?? "User"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Nav Label */}
      <div className="px-5 pt-5 pb-2 shrink-0">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Menu
        </span>
      </div>

      {/* Nav Links — flex-1 দিয়ে বাকি জায়গা নেবে */}
      <nav className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(href)
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Icon
              size={16}
              className={isActive(href) ? "text-emerald-600" : "text-gray-400"}
            />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100 shrink-0">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
