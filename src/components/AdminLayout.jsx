import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/admin/dashboard", label: "Overview" },
  { to: "/admin/menu-items", label: "Menu board" },
  { to: "/admin/users", label: "Guests & users" },
];

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-parchment">
      <aside className="w-60 bg-ink text-parchment/80 flex flex-col shrink-0">
        <div className="px-6 py-6 border-b border-parchment/10">
          <p className="font-display text-xl text-parchment">
            Tasty<span className="text-rust-light">Bites</span>
          </p>
          <p className="text-xs text-parchment/40 mt-0.5">Kitchen admin</p>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-rust text-parchment"
                    : "text-parchment/70 hover:bg-parchment/10 hover:text-parchment"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-5 border-t border-parchment/10">
          <p className="text-xs text-parchment/40 px-2 mb-2.5 truncate">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-parchment/70 hover:bg-parchment/10 hover:text-parchment transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-10 min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
