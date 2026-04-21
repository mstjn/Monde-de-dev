"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const options = [
  { label: "Plus récent", value: "date_desc" },
  { label: "Plus ancien", value: "date_asc" },
];

export default function SortButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const current = searchParams.get("sort") ?? "date_desc";
  const currentLabel = options.find(o => o.value === current)?.label ?? "Trier par";

  function select(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="font-bold text-lg flex items-center gap-1"
      >
        {currentLabel}
        <span className="text-sm">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-10 overflow-hidden">
          {options.map(o => (
            <li key={o.value}>
              <button
                onClick={() => select(o.value)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${current === o.value ? "font-bold" : ""}`}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
