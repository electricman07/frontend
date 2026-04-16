import { Link } from "@tanstack/react-router";
import { type PortfolioItem } from "../types/portfolio";

export const PortfolioCard = ({ item }: { item: PortfolioItem }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all hover:bg-white/20 hover:shadow-2xl">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={item.image.url}
          alt={item.image.alternativeText || item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
        <p className="text-gray-200 line-clamp-3 mb-4">{item.excerpt}</p>
        <Link
          to="/portfolio/$slug"
          params={{ slug: item.slug }}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          View Case Study
        </Link>
      </div>
    </div>
  );
};
