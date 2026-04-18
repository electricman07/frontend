import { Link } from "@tanstack/react-router";
import { type GlobalData } from "../utils/global";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://127.0.0.1:1338";

export default function Header({ siteTitle, logo, navLinks }: GlobalData) {
  const logoUrl = logo?.url
    ? `${STRAPI_URL}${logo.url}`
    : "/logo.png";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 bg-white/5 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
        {/* Logo & Title Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center transition-transform group-hover:scale-105">
            <img
              src={logoUrl}
              alt={logo?.alternativeText || "Logo"}
              className="w-full h-full "
            />
          </div>
          <span className="text-xl font-bold tracking-widest font-custom text-[#647abc]">
            {siteTitle}
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks?.map((link) => (
            <li key={link.id}>
              <Link
                to={link.url}
                activeProps={{ className: "text-[#647abc] font-semibold" }}
                inactiveProps={{
                  className: "text-[#f8931d] hover:text-[#647abc]",
                }}
                className="transition-colors text-sm uppercase tracking-widest"
                activeOptions={{ exact: link.url === "/" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Trigger (Optional) */}
        <div className="md:hidden">
          <button className="text-white p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
