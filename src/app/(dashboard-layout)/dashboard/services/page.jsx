"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Layers,
  Droplet,
  ChevronRight,
  Info,
  X,
  Sun,
  Moon,
} from "lucide-react";

const allServices = [
  {
    id: "ser-1",
    icon: "🚿",
    category: "Wash",
    title: "Exterior Eco Wash",
    shortDesc:
      "Full exterior hand wash with premium pH-neutral soap and tire shine.",
    longDesc:
      "Our Exterior Eco Wash uses advanced water-saving technology combined with premium, scratching-free microfiber mitts. We carefully clean the body, rims, arches, and finish up with a high-gloss tire dressing and streak-free window wiping.",
    price: "৳299",
    duration: "30-45 mins",
    features: [
      "Hand Wash & Dry",
      "Wheel & Tire Cleaning",
      "Tire Dressing",
      "Exterior Windows",
    ],
  },
  {
    id: "ser-2",
    icon: "🪣",
    category: "Detailing",
    title: "Interior Deep Detailing",
    shortDesc:
      "Deep vacuum, intense wipe-down, seat stain removal, and dashboard polish.",
    longDesc:
      "Restore that new-car smell and feel. We deep vacuum every corner, steam-clean fabric seats (or condition leather), remove stubborn stains from carpets, and apply a premium non-greasy UV protective polish to your dashboard and door panels.",
    price: "৳499",
    duration: "1.5 - 2 Hours",
    features: [
      "Deep Vacuuming",
      "Dashboard & Console Polish",
      "Stain & Odor Removal",
      "AC Vent Steam Cleaning",
    ],
  },
  {
    id: "ser-3",
    icon: "✨",
    category: "Detailing",
    title: "Full Inside-Out Detail",
    shortDesc:
      "The ultimate combination of deep interior cleaning and exterior wax polish.",
    longDesc:
      "Our most popular premium package. It includes everything from the exterior wash and deep interior detailing, plus a hand-applied premium carnauba wax to protect your paint and give it a deep, wet-look shine.",
    price: "৳899",
    duration: "3 - 4 Hours",
    features: [
      "Everything in Interior Detail",
      "Carnauba Hand Wax",
      "Engine Bay Cleaning",
      "Odor Eliminator Treatment",
    ],
  },
  {
    id: "ser-4",
    icon: "🪟",
    category: "Coating",
    title: "9H Ceramic Coating",
    shortDesc:
      "Ultra-durable hydrophobic paint protection layer that lasts for years.",
    longDesc:
      "Protect your investment from swirl marks, bird droppings, UV rays, and acid rain. We apply a multi-layer premium 9H Ceramic Coating after a thorough paint correction process, ensuring an incredible mirror-like finish and intense water hydrophobicity.",
    price: "৳2499",
    duration: "1 - 2 Days",
    features: [
      "1-Step Paint Correction",
      "9H Hydrophobic Layer",
      "3 Years Warranty",
      "Complimentary 1st Maintenance",
    ],
  },
];

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", prefersDark);
    setIsDark(prefersDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // ক্যাটাগরি ফিল্টারিং
  const filteredServices = allServices.filter((s) =>
    activeCategory === "All" ? true : s.category === activeCategory,
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-end max-w-2xl mx-auto mb-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            title="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full">
            Our Menu
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
            Premium Car Care Services
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
            Choose from our specialized range of detailing and washing packages.
            We bring professional car care right to your doorstep.
          </p>
        </div>

        {/* Category Tabs / Filters */}
        <div className="flex justify-center items-center gap-2 mb-10 overflow-x-auto pb-2 snap-x">
          {["All", "Wash", "Detailing", "Coating"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 snap-center ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                  : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-emerald-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800/80 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Icon & Category Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform inline-block">
                    {service.icon}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-md">
                    {service.category}
                  </span>
                </div>

                {/* Title & Short Desc */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                {/* Micro Specs */}
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                  <span className="flex items-center gap-1">
                    ⏱️ {service.duration}
                  </span>
                </div>
              </div>

              {/* Bottom Row: Price & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800/60 mt-auto">
                <div>
                  <span className="text-xs text-gray-400 block">
                    Price starting from
                  </span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                    {service.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Info Button */}
                  <button
                    onClick={() => setSelectedService(service)}
                    className="p-2.5 bg-gray-50 dark:bg-gray-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl border border-transparent hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-colors"
                    title="View Details"
                  >
                    <Info size={18} />
                  </button>

                  {/* Book Button */}
                  <Link href="/dashboard/bookings">
                    <button className="flex items-center gap-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all hover:translate-x-0.5 shadow-sm shadow-emerald-600/10">
                      Book Now <ChevronRight size={14} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Detail Modal Popup */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800/30">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedService.icon}</span>
                  <h3 className="font-bold text-lg">{selectedService.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Description
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedService.longDesc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl border border-gray-100 dark:border-gray-800/60">
                  <div>
                    <span className="text-[11px] text-gray-400 block">
                      Duration
                    </span>
                    <span className="text-xs font-semibold">
                      ⏳ {selectedService.duration}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block">
                      Category
                    </span>
                    <span className="text-xs font-semibold">
                      🏷️ {selectedService.category}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    What's Included
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedService.features.map((feat, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300"
                      >
                        <ShieldCheck
                          size={14}
                          className="text-emerald-500 shrink-0"
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">
                    Total Cost
                  </span>
                  <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                    {selectedService.price}
                  </span>
                </div>
                <Link
                  href="/dashboard/bookings"
                  onClick={() => setSelectedService(null)}
                >
                  <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all">
                    Proceed to Booking
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
