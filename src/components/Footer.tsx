import { Link } from "@tanstack/react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-sm py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Section */}
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-bold tracking-tight text-white">
            Portfolio<span className="text-blue-500">.</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            A digital showcase of creative development and strategic design,
            built with Strapi 5 and TanStack.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-2">
            Explore
          </h4>
          <Link
            to="/about"
            className="text-gray-400 hover:text-blue-500 transition-colors text-sm"
          >
            About Me
          </Link>
          <Link
            to="/portfolio"
            className="text-gray-400 hover:text-blue-500 transition-colors text-sm"
          >
            Case Studies
          </Link>
          <Link
            to="/contact"
            className="text-gray-400 hover:text-blue-500 transition-colors text-sm"
          >
            Get in Touch
          </Link>
        </div>

        {/* Contact/Social Section */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-2">
            Connect
          </h4>
          <a
            href="mailto:hello@example.com"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            hello@yourname.com
          </a>
          <div className="flex gap-4 mt-2">
            {/* Replace with your actual social links */}
            <a
              href="#"
              className="p-2 bg-white/5 rounded-full hover:bg-blue-500/20 transition-all"
            >
              <span className="sr-only">LinkedIn</span>
              <div className="w-5 h-5 border-2 border-current rounded-sm" />
            </a>
            <a
              href="#"
              className="p-2 bg-white/5 rounded-full hover:bg-blue-500/20 transition-all"
            >
              <span className="sr-only">GitHub</span>
              <div className="w-5 h-5 border-2 border-current rounded-full" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs">
          © {currentYear} Your Name. All rights reserved.
        </p>
        <p className="text-gray-500 text-xs">
          Built with <span className="text-gray-400">TanStack Start v1</span>
        </p>
      </div>
    </footer>
  );
}
