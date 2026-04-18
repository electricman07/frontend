import { createServerFn } from "@tanstack/react-start";

export const fetchAboutPage = createServerFn({ method: "GET" }).handler(
  async () => {
    // Force the URL if env is failing
    const baseUrl = process.env.STRAPI_URL || "http://127.0.0.1:1338";

    try {
      const res = await fetch(`${baseUrl}/api/about-page?populate=*`);

      if (!res.ok) {
        // This will show up in your terminal where 'npm run dev' is running
        console.error(`Strapi Error: ${res.status}`);
        throw new Error(`Strapi returned ${res.status}`);
      }

      const { data } = await res.json();
      return data;
    } catch (err) {
      throw new Error(
        "Could not connect to Strapi. Is the server running on port 1338?",
      );
    }
  },
);
