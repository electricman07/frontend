import { createServerFn } from "@tanstack/react-start";

export interface NavLinkData {
  id: number;
  label: string;
  url: string;
}

export interface GlobalData {
  siteTitle: string;
  logo: { url: string; alternativeText?: string };
  navLinks: NavLinkData[];
}

export const fetchGlobalSettings = createServerFn({ method: "GET" }).handler(
  async () => {
    const baseUrl = process.env.STRAPI_URL;
    // Strapi 5 uses a flattened response; populate is needed for the logo
    const res = await fetch(
      `${baseUrl}/api/global-setting?populate=logo&populate[1]=navLinks`,
    );
    if (!res.ok) throw new Error("Failed to fetch global settings");

    const { data } = await res.json();
    return data as GlobalData;
  },
);
