import { createFileRoute } from "@tanstack/react-router";
import { fetchAboutPage } from "../utils/about";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

function SkillBar({
  name,
  proficiency,
}: {
  name: string;
  proficiency: number;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-white font-medium">{name}</span>
        <span className="text-blue-400">{proficiency}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${proficiency}%` }}
        />
      </div>
    </div>
  );
}

// 2. TimelineItem Component (Needed for the map function)
function TimelineItem({
  year,
  title,
  description,
}: {
  year: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative pl-8 pb-10 border-l border-white/20 last:border-0 text-left">
      <div className="absolute -left-1.25 top-0 w-2.5 h-2.5 rounded-full bg-blue-500" />
      <span className="text-sm font-bold text-blue-400 uppercase tracking-widest">
        {year}
      </span>
      <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );
}

export const Route = createFileRoute("/about")({
  loader: () => fetchAboutPage(),
  component: AboutPage,
});

function AboutPage() {
  const data = Route.useLoaderData();
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://127.0.0.1:1338";

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
      {/* Dynamic Image */}
      <div className="flex-1">
        <img
          src={
            data.image?.url
              ? `${STRAPI_URL}${data.image.url}`
              : "/placeholder.jpg"
          }
          className="rounded-2xl shadow-2xl w-full object-cover aspect-4/5"
          alt={data.title}
        />
      </div>

      {/* Dynamic Text Content */}
      <div className="flex-1 space-y-6">
        <h1 className="text-5xl font-black text-[#f8931d]">{data.title}</h1>
        <div className="prose prose-invert prose-lg text-[#647abc]">
          {data.description && <BlocksRenderer content={data.description} />}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Skills Column */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">
            Technical Skills
          </h2>
          {data.sections
            ?.filter((s: any) => s.__component === "about.skill")
            .map((skill: any) => (
              <SkillBar
                key={skill.id}
                name={skill.name}
                proficiency={skill.proficiency}
              />
            ))}
        </section>

        {/* Timeline Column */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Experience</h2>
          <div className="mt-4">
            {data.sections
              ?.filter((s: any) => s.__component === "about.timeline-item")
              .map((item: any) => (
                <TimelineItem key={item.id} {...item} />
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
