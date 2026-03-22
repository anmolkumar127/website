import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2" data-testid="logo-link">
            <div className="text-2xl font-bold text-sky-600">Sewawala.com</div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.label.toLowerCase()}`}
                className={`font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-sky-600"
                    : "text-slate-600 hover:text-sky-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+918541051981"
              data-testid="nav-phone-link"
              className="flex items-center space-x-2 text-slate-600 hover:text-sky-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">+91 85410 51981</span>
            </a>
            <Link
              to="/booking"
              data-testid="nav-book-now-btn"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Now
            </Link>
          </div>

          <button
            data-testid="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-sky-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100" data-testid="mobile-menu">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-sky-600"
                      : "text-slate-600 hover:text-sky-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+918541051981"
                data-testid="mobile-nav-phone-link"
                className="flex items-center space-x-2 text-slate-600 hover:text-sky-600 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="font-medium">+91 85410 51981</span>
              </a>
              <Link
                to="/booking"
                data-testid="mobile-nav-book-now-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-sm text-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}