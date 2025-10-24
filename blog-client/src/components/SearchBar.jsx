// src/components/SearchBar.jsx
import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="border px-3 py-2 rounded w-full max-w-sm"
    />
  );
}
