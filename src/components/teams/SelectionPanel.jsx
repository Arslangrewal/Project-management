"use client";

import { useMemo, useState } from "react";
import { Check, Search, X } from "lucide-react";

const statusStyles = {
  Active: "bg-emerald-100 text-emerald-700",
  Planning: "bg-amber-100 text-amber-700",
  "On Hold": "bg-orange-100 text-orange-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
  Archived: "bg-gray-100 text-gray-600",
};

function SelectionCard({ item, isSelected, selectedLabel, hint, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(item.id)}
      className={`flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition ${
        isSelected
          ? "border-blue-300 bg-blue-50 shadow-sm ring-1 ring-blue-200"
          : "border-white bg-white hover:border-gray-200 hover:bg-gray-50"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          isSelected
            ? "border-blue-500 bg-blue-500 text-white"
            : "border-gray-300 bg-white text-transparent"
        }`}
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate font-medium text-gray-900">
            {item.title}
          </span>

          {item.meta && (
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                statusStyles[item.meta] || "bg-gray-100 text-gray-600"
              }`}
            >
              {item.meta}
            </span>
          )}
        </span>

        {item.subtitle && (
          <span className="mt-0.5 block truncate text-xs text-gray-500">
            {item.subtitle}
          </span>
        )}

        {hint && !isSelected && (
          <span className="mt-1 inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
            {hint}
          </span>
        )}
      </span>

      {isSelected && (
        <span className="shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
          {selectedLabel}
        </span>
      )}
    </button>
  );
}

export default function SelectionPanel({
  label,
  items = [],
  selectedIds = [],
  onChange,
  loading = false,
  emptyMessage = "No items available",
  searchable = true,
  selectedLabel = "Assigned",
  getItemHint,
  groupSelected = false,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const itemMap = useMemo(
    () => new Map(items.map((item) => [item.id, item])),
    [items]
  );

  const filteredItems = useMemo(() => {
    let result = items;

    if (filter === "assigned") {
      result = result.filter((item) => selectedIds.includes(item.id));
    } else if (filter === "available") {
      result = result.filter((item) => !selectedIds.includes(item.id));
    }

    const keyword = search.trim().toLowerCase();

    if (!keyword) return result;

    return result.filter((item) => {
      const haystack = [item.title, item.subtitle, item.meta, item.id]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(keyword);
    });
  }, [items, search, filter, selectedIds]);

  const selectedItems = selectedIds
    .map(
      (id) =>
        itemMap.get(id) || {
          id,
          title: id,
          subtitle: "Saved assignment",
        }
    )
    .filter(Boolean);

  const assignedItems = filteredItems.filter((item) =>
    selectedIds.includes(item.id)
  );
  const availableItems = filteredItems.filter(
    (item) => !selectedIds.includes(item.id)
  );

  const toggleItem = (id) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((itemId) => itemId !== id));
      return;
    }

    onChange([...selectedIds, id]);
  };

  const renderList = (listItems) =>
    listItems.map((item) => (
      <SelectionCard
        key={item.id}
        item={item}
        isSelected={selectedIds.includes(item.id)}
        selectedLabel={selectedLabel}
        hint={getItemHint?.(item)}
        onToggle={toggleItem}
      />
    ));

  return (
    <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <label className="block text-sm font-semibold text-gray-900">
          {label}
        </label>

        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
          {selectedIds.length} assigned
        </span>
      </div>

      {selectedIds.length > 0 && (
        <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
            Assigned to this team
          </p>

          <div className="flex flex-wrap gap-2">
            {selectedItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(item.id)}
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-blue-800 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
              >
                <span>{item.title}</span>
                <X className="h-3.5 w-3.5 text-blue-500" />
              </button>
            ))}
          </div>
        </div>
      )}

      {groupSelected && (
        <div className="flex gap-2">
          {[
            { id: "all", label: "All" },
            { id: "assigned", label: `Assigned (${selectedIds.length})` },
            {
              id: "available",
              label: `Available (${items.length - selectedIds.length})`,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                filter === tab.id
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {searchable && (
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}...`}
            disabled={loading}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      )}

      <div className="max-h-64 space-y-3 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50/60 p-2">
        {loading ? (
          <div className="rounded-lg bg-white px-4 py-8 text-center text-sm text-gray-500">
            Loading options...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-lg bg-white px-4 py-8 text-center text-sm text-gray-500">
            {emptyMessage}
          </div>
        ) : groupSelected ? (
          <>
            {assignedItems.length > 0 && filter !== "available" && (
              <div className="space-y-2">
                <p className="px-1 text-[11px] font-semibold uppercase tracking-wide text-blue-600">
                  Assigned to this team
                </p>
                {renderList(assignedItems)}
              </div>
            )}

            {availableItems.length > 0 && filter !== "assigned" && (
              <div className="space-y-2">
                <p className="px-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Available projects
                </p>
                {renderList(availableItems)}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-2">{renderList(filteredItems)}</div>
        )}
      </div>
    </div>
  );
}
