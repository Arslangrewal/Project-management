"use client";

import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const debouncedQuery =
    useDebounce(query);

  return (
    <input
      value={query}
      onChange={(e) =>
        setQuery(e.target.value)
      }
      placeholder="Search..."
      className="
      border
      rounded-lg
      px-4
      py-2
      w-full
      "
    />
  );
}