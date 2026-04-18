export function SkillBar({
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
