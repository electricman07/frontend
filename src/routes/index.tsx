import { createFileRoute } from "@tanstack/react-router";
import { fetchPortfolioItems } from "../utils/portfolio";
import { createServerFn } from "@tanstack/react-start";
import { Hero } from "../components/Hero";
import { HomeSlider } from "../components/HomeSlider";

const fetchHomeBlocks = createServerFn({ method: "GET" }).handler(async () => {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/homepage?populate[blocks][populate]=*`,
  );

  if (!res.ok) return null; // Return null safely if API fails

  const json = await res.json();
  console.log("Blocks found:", json.data?.blocks?.length || 0);
  // Return the inner 'data' object
  return json.data;
});

export const Route = createFileRoute("/")({
  loader: async () => {
    const [homeData, portfolioItems] = await Promise.all([
      fetchHomeBlocks(),
      fetchPortfolioItems(),
    ]);
    return { homeData, portfolioItems };
  },
  component: HomePage,
});

function HomePage() {
  const { homeData, portfolioItems } = Route.useLoaderData();

  const safeHomeData = homeData || { blocks: [] };
  console.log("Current blocks:", homeData?.blocks);
  return (
    <main className="min-h-screen flex flex-col justify-center py-20 overflow-hidden">
      {/* Hero Section */}
      {safeHomeData.blocks?.map((block: any, index: number) => {
        if (block.__component === "hero.sections") {
          return <Hero key={index} data={block} />;
        }
        return null;
      })}

      {/* Featured Slider */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-end">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest">
            Featured Work
          </h2>
          <span className="text-gray-500 text-sm">Drag to explore</span>
        </div>

        {portfolioItems.length > 0 ? (
          <HomeSlider items={portfolioItems} />
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
