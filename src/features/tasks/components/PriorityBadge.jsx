const priorityClasses = {
  Low: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Medium: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  High: "bg-orange-100 text-orange-700 border border-orange-200",
  Critical: "bg-red-100 text-red-700 border border-red-200",
};

export default function PriorityBadge({ value = "Medium" }) {
  const normalizedValue = value ?? "Medium";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${priorityClasses[normalizedValue] ?? priorityClasses.Medium}`}
    >
      {normalizedValue}
    </span>
  );
}
