import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import RichTextRenderer from "../../components/RichTextRenderer";

const fetchProjectBySlug = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const baseUrl = process.env.STRAPI_URL;
    const res = await fetch(
      `${baseUrl}/api/portfolio-items?filters[slug][$eq]=${slug}&populate=*`,
    );
    const { data } = await res.json();
    return data && data.length > 0 ? data[0] : null;
  });

export const Route = createFileRoute("/portfolio/$portfolioId")({
  loader: ({ params }) => fetchProjectBySlug({ data: params.portfolioId }),
  component: ProjectDetail,
});

function ProjectDetail() {
  const project = Route.useLoaderData();
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://127.0.0.1:1338";

  if (!project)
    return <div className="pt-32 text-center">Project not found.</div>;

  const imageUrl = project.image?.url
    ? `${STRAPI_URL}${project.image.url}`
    : "/placeholder.jpg";

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <img
        src={imageUrl}
        alt={project.title}
        className="w-full aspect-video object-cover rounded-3xl mb-12 shadow-2xl border border-white/10"
      />

      <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
        {project.title}
      </h1>

      <p className="text-xl text-blue-400 font-medium mb-12 italic">
        {project.excerpt}
      </p>

      {/* Render content - if using basic Rich Text */}
      <div className="mt-12">
        {/* Pass the 'content' field from your Strapi API */}
        <RichTextRenderer content={project.content} />
      </div>
    </main>
  );
}
