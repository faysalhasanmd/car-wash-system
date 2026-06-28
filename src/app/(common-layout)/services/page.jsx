import React from "react";
import ServicesSearching from "./component/ServicesSearching";

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

const ServicePage = async ({ searchParams }) => {
  const getParams = await searchParams;
  const allData = await getAllServices({ ...getParams });
  const services = allData?.data || [];

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
    </div>
  );
};

export default ServicePage;
