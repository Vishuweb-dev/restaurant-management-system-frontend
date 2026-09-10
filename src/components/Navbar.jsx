import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#fffdf9]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[78px]">
          <Link to="/" className="flex items-center gap-3 shrink-0 group" onClick={closeMenu}>
            <span className="brand-mark">✦</span>
            <span>
              <span className="font-display text-[1.45rem] font-bold tracking-tight text-ink">Tasty</span>
              <span className="font-display text-[1.45rem] font-bold tracking-tight text-orange-500">Bites</span>
              <span className="block text-[10px] -mt-1 tracking-wide text-ink/45">Good Food, Happy People</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/65">
            <Link to="/" className="nav-link">Home</Link>
            <a href="#menu" className="nav-link">Menu</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            {isAdmin && <Link to="/admin/dashboard" className="nav-link text-orange-600">Admin</Link>}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="hidden lg:flex items-center gap-2 rounded-full bg-ink/[0.045] px-2.5 py-1.5">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                  <span className="max-w-[110px] truncate text-sm text-ink/65">{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="btn-outline text-sm">Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-ink/70 hover:text-orange-600 transition-colors">Log in</Link>
                <Link to="/register" className="btn-primary text-sm px-5 py-2.5">Create account</Link>
              </>
            )}
          </div>

          <button
            className="md:hidden grid h-10 w-10 place-items-center rounded-xl border border-ink/10 bg-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="text-xl leading-none">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-5 pt-1 flex flex-col gap-2 text-sm font-medium animate-rise">
            <Link to="/" onClick={closeMenu} className="mobile-nav-link">Home</Link>
            <a href="#menu" onClick={closeMenu} className="mobile-nav-link">Menu</a>
            <a href="#about" onClick={closeMenu} className="mobile-nav-link">About</a>
            <a href="#contact" onClick={closeMenu} className="mobile-nav-link">Contact</a>
            {isAdmin && <Link to="/admin/dashboard" onClick={closeMenu} className="mobile-nav-link">Admin</Link>}
            <div className="h-px bg-ink/10 my-2" />
            {isAuthenticated ? (
              <button onClick={handleLogout} className="mobile-nav-link text-left">Log out</button>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="mobile-nav-link">Log in</Link>
                <Link to="/register" onClick={closeMenu} className="btn-primary text-center mt-1">Create account</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
