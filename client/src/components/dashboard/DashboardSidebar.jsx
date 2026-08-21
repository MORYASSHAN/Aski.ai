import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authStore.js";

const NAV = [
  { to: "/dashboard", label: "Overview", end: true },
  { to: "/dashboard/rooms", label: "Rooms" },
  { to: "/dashboard/meetings", label: "Meetings" },
  { to: "/dashboard/bookings", label: "Bookings" },
  { to: "/dashboard/integrations", label: "Integrations" },
];

export default function DashboardSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/10 bg-noir px-5 py-6">
      <div className="flex items-center gap-2 px-2">
        <span className="font-display text-xl font-bold">
          Aski<span className="text-accent">.ai</span>
        </span>
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 text-sm transition-colors ${
                isActive
                  ? "bg-white/10 text-bone"
                  : "text-fog hover:bg-white/5 hover:text-bone"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 pt-4">
        <div className="px-2 text-sm text-bone">
          {user?.name || "Member"}
        </div>
        <div className="px-2 text-xs text-mute">{user?.email}</div>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="mt-4 w-full rounded-xl border border-white/10 px-4 py-2 text-sm text-fog transition-colors hover:border-white/30 hover:text-bone"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
