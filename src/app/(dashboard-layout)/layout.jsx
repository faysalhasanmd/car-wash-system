// app/dashboard/layout.jsx
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import DashboardNavbar from "@/components/shared/DashboardNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <DashboardSidebar />

      {/* Main area — offset by sidebar width */}
      <div className="ml-[240px] flex flex-col min-h-screen">
        <DashboardNavbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
