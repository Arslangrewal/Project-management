import { useSelector } from "react-redux";

export default function useRole(role) {
  const roles = useSelector(
    (state) => state.auth.roles
  );

  return roles.includes(role);
}