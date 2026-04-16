import { createFileRoute } from "@tanstack/react-router";
import { fetchPortfolioItems } from "../../utils/portfolio";
import { PortfolioCard } from "../../components/PortfolioCard";
import type { PortfolioItem } from "#/types/portfolio";

export const Route = createFileRoute("/portfolio/")({
  // Pre-fetch data for SSR and hydration
  loader: () => fetchPortfolioItems(),
  component: PortfolioLanding,
});

function PortfolioLanding() {
  const projects = Route.useLoaderData();

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <header className="mb-16 text-left">
        <h1 className="text-6xl font-black text-white tracking-tighter mb-4">
          Selected <span className="text-blue-500">Works.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-xl border-l-2 border-blue-500 pl-6">
          A collection of digital experiences, branding, and technical solutions
          built for the modern web.
        </p>
      </header>

      {/* Grid of Cards */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: PortfolioItem) => (
            <PortfolioCard key={project.id} item={project} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-gray-500">
          <p className="text-xl">
            No projects found in Strapi. Add some in your dashboard!
          </p>
        </div>
      )}
    </main>
  );
}
