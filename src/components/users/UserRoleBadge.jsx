export default function UserRoleBadge({
  role,
}) {
  const styles = {
    SUPER_ADMIN:
      "bg-green-100 text-green-700",

    ADMIN:
      "bg-red-100 text-red-700",

    EDITOR:
      "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role]}`}
    >
      {role.replace("_", " ")}
    </span>
  );
}