"use client";

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found.",
}) {
  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">
        Loading projects...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white ">
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="p-4 text-left">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id ?? row.name} className="table">
              {columns.map((column) => (
                <td key={column.key} className="p-4">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}