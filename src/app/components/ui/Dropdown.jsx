"use client";

import { useMemo, useState } from "react";

export default function Dropdown({
  label,
  placeholder = "Select an option",
  value,
  options = [],
  onChange,
  searchable = false,
  clearable = false,
  disabled = false,
  error = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    return options.filter((option) =>
      String(option.label ?? option.value)
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [options, query, searchable]);

  const selectedOption = options.find((option) => option.value === value) ?? null;

  return (
    <div className="w-full min-w-45">
      {label ? <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label> : null}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen((open) => !open)}
          disabled={disabled}
          className={`flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-left text-sm ${error ? "border-red-400" : "border-slate-300"} ${disabled ? "cursor-not-allowed bg-slate-50 text-slate-400" : "text-slate-700"}`}
        >
          <span className={selectedOption ? "text-slate-900" : "text-slate-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="text-slate-400">▾</span>
        </button>

        {isOpen && !disabled ? (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
            {searchable ? (
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                className="w-full border-b border-slate-200 px-3 py-2 text-sm outline-none"
              />
            ) : null}

            <ul className="max-h-48 overflow-auto">
              {clearable ? (
                <li>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50"
                    onClick={() => {
                      onChange?.("");
                      setIsOpen(false);
                      setQuery("");
                    }}
                  >
                    Clear
                  </button>
                </li>
              ) : null}

              {!filteredOptions.length ? (
                <li className="px-3 py-2 text-sm text-slate-500">No options available.</li>
              ) : null}

              {filteredOptions.map((option) => (
                <li key={option.value ?? option.label}>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50"
                    onClick={() => {
                      onChange?.(option.value);
                      setIsOpen(false);
                      setQuery("");
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {error ? <p className="mt-1 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}