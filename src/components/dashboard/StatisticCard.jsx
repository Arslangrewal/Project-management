import { ArrowUp, ArrowDown } from "lucide-react";
export default function StatisticCard({ title, value, icon: Icon, trend, percentage }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-100 dark:border-neutral-800 p-5 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

          <h3 className="text-xl font-bold mt-2 text-gray-900 dark:text-gray-100">{value}</h3>
        </div>

        {Icon && (
          <div className="ml-4">
            <div className="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-600 flex items-center justify-center">
              <Icon className="h-5 w-5 text-indigo-600 dark:text-white" />
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${trend === "up"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
            }`}
        >
          {trend === "up" ? (
            <ArrowUp className="w-3 h-3" />
          ) : (
            <ArrowDown className="w-3 h-3" />
          )}
          {percentage}%
        </span>

        <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
      </div>
    </div>
  );
}