// app/dashboard/layout.jsx
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import Navbar from "@/components/shared/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      {/* Navbar সবার উপরে */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main content — sidebar width বাদ দিয়ে */}
        <main className="ml-[220px] flex-1 min-h-screen bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
