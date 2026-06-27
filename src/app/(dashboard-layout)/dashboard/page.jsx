"use client";
import { useSession } from "next-auth/react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Users,
  CalendarCheck,
  DollarSign,
  Star,
  TrendingUp,
  Wrench,
  ShieldCheck,
} from "lucide-react";

const monthlyRevenue = [
  { month: "Jan", revenue: 4200, bookings: 38 },
  { month: "Feb", revenue: 5800, bookings: 52 },
  { month: "Mar", revenue: 4900, bookings: 44 },
  { month: "Apr", revenue: 7200, bookings: 66 },
  { month: "May", revenue: 6100, bookings: 55 },
  { month: "Jun", revenue: 8900, bookings: 80 },
];

const serviceBreakdown = [
  { name: "Full Wash", value: 38 },
  { name: "Interior", value: 25 },
  { name: "Wax & Polish", value: 20 },
  { name: "Engine Clean", value: 17 },
];

const PIE_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#6366f1"];

const recentBookings = [
  {
    id: "BK-001",
    customer: "Rahim Hossain",
    service: "Full Wash",
    date: "2026-06-22",
    status: "Completed",
    amount: "৳1,200",
  },
  {
    id: "BK-002",
    customer: "Sara Ahmed",
    service: "Interior Clean",
    date: "2026-06-23",
    status: "Pending",
    amount: "৳800",
  },
  {
    id: "BK-003",
    customer: "Karim Uddin",
    service: "Wax & Polish",
    date: "2026-06-24",
    status: "In Progress",
    amount: "৳1,500",
  },
  {
    id: "BK-004",
    customer: "Nadia Islam",
    service: "Engine Clean",
    date: "2026-06-25",
    status: "Completed",
    amount: "৳2,000",
  },
  {
    id: "BK-005",
    customer: "Tanvir Khan",
    service: "Full Wash",
    date: "2026-06-26",
    status: "Cancelled",
    amount: "৳1,200",
  },
];

const STATUS_STYLES = {
  Completed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex items-start gap-3 sm:gap-4">
    <div className={`p-2.5 sm:p-3 rounded-xl ${color} shrink-0`}>
      <Icon size={18} className="text-white sm:hidden" />
      <Icon size={20} className="text-white hidden sm:block" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-0.5">
        {value}
      </p>
      {trend && (
        <p className="text-xs text-emerald-600 font-medium mt-1">
          <TrendingUp size={11} className="inline mr-1" />
          {trend}
        </p>
      )}
    </div>
  </div>
);

const USER_STATS = [
  {
    icon: CalendarCheck,
    label: "My Bookings",
    value: "12",
    trend: "+2 this month",
    color: "bg-emerald-500",
  },
  { icon: Star, label: "My Reviews", value: "5", color: "bg-amber-500" },
  {
    icon: DollarSign,
    label: "Total Spent",
    value: "৳8,400",
    trend: "+৳1,200 this month",
    color: "bg-blue-500",
  },
];

const ADMIN_STATS = [
  {
    icon: Users,
    label: "Total Users",
    value: "1,284",
    trend: "+18 this week",
    color: "bg-indigo-500",
  },
  {
    icon: CalendarCheck,
    label: "Total Bookings",
    value: "342",
    trend: "+24 this week",
    color: "bg-emerald-500",
  },
  {
    icon: DollarSign,
    label: "Monthly Revenue",
    value: "৳89,000",
    trend: "+12.5%",
    color: "bg-blue-500",
  },
  { icon: Star, label: "Avg. Rating", value: "4.8", color: "bg-amber-500" },
  {
    icon: Wrench,
    label: "Active Services",
    value: "8",
    color: "bg-purple-500",
  },
  {
    icon: ShieldCheck,
    label: "Roles Assigned",
    value: "3",
    color: "bg-red-500",
  },
];

const MANAGER_STATS = [
  {
    icon: CalendarCheck,
    label: "Total Bookings",
    value: "342",
    trend: "+24 this week",
    color: "bg-emerald-500",
  },
  {
    icon: DollarSign,
    label: "Monthly Revenue",
    value: "৳89,000",
    trend: "+12.5%",
    color: "bg-blue-500",
  },
  { icon: Star, label: "Avg. Rating", value: "4.8", color: "bg-amber-500" },
  {
    icon: Wrench,
    label: "Active Services",
    value: "8",
    color: "bg-purple-500",
  },
];

const DashboardPage = () => {
  const { data: session } = useSession();
  const role = session?.user?.role ?? "user";
  const stats =
    role === "admin"
      ? ADMIN_STATS
      : role === "manager"
        ? MANAGER_STATS
        : USER_STATS;
  const showCharts = role === "admin" || role === "manager";

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-800">
          Welcome back, {session?.user?.name?.split(" ")[0] ?? "User"} 👋
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Here's what's happening with CarClean today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {showCharts && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Revenue & Bookings (2026)
            </h3>
            <div className="h-[220px] sm:h-[260px] lg:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue} barGap={6}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11 }} width={32} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 11 }}
                    width={32}
                  />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar
                    yAxisId="left"
                    dataKey="revenue"
                    name="Revenue (৳)"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="bookings"
                    name="Bookings"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Services Breakdown
            </h3>
            <div className="h-[220px] sm:h-[260px] lg:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {serviceBreakdown.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {role === "user" && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            My Spending History (৳)
          </h3>
          <div className="h-[180px] sm:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} width={32} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Spent (৳)"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">
            Recent Bookings
          </h3>
          <span className="text-xs text-emerald-600 font-medium cursor-pointer hover:underline">
            View all →
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                {(role === "admin" || role === "manager") && (
                  <th className="text-left px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                )}
                <th className="text-left px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="text-left px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 sm:px-5 py-3 sm:py-3.5 font-mono text-xs text-gray-500">
                    {b.id}
                  </td>
                  {(role === "admin" || role === "manager") && (
                    <td className="px-3 sm:px-5 py-3 sm:py-3.5 font-medium text-gray-800">
                      {b.customer}
                    </td>
                  )}
                  <td className="px-3 sm:px-5 py-3 sm:py-3.5 text-gray-600">
                    {b.service}
                  </td>
                  <td className="px-3 sm:px-5 py-3 sm:py-3.5 text-gray-500 text-xs">
                    {b.date}
                  </td>
                  <td className="px-3 sm:px-5 py-3 sm:py-3.5">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-5 py-3 sm:py-3.5 text-right font-semibold text-gray-800">
                    {b.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
