// src/components/DarkToggle.jsx
import React from "react";
import { useTheme } from "../context/ThemeProvider";

export default function DarkToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button onClick={toggle} className="px-3 py-1 border rounded">
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
