// src/components/Stats.jsx
import React from "react";
import { stats } from "../api/blogApi";

export default function Stats() {
  const avg = stats.requests ? Math.round(stats.totalDurationMs / stats.requests) : 0;
  return (
    <div className="text-sm p-2 rounded border bg-white/10">
      <div>Peticiones: <b>{stats.requests}</b></div>
      <div>Últ. duración: <b>{stats.lastDurationMs} ms</b></div>
      <div>Promedio: <b>{avg} ms</b></div>
    </div>
  );
}
