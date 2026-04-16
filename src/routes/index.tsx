import { createFileRoute } from "@tanstack/react-router";
import { fetchPortfolioItems } from "../utils/portfolio";
import { HomeSlider } from "../components/HomeSlider";

export const Route = createFileRoute("/")({
  loader: () => fetchPortfolioItems(),
  component: HomePage,
});

function HomePage() {
  const items = Route.useLoaderData();

  return (
    <main className="min-h-screen flex flex-col justify-center py-20 overflow-hidden">
      {/* Hero Section */}
      <section className="px-6 max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
          Creative <span className="text-blue-500">Developer</span> & Designer
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Building high-performance web experiences using TanStack Start &
          Strapi 5. Swipe through my featured projects below.
        </p>
      </section>

      {/* Featured Slider */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-end">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest">
            Featured Work
          </h2>
          <span className="text-gray-500 text-sm">Drag to explore</span>
        </div>

        {items.length > 0 ? (
          <HomeSlider items={items} />
        ) : (
          <div className="text-center text-gray-500 py-10">
            No projects found.
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="mt-20 text-center">
        <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all">
          Start a Project
        </button>
      </section>
    </main>
  );
}
