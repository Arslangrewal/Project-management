"use client";

export default function Loader({
  size = "md",
}) {
  const sizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          animate-spin
          rounded-full
          border-4
          border-gray-300
          border-t-blue-600
          ${sizes[size]}
        `}
      />
    </div>
  );
}