import React from "react";
import Link from "next/link";
import ServicesSearching from "./component/ServicesSearching";

const SERVICES_PER_PAGE = 9;

// Fetching configuration abstracted for cleaner code
const getAllServices = async (searchParams) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://car-washing-system-cleanify-server.vercel.app";
  const queryParams = new URLSearchParams(searchParams).toString();

  try {
    const res = await fetch(`${baseUrl}/api/v1/services?${queryParams}`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch services: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Data fetching error:", error);
    return { data: [] };
  }
};
const resolvePagination = (allData, currentPage, limit, itemsOnPage) => {
  const meta = allData?.meta || allData?.pagination || {};
  const total =
    meta.total ?? meta.totalCount ?? allData?.total ?? allData?.count ?? null;

  if (total != null) {
    const totalPages = Math.max(1, Math.ceil(total / limit));
    return { totalPages, hasNext: currentPage < totalPages };
  }

  return { totalPages: null, hasNext: itemsOnPage === limit };
};

const buildPageHref = (params, page) => {
  const next = new URLSearchParams(params);
  next.set("page", String(page));
  return `/services?${next.toString()}`;
};

const Pagination = ({ searchParams, currentPage, totalPages, hasNext }) => {
  const hasPrev = currentPage > 1;
  if (!hasPrev && !hasNext && !totalPages) return null;

  const pageNumbers = totalPages
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : null;

  return (
    <nav
      aria-label="Services pagination"
      className="flex items-center justify-center gap-2 mt-12"
    >
      <Link
        href={buildPageHref(searchParams, Math.max(1, currentPage - 1))}
        aria-disabled={!hasPrev}
        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
          hasPrev
            ? "border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-200 hover:border-emerald-400 hover:text-emerald-600"
            : "border-slate-100 dark:border-gray-900 text-slate-300 dark:text-gray-700 pointer-events-none"
        }`}
      >
        Prev
      </Link>

      {pageNumbers ? (
        <div className="flex items-center gap-1.5">
          {pageNumbers.map((num) => (
            <Link
              key={num}
              href={buildPageHref(searchParams, num)}
              aria-current={num === currentPage ? "page" : undefined}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                num === currentPage
                  ? "bg-emerald-600 text-white"
                  : "text-slate-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
              }`}
            >
              {num}
            </Link>
          ))}
        </div>
      ) : (
        <span className="text-sm text-slate-500 dark:text-gray-400 px-2">
          Page {currentPage}
        </span>
      )}

      <Link
        href={buildPageHref(searchParams, currentPage + 1)}
        aria-disabled={!hasNext}
        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
          hasNext
            ? "border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-200 hover:border-emerald-400 hover:text-emerald-600"
            : "border-slate-100 dark:border-gray-900 text-slate-300 dark:text-gray-700 pointer-events-none"
        }`}
      >
        Next
      </Link>
    </nav>
  );
};

const ServicePage = async ({ searchParams }) => {
  const getParams = await searchParams;
  const currentPage = Math.max(1, Number(getParams?.page) || 1);
  const limit = Number(getParams?.limit) || SERVICES_PER_PAGE;

  const allData = await getAllServices({
    ...getParams,
    page: currentPage,
    limit,
  });
  const services = allData?.data || [];

  const { totalPages, hasNext } = resolvePagination(
    allData,
    currentPage,
    limit,
    services.length,
  );

  return (
    <div className="bg-slate-50 dark:bg-gray-950 min-h-screen w-full mx-auto py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-gray-100 sm:text-5xl">
          Our{" "}
          <span className="text-blue-600 dark:text-emerald-400">
            Car Care Services
          </span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-slate-500 dark:text-gray-400 max-w-2xl mx-auto font-normal">
          Give your vehicle the professional treatment it deserves. Choose from
          our wide range of expert washing and detailing services.
        </p>
      </div>

      {/* Filter/Search Component Container */}
      <div className="max-w-7xl mx-auto mb-12">
        <ServicesSearching services={services} />
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto">
        <Pagination
          searchParams={getParams}
          currentPage={currentPage}
          totalPages={totalPages}
          hasNext={hasNext}
        />
      </div>
    </div>
  );
};

export default ServicePage;
