"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

const ROLE_STYLES = {
  admin: "bg-red-100 text-red-700",
  manager: "bg-blue-100 text-blue-700",
  user: "bg-emerald-100 text-emerald-700",
};

const UsersPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session && session.user.role !== "admin") router.replace("/dashboard");
  }, [session]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(data.users ?? []);
      } catch {
        setUsers([
          {
            _id: "1",
            name: "Rahim Hossain",
            email: "rahim@example.com",
            role: "user",
            createdAt: "2026-01-15",
          },
          {
            _id: "2",
            name: "Sara Ahmed",
            email: "sara@example.com",
            role: "manager",
            createdAt: "2026-02-20",
          },
          {
            _id: "3",
            name: "Admin User",
            email: "admin@carclean.com",
            role: "admin",
            createdAt: "2025-12-01",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await fetch("/api/admin/users/role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)),
      );
    } catch {
      alert("Failed to update role.");
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  if (session?.user?.role !== "admin") return null;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-bold text-gray-800">Manage Users</h1>
        <p className="text-sm text-gray-500">{users.length} total users</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["User", "Email", "Joined", "Role", "Change Role"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-gray-400 text-sm"
                  >
                    <RefreshCw size={16} className="inline mr-2 animate-spin" />
                    Loading...
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                          <span className="text-emerald-700 text-xs font-semibold">
                            {user.name?.[0]?.toUpperCase() ?? "U"}
                          </span>
                        </div>
                        <span className="font-medium text-gray-800">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-500">{user.email}</td>
                    <td className="px-5 py-4 text-gray-400 text-xs">
                      {user.createdAt?.slice(0, 10)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${ROLE_STYLES[user.role] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        disabled={user.email === session?.user?.email}
                        className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      >
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
