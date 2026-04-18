export function TimelineItem({
  year,
  title,
  description,
}: {
  year: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative pl-8 pb-10 border-l border-white/20 last:border-0">
      <div className="absolute -left-1.25 top-0 w-2.5 h-2.5 rounded-full bg-blue-500" />
      <span className="text-sm font-bold text-blue-400 uppercase tracking-widest">
        {year}
      </span>
      <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );
}
