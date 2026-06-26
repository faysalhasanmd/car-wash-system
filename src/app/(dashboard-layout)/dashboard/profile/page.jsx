"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Camera,
  Save,
  CheckCircle,
} from "lucide-react";

const ProfilePage = () => {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    photoURL: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (session?.user) {
      setForm((prev) => ({
        ...prev,
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        photoURL: session.user.image ?? "",
      }));
    }
  }, [session]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          phone: form.phone,
          photoURL: form.photoURL,
          ...(form.newPassword
            ? {
                newPassword: form.newPassword,
                currentPassword: form.currentPassword,
              }
            : {}),
        }),
      });
      const data = await res.json();
      if (data.status === 200) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        await update({ name: form.name, image: form.photoURL });
      } else {
        alert(data.message || "Update failed");
      }
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const role = session?.user?.role ?? "user";
  const ROLE_COLORS = {
    admin: "bg-red-100 text-red-700",
    manager: "bg-blue-100 text-blue-700",
    user: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
        <div className="relative shrink-0">
          {form.photoURL ? (
            <img
              src={form.photoURL}
              alt={form.name}
              className="h-20 w-20 rounded-2xl object-cover ring-2 ring-gray-100"
            />
          ) : (
            <div className="h-20 w-20 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-700 text-2xl font-bold">
                {form.name?.[0]?.toUpperCase() ?? "U"}
              </span>
            </div>
          )}
          <div className="absolute -bottom-2 -right-2 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm">
            <Camera size={13} className="text-gray-500" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {form.name || "Your Name"}
          </h2>
          <p className="text-sm text-gray-500">{form.email}</p>
          <span
            className={`mt-1.5 inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${ROLE_COLORS[role]}`}
          >
            {role}
          </span>
        </div>
        {saved && (
          <div className="ml-auto flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
            <CheckCircle size={16} /> Saved!
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-5">
          Personal Information
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              label: "Photo URL",
              name: "photoURL",
              type: "url",
              icon: Camera,
              placeholder: "https://example.com/photo.jpg",
            },
            {
              label: "Full Name",
              name: "name",
              type: "text",
              icon: User,
              placeholder: "John Smith",
              required: true,
            },
            {
              label: "Email Address",
              name: "email",
              type: "email",
              icon: Mail,
              placeholder: "you@example.com",
              required: true,
            },
            {
              label: "Phone Number",
              name: "phone",
              type: "tel",
              icon: Phone,
              placeholder: "+880 1234 567890",
            },
          ].map(({ label, name, type, icon: Icon, placeholder, required }) => (
            <div key={name}>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                {label}
              </label>
              <div className="relative">
                <Icon
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  required={required}
                  placeholder={placeholder}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>
            </div>
          ))}

          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Change Password
            </h3>
            <div className="space-y-3">
              {[
                { name: "currentPassword", placeholder: "Current password" },
                {
                  name: "newPassword",
                  placeholder: "New password (leave blank to keep current)",
                },
              ].map(({ name, placeholder }) => (
                <div key={name} className="relative">
                  <Lock
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="password"
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={15} />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
