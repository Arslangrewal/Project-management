export default function Card({
  children,
  className = "",
  title,
  subtitle,
  actions,
}) {
  return (

    <div className={`rounded-lg bg-white shadow-lg ${className}`.trim()}>
      {(title || subtitle || actions) && (
        <div className="mb-4 flex items-start justify-between gap-3"> 
          <div>
            {title ? <h3 className="text-lg font-semibold text-slate-900">{title}</h3> : null}
            {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
          </div>
          {actions ? <div>{actions}</div> : null}
        </div>
      )}
      {children}
    </div>
  );
}