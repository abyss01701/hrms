// Pipeline.jsx — Recruitment › Pipeline Kanban (Modern Pop Theme)
// --------------------------------------------------------
// Sections:
// 1. Mock Data
// 2. Glow Panels & UI Helpers
// 3. Header + Role Picker
// 4. Stage Analytics Strip
// 5. Kanban Board (Drag ready)
// 6. Candidate Card
// 7. Profile Drawer (candidate details)
// 8. Stage Inspector (column properties)
// 9. Main Pipeline Component
// --------------------------------------------------------

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  GitBranch,
  Users,
  Clock,
  Award,
  Mail,
  Star,
  UserCircle2,
  CheckCircle2,
  Info,
  ArrowRight,
  X
} from "lucide-react";

// ========================================================
// 1. MOCK PIPELINE DATA
// ========================================================
const MOCK_PIPELINE = {
  job: {
    id: "JOB-001",
    title: "Senior Frontend Engineer",
    hiringManager: "Monisha Lata",
    department: "Engineering",
  },
  stages: [
    { key: "new", label: "New Applications", count: 16, icon: Users },
    { key: "screening", label: "Screening", count: 10, icon: Filter },
    { key: "interview", label: "Interview", count: 9, icon: GitBranch },
    { key: "offer", label: "Offer", count: 3, icon: Award },
    { key: "hired", label: "Hired", count: 2, icon: CheckCircle2 },
  ],
  candidates: [
    {
      id: "C001",
      name: "Sarah Chen",
      stage: "interview",
      score: 92,
      avatar: null,
      tags: ["UI Expert", "Portfolio A+"],
      source: "LinkedIn",
      lastUpdate: "2h ago",
    },
    {
      id: "C002",
      name: "Rahul Kumar",
      stage: "screening",
      score: 78,
      avatar: null,
      tags: ["Shortlisted"],
      source: "Company Site",
      lastUpdate: "6h ago",
    },
    {
      id: "C003",
      name: "Emily Davis",
      stage: "offer",
      score: 88,
      avatar: null,
      tags: ["Offer Extended"],
      source: "Referral",
      lastUpdate: "1d ago",
    },
  ],
};

