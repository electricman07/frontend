import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@tanstack/react-router";
import { type PortfolioItem } from "../types/portfolio";

export function HomeSlider({ items }: { items: PortfolioItem[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" });

  return (
    <div
      className="overflow-hidden cursor-grab active:cursor-grabbing"
      ref={emblaRef}
    >
      <div className="flex gap-6 px-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex-[0_0_85%] md:flex-[0_0_60%] lg:flex-[0_0_40%] min-w-0"
          >
            <Link to="/portfolio/$slug" params={{ slug: item.slug }}>
              <div className="relative aspect-video overflow-hidden rounded-2xl group">
                <img
                  src={item.image.url}
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
        ))}
      </div>
    </div>
  );
}
