"use client";
import { BookingContext } from "@/context/booking.context";
import { use } from "react";
import { Clock, Calendar, Trash2, ShoppingBag } from "lucide-react";

const MyBookings = () => {
  const { bookings, removeBooking } = use(BookingContext);

  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-4 ml-5">
        <div className="h-16 w-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
          <ShoppingBag size={28} className="text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-700">No bookings yet</p>
        <p className="text-xs text-gray-400 mt-1">
          Your booked services will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">My Bookings</h2>
        <p className="text-sm text-gray-400 mt-0.5">
          {bookings.length} service{bookings.length !== 1 ? "s" : ""} booked
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={booking.img}
                alt={booking.name}
                className="w-full h-full object-cover"
              />
              {/* Price badge */}
              <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                ৳{booking.price.toLocaleString()}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 truncate">
                {booking.name}
              </h3>

              {/* Meta */}
              <div className="flex flex-col gap-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock size={13} className="shrink-0" />
                  <span>{booking.duration} mins</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar size={13} className="shrink-0" />
                  <span>
                    {new Date(booking.createdAt).toLocaleDateString("en-BD", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Status + Cancel */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Confirmed
                </span>
                <button
                  onClick={() => removeBooking(booking._id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <Trash2 size={13} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
