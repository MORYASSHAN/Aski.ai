import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar.jsx";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-ink text-bone">
      <DashboardSidebar />
      <main className="ml-64 px-8 py-10 lg:px-12">
        <Outlet />
      </main>
    </div>
  );
}
