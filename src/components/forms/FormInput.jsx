export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  error,
}) {
  return (
    <div>
      <label className="block mb-2">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className="
          w-full
          border
          rounded-lg
          p-3
        "
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}