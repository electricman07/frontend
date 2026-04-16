import { createServerFn } from "@tanstack/react-start";
import { type PortfolioItem } from "../types/portfolio";

export const fetchPortfolioItems = createServerFn({ method: "GET" }).handler(
  async () => {
    const res = await fetch(
      `${process.env.STRAPI_URL}/api/portfolio-items?populate=*`,
    );
    if (!res.ok) throw new Error("Failed to fetch portfolio items");

    const { data } = await res.json();
    return data as PortfolioItem[];
  },
);
