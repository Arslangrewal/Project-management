import { useSelector } from "react-redux";

export default function useTheme() {
  return useSelector(
    (state) => state.theme.mode
  );
}