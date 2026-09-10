import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#121821] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          
          {/* Brand */}
          <div>
            <h2 className="font-display text-2xl font-bold">
              <span className="text-white">Tasty</span>
              <span className="text-orange-500">Bites</span>
            </h2>

            <p className="text-xs text-white/45 mt-1">
              Good Food, Happy People
            </p>

            <p className="text-white/60 mt-6 leading-7 max-w-xs">
              Fresh ingredients, bold flavors, and a menu made for people
              who love good food.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-white/60">
              <Link
                to="/"
                className="hover:text-orange-400 transition-colors"
              >
                Home
              </Link>

              <a
                href="/#menu"
                className="hover:text-orange-400 transition-colors"
              >
                Menu
              </a>

              <a
                href="/#about"
                className="hover:text-orange-400 transition-colors"
              >
                About
              </a>

              <Link
                to="/login"
                className="hover:text-orange-400 transition-colors"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-orange-400 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Menu Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Menu Categories
            </h3>

            <div className="flex flex-col gap-3 text-white/60">
              <a
                href="/#menu"
                className="hover:text-orange-400 transition-colors"
              >
                Starters
              </a>

              <a
                href="/#menu"
                className="hover:text-orange-400 transition-colors"
              >
                Main Course
              </a>

              <a
                href="/#menu"
                className="hover:text-orange-400 transition-colors"
              >
                Desserts
              </a>

              <a
                href="/#menu"
                className="hover:text-orange-400 transition-colors"
              >
                Beverages
              </a>
            </div>
          </div>

          {/* Contact */}
          <div id="contact">
            <h3 className="text-lg font-semibold mb-5">
              Contact Us
            </h3>

            <div className="flex flex-col gap-5 text-white/65">

              {/* Location */}
              <div className="flex items-center gap-4">
                <span className="text-orange-500 text-xl">
                  📍
                </span>

                <span>
                  Kolkata, West Bengal
                </span>
              </div>

              {/* Phone */}
              <a
                href="tel:+916299232660"
                className="flex items-center gap-4 hover:text-orange-400 transition-colors"
              >
                <span className="text-orange-500 text-xl">
                  📞
                </span>

                <span>
                  +91 6299232660
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:hardik98@gmail.com"
                className="flex items-center gap-4 hover:text-orange-400 transition-colors break-all"
              >
                <span className="text-orange-500 text-xl">
                  ✉️
                </span>

                <span>
                  hardik98@gmail.com
                </span>
              </a>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 text-center text-sm text-white/40">
          © 2026 TastyBites. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;