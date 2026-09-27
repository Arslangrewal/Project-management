"use client";

export default function PageHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex items-center gap-2 mb-6">
          {action}
        </div>
      )}
    </div>
  );
}