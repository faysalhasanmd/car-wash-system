// app/dashboard/layout.jsx
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import DashboardNavbar from "@/components/shared/DashboardNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <DashboardSidebar />

      {/* Main area — offset by sidebar width on desktop (lg+), 
          top padding on mobile/tablet for the sidebar's mobile topbar */}
      <div className="lg:ml-[240px] pt-14 lg:pt-0 flex flex-col min-h-screen">
        <DashboardNavbar />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
