import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar.jsx";
import GlowOrb from "../animation/GlowOrb.jsx";

export default function DashboardLayout() {
  return (
    <div className="relative min-h-screen bg-ink text-bone">
      <GlowOrb className="left-0 top-0 opacity-30" size={500} color="accent" speed={25} />
      <GlowOrb className="right-0 bottom-0 opacity-20" size={400} color="accent-2" speed={30} />
      <DashboardSidebar />
      <main className="relative z-10 ml-64 px-8 py-10 lg:px-12">
        <Outlet />
      </main>
    </div>
  );
}
