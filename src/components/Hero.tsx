interface HeroProps {
  data: {
    heading: string;
    subHeading: string;
    image: { url: string };
    featuredImage?: { url: string };
  };
}

export function Hero({ data }: HeroProps) {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://127.0.0.1:1338";
  const bgUrl = data.image?.url ? `${STRAPI_URL}${data.image.url}` : "";

  const featuredImageUrl = data.featuredImage?.url
    ? `${STRAPI_URL}${data.featuredImage.url}`
    : "/placeholder-featured.png";

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-top"
      style={{ backgroundImage: bgUrl ? `url(${bgUrl})` : "none" }}
    >
      {/* Dark overlay to make text pop against the image */}
      <div className="absolute inset-0 " />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Left Column: Featured Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="w-full aspect-21/9 max-w-100 md:max-w-137.5  rounded-2xl overflow-hidden ">
            <img
              src={featuredImageUrl}
              alt="Featured"
              className="w-full h-full object-fit: contain"
            />
          </div>
        </div>

        {/* Right Column: Text (Vertically Centered) */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="font-custom text-5xl md:text-7xl font-black text-white leading-tight">
            {data.heading}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-lg">
            {data.subHeading}
          </p>
        </div>
      </div>
    </section>
  );
}
