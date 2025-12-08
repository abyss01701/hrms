// Configs.jsx — Recruitment › Configuration Hub (Modern Pop Theme)
// -----------------------------------------------------------------
// Sections:
// 1. Mock Data (Templates, Tags, Sources, etc.)
// 2. UI Helpers (Glass, Badge, Section Title)
// 3. Left Tab Navigation
// 4. Config List Panels (for each config group)
// 5. Editor Drawer (edit or create config values)
// 6. Main Component Export
// -----------------------------------------------------------------

import React, { useState } from "react";
import {
  Sliders,
  Settings,
  Tag,
  GitBranch,
  Mail,
  Shield,
  Stars,
  Plus,
  Trash2,
  X,
} from "lucide-react";

// ========================================================
// 1. MOCK CONFIG DATA
// ========================================================

const MOCK_PIPELINES = [
  "Standard Engineering Process",
  "Marketing Hiring Flow",
  "Executive Screening Flow",
];

const MOCK_SOURCES = ["LinkedIn", "Career Portal", "Referral", "Campus Drive"];

const MOCK_TAGS = ["UI Specialist", "Priority", "Campaign", "Internal Transfer"];

const MOCK_EMAIL_TEMPLATES = ["Interview Invite", "Offer Letter", "Rejection Email"];

// ========================================================
// 2. UI HELPERS — GLASS, TITLES, BADGES
// ========================================================

const Glass = ({ children, className }) => (
  <div
    className={`bg-gradient-to-br from-gray-900/90 via-black to-gray-950/90 
    border border-gray-800/80 shadow-lg shadow-cyan-500/5 
    backdrop-blur-xl rounded-2xl ${className}`}
  >
    {children}
  </div>
);

const SectionTitle = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 mb-4">
    <Icon className="w-4 h-4 text-cyan-300" />
    <span className="text-xs uppercase tracking-wider text-gray-400">{label}</span>
  </div>
);

const SmallBadge = ({ label }) => (
  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800/80 border border-gray-700 text-gray-300">
    {label}
  </span>
);

// ========================================================
// 3. LEFT SETTINGS NAVIGATION
// ========================================================

const tabs = [
  { key: "pipelines", icon: GitBranch, label: "Pipelines" },
  { key: "sources", icon: Stars, label: "Sources" },
  { key: "tags", icon: Tag, label: "Candidate Tags" },
  { key: "emails", icon: Mail, label: "Email Templates" },
  { key: "roles", icon: Shield, label: "Roles & Permissions" },
];

const ConfigTabs = ({ active, setActive }) => (
  <Glass className="p-4 w-full md:w-56 h-fit space-y-2">
    {tabs.map(({ key, icon: Icon, label }) => (
      <button
        key={key}
        onClick={() => setActive(key)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs
          ${
            active === key
              ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-black font-bold shadow shadow-cyan-500/40"
              : "text-gray-400 hover:text-gray-200"
          }`}
      >
        <Icon className="w-4 h-4" />
        {label}
      </button>
    ))}
  </Glass>
);

// ========================================================
// 4. CONFIG PANELS — LISTS PER TAB
// ========================================================

const ConfigList = ({ title, icon, items, onEdit }) => (
  <Glass className="p-4 flex flex-col space-y-3">
    <SectionTitle icon={icon} label={title} />
    {items.length === 0 && (
      <div className="text-xs text-gray-500">No items configured.</div>
    )}
    {items.map((item, i) => (
      <div
        key={i}
        className="flex justify-between items-center bg-gray-900/60 
        border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300"
      >
        {item}
        <button
          onClick={() => onEdit(item)}
          className="text-cyan-300 hover:text-cyan-200 text-[10px]"
        >
          Edit
        </button>
      </div>
    ))}
  </Glass>
);

// ========================================================
// 5. EDITOR DRAWER — Add/Edit Config Entry
// ========================================================

const ConfigEditor = ({ open, label, initial, onClose }) => {
  const [value, setValue] = useState(initial || "");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xl">
      <Glass className="w-full max-w-sm h-full border-l border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">{label}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-900 border border-gray-700 
            rounded-xl text-gray-300 flex items-center justify-center 
            hover:border-cyan-400"
          >
            ✕
          </button>
        </div>

        <div className="p-4 text-xs space-y-4">
          <Glass className="p-3">
            <p className="text-[11px] text-gray-400 mb-1">Value</p>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type config value..."
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-sm"
            />
          </Glass>

          <button className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-black text-xs font-bold shadow-lg">
            Save & Apply
          </button>
        </div>
      </Glass>
    </div>
  );
};

// ========================================================
// 6. MAIN CONFIGS COMPONENT EXPORT
// ========================================================

export default function Configs() {
  const [activeTab, setActiveTab] = useState("pipelines");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorLabel, setEditorLabel] = useState("");
  const [editorInitial, setEditorInitial] = useState("");

  const handleEdit = (section, value) => {
    setEditorLabel(`Edit ${section}`);
    setEditorInitial(value);
    setEditorOpen(true);
  };

  return (
    <div className="p-6 space-y-6 text-white flex flex-col md:flex-row gap-6">
      {/* Left Navigation */}
      <ConfigTabs active={activeTab} setActive={setActiveTab} />

      {/* Right Panel */}
      <div className="flex-1 space-y-6">
        {activeTab === "pipelines" && (
          <ConfigList
            title="Pipeline Templates"
            icon={GitBranch}
            items={MOCK_PIPELINES}
            onEdit={(v) => handleEdit("Pipeline Template", v)}
          />
        )}

        {activeTab === "sources" && (
          <ConfigList
            title="Candidate Sources"
            icon={Stars}
            items={MOCK_SOURCES}
            onEdit={(v) => handleEdit("Candidate Source", v)}
          />
        )}

        {activeTab === "tags" && (
          <ConfigList
            title="Candidate Tags"
            icon={Tag}
            items={MOCK_TAGS}
            onEdit={(v) => handleEdit("Candidate Tag", v)}
          />
        )}

        {activeTab === "emails" && (
          <ConfigList
            title="Email Templates"
            icon={Mail}
            items={MOCK_EMAIL_TEMPLATES}
            onEdit={(v) => handleEdit("Email Template", v)}
          />
        )}

        {activeTab === "roles" && (
          <Glass className="p-4">
            <SectionTitle icon={Shield} label="Roles & Permissions" />
            <p className="text-gray-400 text-xs mb-4">
              Future config UI for role definitions, privileges & hiring rules.
            </p>

            <Glass className="p-4 text-xs border border-gray-800">
              <p className="text-gray-400 mb-2">Coming soon:</p>
              <small className="text-gray-500">
                Add hiring roles, stage permissions, approval flows and
                recruiter limits.
              </small>
            </Glass>
          </Glass>
        )}
      </div>

      {/* Slide-in Drawer */}
      <ConfigEditor
        open={editorOpen}
        label={editorLabel}
        initial={editorInitial}
        onClose={() => setEditorOpen(false)}
      />
    </div>
  );
}
