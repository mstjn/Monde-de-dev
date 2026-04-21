"use client"

import { useRouter, useSearchParams } from "next/navigation";

export default function SortButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = searchParams.get("sort") ?? "date_desc";
  const isDesc = current === "date_desc";

  function toggle() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", isDesc ? "date_asc" : "date_desc");
    router.push(`?${params.toString()}`);
  }

  return (
    <button onClick={toggle} className="font-bold text-lg flex items-center gap-1">
      {isDesc ? "Plus récent" : "Plus ancien"}
      <span className="text-sm">{isDesc ? "▼" : "▲"}</span>
    </button>
  );
}
