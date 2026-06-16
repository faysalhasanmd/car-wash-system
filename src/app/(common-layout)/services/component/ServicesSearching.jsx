"use client";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import React, { useState } from "react";

const ServicesSearching = ({ services = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState("");

  // Real-time filtering logic
  const filtered = services.filter((service) => {
    const matchName = service.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchPrice = price ? service.price <= Number(price) : true;
    return matchName && matchPrice;
  });

  const clearAll = () => {
    setSearchTerm("");
    setPrice("");
  };

  const hasActiveFilters = searchTerm || price;

  return (
    <>
      {/* ── Search Bar ── */}
      <div className="max-w-7xl mx-auto mb-10 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Name Input */}
          <div className="relative flex-1">
            <Search
              size={16}
              className=" absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services by name..."
              className="w-full pl-10 pr-10 py-3 bg-white border border-lime-500 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Price Input */}
          <div className="relative sm:w-44">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
              ৳
            </span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Max price"
              min={0}
              className="w-full pl-8 pr-10 py-3 bg-white border border-lime-500 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {price && (
              <button
                onClick={() => setPrice("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            {searchTerm && (
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium px-3 py-1.5 rounded-full">
                Name: &quot;{searchTerm}&quot;
                <button onClick={() => setSearchTerm("")}>
                  <X size={12} />
                </button>
              </span>
            )}
            {price && (
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium px-3 py-1.5 rounded-full">
                Max: ৳{price}
                <button onClick={() => setPrice("")}>
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              onClick={clearAll}
              className="text-xs text-slate-500 hover:text-slate-700 underline underline-offset-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Result count */}
        <p className="text-xs text-slate-400">
          {filtered.length} service{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* ── Services Grid ── */}
      {filtered.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-slate-100 flex flex-col justify-between overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={service.img}
                  alt={service.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={service.isFeatured}
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {service.isFeatured && (
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    Featured
                  </span>
                )}
                <span className="absolute bottom-4 right-4 bg-slate-900/70 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-200" />
                  {service.duration} Mins
                </span>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {service.name}
                  </h3>
                  <div
                    className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 prose prose-slate"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                </div>

                {/* Footer Section */}
                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-widest font-bold mb-0.5">
                      Investment
                    </span>
                    <span className="text-2xl font-extrabold text-slate-900">
                      ৳{service.price.toLocaleString()}
                    </span>
                  </div>
                  <Link
                    href={`/services/${service?._id}`}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-sm"
                  >
                    Book Appointment
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="max-w-7xl mx-auto text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
          <p className="text-slate-400 text-base font-medium">
            No premium services match your current selection.
          </p>
        </div>
      )}
    </>
  );
};

export default ServicesSearching;
