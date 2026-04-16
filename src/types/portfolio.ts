export interface PortfolioItem {
  id: number;
  documentId: string; // Strapi 5 specific
  title: string;
  excerpt: string;
  slug: string;
  image: {
    url: string;
    alternativeText?: string;
  };
}
