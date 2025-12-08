// ModernPop.jsx — UI Design System (Modern Pop Theme)
// ---------------------------------------------------------------------
// ✔ This file exposes reusable UI components
// ✔ Designed to be imported and used across modules
// ✔ All components are UI-only — state/action handlers injected via props
// ---------------------------------------------------------------------

import React from "react";
import { X } from "lucide-react";

// =====================================================================
// 1. CORE SURFACE — Glass Container
// =====================================================================
export const MPGlass = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`bg-gradient-to-br from-gray-900/90 via-black to-gray-950/90
            border border-gray-800/80 shadow-lg shadow-cyan-500/5 backdrop-blur-xl 
            rounded-2xl ${className}`}
  >
    {children}
  </div>
);

// =====================================================================
// 2. SECTION TITLE BAR
// =====================================================================
export const MPSectionTitle = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 mb-4">
    {Icon && <Icon className="w-4 h-4 text-cyan-300" />}
    <span className="text-xs uppercase tracking-wider text-gray-400">
      {label}
    </span>
  </div>
);

// =====================================================================
// 3. BADGE / CHIP
// =====================================================================
export const MPBadge = ({ label, color = "gray" }) => {
  const colors = {
    gray: "bg-gray-800/60 border-gray-600 text-gray-300",
    cyan: "bg-cyan-500/15 border-cyan-400/40 text-cyan-200",
    pink: "bg-pink-500/15 border-pink-400/40 text-pink-200",
    emerald: "bg-emerald-500/15 border-emerald-400/40 text-emerald-200",
    amber: "bg-amber-500/15 border-amber-400/40 text-amber-200",
    red: "bg-red-500/15 border-red-400/40 text-red-200",
  };

  return (
    <span
      className={`text-[10px] px-2 py-0.5 rounded-full border ${colors[color]}`}
    >
      {label}
    </span>
  );
};

// =====================================================================
// 4. KPI Tile
// =====================================================================
export const MPKpiTile = ({ icon: Icon, label, value, accent = "from-cyan-400 to-blue-500" }) => (
  <MPGlass className="p-4 flex items-center justify-between relative overflow-hidden">
    <div>
      <p className="text-[11px] text-gray-400 uppercase">{label}</p>
      <h3 className="text-xl font-bold text-white">{value}</h3>
    </div>
    <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-700 flex items-center justify-center">
      {Icon && <Icon className="w-4 h-4 text-cyan-300" />}
    </div>

    {/* Accent Glow */}
    <div
      className={`absolute w-24 h-24 bg-gradient-to-br ${accent} opacity-20 blur-xl -bottom-4 -right-4`}
    />
  </MPGlass>
);

// =====================================================================
// 5. BUTTONS
// =====================================================================

// Filled gradient primary button
export const MPButton = ({ children, className = "", onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 
    text-black text-xs font-bold shadow-lg shadow-cyan-500/40 hover:opacity-90 transition ${className}`}
  >
    {children}
  </button>
);

// Ghost / glass button
export const MPGhostButton = ({ children, className = "", onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl bg-gray-900/80 border border-gray-700 text-gray-200 text-xs hover:border-cyan-500/60 transition ${className}`}
  >
    {children}
  </button>
);

// Floating Action Button (FAB)
export const MPFab = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-black text-xs font-bold shadow-xl shadow-cyan-500/30 hover:opacity-90 transition"
  >
    {label}
  </button>
);

// =====================================================================
// 6. CARDS & WRAPPERS
// =====================================================================
export const MPCard = ({ children, onClick, className = "" }) => (
  <MPGlass
    onClick={onClick}
    className={`p-4 hover:border-cyan-500/60 hover:shadow-cyan-500/30 transition-all cursor-pointer ${className}`}
  >
    {children}
  </MPGlass>
);

export const MPCenteredPanel = ({ children, className }) => (
  <MPGlass className={`p-6 flex flex-col space-y-3 ${className}`}>
    {children}
  </MPGlass>
);

// =====================================================================
// 7. INPUTS
// =====================================================================
export const MPInput = ({ placeholder, onChange, value, className }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-sm outline-none placeholder:text-gray-500 ${className}`}
  />
);

export const MPTextarea = ({ placeholder, onChange, value }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-sm outline-none h-32 placeholder:text-gray-500"
  />
);

export const MPSelect = ({ options = [], value, onChange }) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-sm outline-none"
  >
    {options.map((opt, i) => (
      <option key={i} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

// Search bar
export const MPSearchBar = ({ value, onChange, placeholder }) => (
  <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/80 border border-gray-800 rounded-xl">
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-transparent text-white outline-none text-sm w-full placeholder:text-gray-500"
    />
  </div>
);

// =====================================================================
// 8. DRAWER / MODAL SHELLS
// =====================================================================
export const MPDrawer = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xl">
      <MPGlass className="w-full max-w-md h-full border-l border-gray-800 flex flex-col">
        {/* Close Bar */}
        <div className="p-4 border-b border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 flex items-center justify-center hover:border-cyan-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 text-xs overflow-y-auto">{children}</div>
      </MPGlass>
    </div>
  );
};

// Center modal shell
export const MPModal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-xl">
      <MPGlass className="w-[500px] relative p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 flex items-center justify-center hover:border-cyan-400"
        >
          ✕
        </button>
        {children}
      </MPGlass>
    </div>
  );
};

// =====================================================================
// 9. TABLE WRAPPER
// =====================================================================
export const MPTable = ({ columns, data, rowClick }) => (
  <MPGlass className="overflow-hidden">
    <table className="w-full text-sm">
      <thead>
        <tr className="text-gray-400 text-[11px] uppercase tracking-wider border-b border-gray-800">
          {columns.map((col) => (
            <th key={col.key} className="text-left px-4 py-3">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            onClick={() => rowClick && rowClick(row)}
            className="border-t border-gray-900/80 hover:bg-gray-900/60 cursor-pointer"
          >
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-3 text-gray-300">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </MPGlass>
);

// =====================================================================
// 10. TAB SWITCHER
// =====================================================================
export const MPTabSwitcher = ({ tabs = [], active, setActive }) => (
  <div className="inline-flex rounded-full bg-gray-900/80 border border-gray-800 p-1">
    {tabs.map((t) => (
      <button
        key={t}
        onClick={() => setActive(t)}
        className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-full ${
          active === t
            ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow shadow-cyan-500/40"
            : "text-gray-400"
        }`}
      >
        {t}
      </button>
    ))}
  </div>
);

// =====================================================================
// 11. GRID WRAPPER
// =====================================================================
export const MPGrid = ({ children, className }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ${className}`}>
    {children}
  </div>
);

