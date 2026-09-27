export default function ChartContainer({
  title,
  children,
}) {
  return (
    <div
      className="
      bg-white
      p-5
      rounded-xl
      border
      "
    >
      <h3 className="font-semibold mb-4">
        {title}
      </h3>

      {children}
    </div>
  );
}