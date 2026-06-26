"use client";
import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Car,
  User,
  CircleDollarSign,
  Filter,
} from "lucide-react";

// হার্ডকোডেড বুকিং ডাটা
const initialBookings = [
  {
    id: "BK-9482",
    customer: {
      name: "Ahsan Habib",
      email: "ahsan@gmail.com",
      phone: "01712345678",
    },
    service: "Full Detail",
    car: "Toyota Corolla (Dhaka Metro-Ga-12-3456)",
    date: "2026-06-28",
    time: "10:00 AM",
    price: "৳899",
    status: "Pending",
  },
  {
    id: "BK-9483",
    customer: {
      name: "Sadia Rahman",
      email: "sadia@yahoo.com",
      phone: "01987654321",
    },
    service: "Ceramic Coating",
    car: "Honda Civic (Dhaka Metro-Gha-98-7654)",
    date: "2026-06-27",
    time: "02:30 PM",
    price: "৳2499",
    status: "Confirmed",
  },
  {
    id: "BK-9484",
    customer: {
      name: "Kamal Hossain",
      email: "kamal@outlook.com",
      phone: "01555443322",
    },
    service: "Exterior Wash",
    car: "Hyundai Tucson (Chatto Metro-Ba-11-2233)",
    date: "2026-06-25",
    time: "09:00 AM",
    price: "৳299",
    status: "Completed",
  },
  {
    id: "BK-9485",
    customer: {
      name: "Zayan Ahmed",
      email: "zayan@gmail.com",
      phone: "01311223344",
    },
    service: "Interior Detailing",
    car: "Nissan X-Trail (Dhaka Metro-Cha-55-6677)",
    date: "2026-06-24",
    time: "04:00 PM",
    price: "৳499",
    status: "Cancelled",
  },
];

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState("All");

  // স্ট্যাটাস পরিবর্তনের ফাংশন
  const handleStatusChange = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
    );
  };

  // ফিল্টার অনুযায়ী ডাটা আলাদা করা
  const filteredBookings = bookings.filter((b) =>
    filter === "All" ? true : b.status === filter,
  );

  // স্ট্যাটাস অনুযায়ী ব্যাজের কালার
  const getStatusBadge = (status) => {
    const styles = {
      Pending:
        "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50",
      Confirmed:
        "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50",
      Completed:
        "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50",
      Cancelled:
        "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50",
    };
    return `px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status] || ""}`;
  };

  // স্ট্যাটাস কাউন্টার
  const countStatus = (status) => {
    if (status === "All") return bookings.length;
    return bookings.filter((b) => b.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Booking Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Review, confirm, and update all customer car wash bookings.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center gap-2 self-start sm:self-center shadow-sm">
            <CircleDollarSign className="text-emerald-500 w-5 h-5" />
            <span className="text-sm font-medium">Total Revenue:</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              ৳
              {bookings.reduce(
                (acc, b) =>
                  b.status === "Completed"
                    ? acc + parseInt(b.price.replace("৳", ""))
                    : acc,
                0,
              )}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
          {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  filter === tab
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/10"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-emerald-500 dark:hover:border-emerald-500"
                }`}
              >
                <p
                  className={`text-xs font-medium uppercase tracking-wider ${filter === tab ? "text-emerald-100" : "text-gray-400"}`}
                >
                  {tab}
                </p>
                <p className="text-xl sm:text-2xl font-bold mt-1">
                  {countStatus(tab)}
                </p>
              </button>
            ),
          )}
        </div>

        {/* Bookings List/Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="px-6 py-4">Booking ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Service & Car</th>
                  <th className="px-6 py-4">Schedule</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-gray-400">
                      No bookings found in this category.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr
                      key={b.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono font-semibold text-gray-600 dark:text-gray-400">
                        {b.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {b.customer.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {b.customer.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-emerald-600 dark:text-emerald-400">
                          {b.service}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                          <Car size={12} /> {b.car}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>{b.date}</div>
                        <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <Clock size={12} /> {b.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">
                        {b.price}
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadge(b.status)}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {b.status === "Pending" && (
                            <button
                              onClick={() =>
                                handleStatusChange(b.id, "Confirmed")
                              }
                              className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg border border-transparent hover:border-blue-200 dark:hover:border-blue-900/50 transition-all"
                              title="Confirm Booking"
                            >
                              <CheckCircle2 size={18} />
                            </button>
                          )}
                          {b.status === "Confirmed" && (
                            <button
                              onClick={() =>
                                handleStatusChange(b.id, "Completed")
                              }
                              className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-lg border border-transparent hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-all"
                              title="Mark as Completed"
                            >
                              <CheckCircle2 size={18} />
                            </button>
                          )}
                          {["Pending", "Confirmed"].includes(b.status) && (
                            <button
                              onClick={() =>
                                handleStatusChange(b.id, "Cancelled")
                              }
                              className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/50 text-red-600 dark:text-red-400 rounded-lg border border-transparent hover:border-red-200 dark:hover:border-red-900/50 transition-all"
                              title="Cancel Booking"
                            >
                              <XCircle size={18} />
                            </button>
                          )}
                          {["Completed", "Cancelled"].includes(b.status) && (
                            <span className="text-xs text-gray-400 dark:text-gray-500 px-2 py-1">
                              No Actions
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (Will show on smaller screens instead of squishing table) */}
          <div className="block lg:hidden divide-y divide-gray-200 dark:divide-gray-800">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">
                No bookings found in this category.
              </div>
            ) : (
              filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 sm:p-6 bg-white dark:bg-gray-900"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-gray-400">
                      {b.id}
                    </span>
                    <span className={getStatusBadge(b.status)}>{b.status}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {b.customer.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {b.customer.phone} • {b.customer.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Car className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          {b.service}
                        </p>
                        <p className="text-xs text-gray-500">{b.car}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock size={13} /> {b.date} ({b.time})
                      </span>
                      <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
                        {b.price}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Actions Button Row */}
                  {["Pending", "Confirmed"].includes(b.status) && (
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                      {b.status === "Pending" && (
                        <button
                          onClick={() => handleStatusChange(b.id, "Confirmed")}
                          className="flex-1 py-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-semibold border border-blue-200 dark:border-blue-900/50 hover:bg-blue-100 transition-colors text-center"
                        >
                          Confirm
                        </button>
                      )}
                      {b.status === "Confirmed" && (
                        <button
                          onClick={() => handleStatusChange(b.id, "Completed")}
                          className="flex-1 py-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-semibold border border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-100 transition-colors text-center"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => handleStatusChange(b.id, "Cancelled")}
                        className="flex-1 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl text-xs font-semibold border border-red-200 dark:border-red-900/50 hover:bg-red-100 transition-colors text-center"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingsPage;