// ========================================================
// 2. GLOW PANELS + HELPER UI
// ========================================================
const Glass = ({ children, className = "" }) => (
  <div
    className={`bg-gradient-to-br from-gray-900/90 via-black to-gray-950/90 rounded-2xl border border-gray-800/80 backdrop-blur-xl shadow-lg shadow-cyan-500/5 overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const StageColumnWrapper = ({ children }) => (
  <Glass className="p-3 border border-gray-800 min-h-[400px] flex flex-col">{children}</Glass>
);

// ========================================================
// 3. HEADER + ROLE PICKER
// ========================================================
const PipelineHeader = ({ job }) => (
  <div className="mb-6">
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-[11px] text-cyan-300 uppercase tracking-wide mb-2">
      Recruitment · Pipeline
    </div>

    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        <h1 className="text-4xl font-black leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Live hiring pipeline
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Managing candidates for{" "}
          <span className="text-cyan-300">{job.title}</span>
        </p>
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-2 text-xs rounded-xl bg-gray-900/80 border border-gray-700 text-gray-200">
          Change role <ChevronDown className="w-3 h-3 inline-block" />
        </button>
        <button className="px-3 py-2 text-xs rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-black shadow-lg shadow-cyan-500/40">
          Export report
        </button>
      </div>
    </div>
  </div>
);

// ========================================================
// 4. STAGE ANALYTICS STRIP
// ========================================================
const PipelineStats = ({ pipeline }) => {
  const counts = pipeline.stages.reduce((a, s) => a + s.count, 0);
  const avgConversion = pipeline.stages.length > 0 ? 
      Math.round(counts / pipeline.stages.length) 
      : "--";

  const cards = [
    { label: "Total in pipeline", value: counts, icon: Users },
    { label: "Avg per stage", value: avgConversion, icon: Clock },
    { label: "Status", value: "Active", icon: GitBranch },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <Glass key={i} className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-400 uppercase">{c.label}</p>
              <h3 className="text-xl font-bold text-white">{c.value}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center border border-gray-700">
              <Icon className="w-5 h-5 text-cyan-300" />
            </div>
          </Glass>
        );
      })}
    </div>
  );
};

// ========================================================
// 5. KANBAN BOARD
// ========================================================
const PipelineBoard = ({ pipeline, onSelectCandidate }) => {
  const grouped = pipeline.stages.map((stage) => ({
    ...stage,
    candidates: pipeline.candidates.filter((c) => c.stage === stage.key),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
      {grouped.map((col) => {
        const Icon = col.icon;
        return (
          <StageColumnWrapper key={col.key}>
            {/* column header */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <h4 className="text-xs text-gray-300 font-semibold">
                  {col.label}
                </h4>
                <p className="text-[10px] text-gray-500">{col.count} candidates</p>
              </div>
              <div className="px-2 py-1 rounded-xl bg-gray-900 border border-gray-700">
                <Icon className="w-3 h-3 text-cyan-300" />
              </div>
            </div>

            {/* candidate list */}
            <div className="space-y-2 overflow-y-auto pr-1 flex-1">
              {col.candidates.length === 0 && (
                <p className="text-[11px] text-gray-500">No candidates here</p>
              )}
              {col.candidates.map((c) => (
                <CandidateCard key={c.id} candidate={c} onClick={() => onSelectCandidate(c)} />
              ))}
            </div>
          </StageColumnWrapper>
        );
      })}
    </div>
  );
};

// ========================================================
// 6. CANDIDATE CARD
// ========================================================
const CandidateCard = ({ candidate, onClick }) => (
  <Glass
    className="p-3 cursor-pointer hover:border-cyan-500/40 hover:shadow-cyan-500/20 transition-all"
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div>
        <h4 className="text-sm font-medium text-white">{candidate.name}</h4>
        <p className="text-[11px] text-gray-500">{candidate.source}</p>
      </div>
      <div className="px-2 py-1 rounded-xl bg-gray-900 border border-gray-700 text-xs text-cyan-300">
        {candidate.score}
      </div>
    </div>

    <div className="flex flex-wrap gap-1 mt-2">
      {candidate.tags?.map((t) => (
        <span
          key={t}
          className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 text-gray-300"
        >
          {t}
        </span>
      ))}
    </div>

    <p className="text-[10px] text-gray-500 mt-2">Updated {candidate.lastUpdate}</p>
  </Glass>
);

// ========================================================
// 7. PROFILE DRAWER
// ========================================================
const ProfileDrawer = ({ candidate, onClose }) => {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xl">
      <Glass className="w-full max-w-md h-full border-l border-gray-800 flex flex-col">
        {/* header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-cyan-300 uppercase tracking-wider">
              Candidate Profile
            </p>
            <h2 className="text-lg font-bold text-white">{candidate.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 flex items-center justify-center hover:border-cyan-400"
          >
            ✕
          </button>
        </div>

        {/* details */}
        <div className="p-4 space-y-4 text-sm overflow-y-auto">
          <Glass className="p-3">
            <p className="text-xs text-gray-400 mb-1">Source</p>
            <p className="text-white">{candidate.source}</p>
          </Glass>

          <Glass className="p-3">
            <p className="text-xs text-gray-400 mb-1">Score</p>
            <p className="text-white">{candidate.score}</p>
          </Glass>

          <Glass className="p-3">
            <p className="text-xs text-gray-400 mb-1">Tags</p>
            <div className="flex flex-wrap gap-2">
              {candidate.tags?.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 text-gray-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </Glass>

          <Glass className="p-3">
            <p className="text-xs text-gray-400 mb-1">Next Actions</p>
            <button className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-black text-xs font-bold shadow-lg shadow-cyan-500/40">
              Advance Stage
            </button>
            <button className="w-full px-3 py-2 mt-2 rounded-xl bg-gray-900 border border-gray-700 text-gray-300 text-xs hover:border-gray-600">
              Reject Candidate
            </button>
          </Glass>
        </div>
      </Glass>
    </div>
  );
};

// ========================================================
// 8. STAGE INSPECTOR PANEL (Optional — Collapse for now)
// ========================================================
const StageInspector = ({ stage, onClose }) => {
  if (!stage) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xl">
      <Glass className="w-full max-w-sm h-full border-l border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Stage Settings</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-900 border border-gray-700 rounded-xl flex items-center justify-center text-gray-300 hover:border-cyan-400"
          >
            ✕
          </button>
        </div>
        <div className="p-4 text-xs text-gray-400">
          (Future config: SLA, auto-screening rules, communication templates)
        </div>
      </Glass>
    </div>
  );
};

// ========================================================
// 9. MAIN PIPELINE COMPONENT
// ========================================================
export default function Pipeline() {
  const [pipeline] = useState(MOCK_PIPELINE);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [stageInspector, setStageInspector] = useState(null);

  return (
    <div className="p-6 space-y-6 text-white">
      {/* header */}
      <PipelineHeader job={pipeline.job} />

      {/* stats */}
      <PipelineStats pipeline={pipeline} />

      {/* board */}
      <PipelineBoard
        pipeline={pipeline}
        onSelectCandidate={(c) => setSelectedCandidate(c)}
      />

      {/* profile drawer */}
      <ProfileDrawer
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />

      {/* stage settings drawer */}
      <StageInspector
        stage={stageInspector}
        onClose={() => setStageInspector(null)}
      />
    </div>
  );
}
