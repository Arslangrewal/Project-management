"use client";

export default function Input({
  label,
  placeholder = "",
  type = "text",
  value,
  onChange,
  required = false,
  disabled = false,
  error = "",
  helperText = "",
  className = "",
}) {
  return (
    <div className="w-full">
      {label ? (
        <label className="mb-1 block text-sm font-medium text-slate-700">
          {label}
          {required ? <span className="ml-1 text-red-500">*</span> : null}
        </label>
      ) : null}

      <input
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${error ? "border-red-400" : "border-slate-300"} ${disabled ? "cursor-not-allowed bg-slate-50 text-slate-400" : "bg-white text-slate-700 focus:border-slate-500"} ${className}`.trim()}
      />

      {error ? <p className="mt-1 text-sm text-red-500">{error}</p> : null}
      {helperText && !error ? <p className="mt-1 text-sm text-slate-500">{helperText}</p> : null}
    </div>
  );
}