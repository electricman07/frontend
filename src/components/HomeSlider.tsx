import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@tanstack/react-router";
import { type PortfolioItem } from "../types/portfolio";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://127.0.0.1:1338";

export function HomeSlider({ items }: { items: PortfolioItem[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" });

  return (
    <div
      className="overflow-hidden cursor-grab active:cursor-grabbing"
      ref={emblaRef}
    >
      <div className="flex gap-6 px-4">
        {items.map((item) => {
          const imageUrl = item.image?.url
            ? `${STRAPI_URL}${item.image.url}`
            : "/placeholder.jpg";

          return (
            <div
              key={item.id}
              className="flex-[0_0_85%] md:flex-[0_0_60%] lg:flex-[0_0_40%] min-w-0"
            >
              <Link
                to="/portfolio/$portfolioId"
                params={{ portfolioId: item.slug }}
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl group">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-200 line-clamp-2 max-w-md">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
