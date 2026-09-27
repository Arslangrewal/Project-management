import { useSelector } from "react-redux";

export default function usePermissions(
  permission
) {
  const permissions = useSelector(
    (state) => state.auth.permissions
  );

  return permissions.includes(permission);
}