"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API call or email service here
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Hero */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full mb-3">
            Contact
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Get in Touch
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl text-base">
            Have a question or want to book a service? Reach out to us and we'll
            get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Contact Information
            </h2>

            <div className="space-y-4">
              {[
                {
                  icon: <Phone size={18} />,
                  label: "Phone",
                  value: "+880 1798484639",
                },
                {
                  icon: <Mail size={18} />,
                  label: "Email",
                  value: "faysalhasanmd393@gmail.com",
                },
                {
                  icon: <MapPin size={18} />,
                  label: "Address",
                  value: "Mirpur, Dhaka - 1205, Bangladesh",
                },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl"
                >
                  <span className="mt-0.5 p-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-lg">
                    {icon}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-sm text-gray-400 dark:text-gray-500">
                📍 Add your map here
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-2xl">
                  ✓
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Message Sent!
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                  We'll get back to you shortly. Thank you for reaching out!
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Send a Message
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. John Smith"
                      required
                      className="w-full px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                      className="w-full px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 transition resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!form.name || !form.email || !form.message}
                    className="w-full flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <Send size={15} />
                    Send Message
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
