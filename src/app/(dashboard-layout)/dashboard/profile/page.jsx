"use client";
import { useSession } from "next-auth/react";
import { User, Mail, Shield, Calendar } from "lucide-react";

const Profile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="ml-[240px] p-8 flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 rounded-full border-2 border-emerald-200 border-t-emerald-600 animate-spin" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="bg-gray-50 p-8">
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-400 mt-1">
            Your personal account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Cover */}
          <div className="h-24 bg-gradient-to-r from-emerald-500 to-emerald-400" />

          {/* Avatar + Name */}
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-10 mb-6">
              {user?.image ? (
                <img
                  src={user.image}
                  className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white shadow-sm"
                />
              ) : (
                <div className="h-20 w-20 rounded-2xl bg-emerald-100 ring-4 ring-white shadow-sm flex items-center justify-center">
                  <span className="text-emerald-700 text-2xl font-bold">
                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                </div>
              )}
              <div className="pb-1">
                <h2 className="text-base font-semibold text-gray-900">
                  {user?.name ?? "User"}
                </h2>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-6" />

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="h-8 w-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                  <User size={15} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Full Name</p>
                  <p className="text-sm font-medium text-gray-800">
                    {user?.name ?? "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="h-8 w-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                  <Mail size={15} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Email Address</p>
                  <p className="text-sm font-medium text-gray-800 truncate max-w-[160px]">
                    {user?.email ?? "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="h-8 w-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                  <Shield size={15} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Account Type</p>
                  <p className="text-sm font-medium text-gray-800">
                    Standard User
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="h-8 w-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                  <Calendar size={15} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Member Since</p>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date().toLocaleDateString("en-BD", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
