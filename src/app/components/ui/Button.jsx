export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  type = "button",
  disabled = false,
  onClick,
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";
  const variantClasses = {
    primary:
      "bg-slate-900 text-white border border-slate-900 hover:bg-slate-800 hover:border-slate-800",

    secondary:
      "bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 hover:border-slate-300",

    outline:
      "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-500 hover:text-slate-900",
    danger:
      "bg-white text-red-600 border border-red-300 hover:bg-red-50 hover:border-red-500 hover:text-red-700",
    success:
      "bg-white text-green-700 border border-green-300 hover:bg-green-600 hover:border-green-600 hover:text-white",
    };
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant] ?? variantClasses.primary} ${sizeClasses[size] ?? sizeClasses.md} ${fullWidth ? "w-full" : ""} ${className}`.trim()}
    >
      {loading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {rightIcon ? <span className="ml-2">{rightIcon}</span> : null}
    </button>
  );
}
