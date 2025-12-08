// Jobs.jsx — Recruitment › Jobs (Modern Pop Theme)
// --------------------------------------------------------
// Sections in this file:
// 1. Mock Data
// 2. Small UI Helpers (Badge, Pill, GlassPanel)
// 3. Header + KPI Section
// 4. Filters + View Toggle
// 5. Job Grid & Job Table
// 6. Job Detail Panel (Tabs: Overview / Pipeline / Activity)
// 7. Create Job Slide-In Sheet
// 8. Main Jobs Component
// --------------------------------------------------------

import React, { useState, useMemo } from "react";
import {
  Briefcase,
  Users,
  Clock,
  Activity,
  Filter,
  Search,
  ChevronRight,
  MapPin,
  LayoutGrid,
  List,
  Plus,
  ArrowUpRight,
  Tag,
  UserCircle2,
  Building2,
  CalendarDays,
  Star,
  GitBranch,
  Mail,
  Globe2,
} from "lucide-react";

// ========================================================
// 1. MOCK DATA
// ========================================================

const MOCK_JOBS = [
  {
    id: "JOB-001",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Nadi (Hybrid)",
    employmentType: "Full-time",
    workMode: "Hybrid",
    status: "Open",
    priority: "High",
    applicants: 42,
    createdAt: "2 days ago",
    manager: "Monisha Lata",
    code: "FJ-ENG-01",
    tags: ["React", "Priority", "Hot"],
    avgTimeToFill: "34 days",
    pipeline: {
      stages: [
        { key: "new", label: "New", count: 16 },
        { key: "screening", label: "Screening", count: 10 },
        { key: "interview", label: "Interview", count: 9 },
        { key: "offer", label: "Offer", count: 3 },
      ],
      candidates: [
        {
          id: "CAND-001",
          name: "Sarah Chen",
          stage: "interview",
          score: 92,
          source: "LinkedIn",
          lastActivity: "2h ago",
          role: "Frontend Dev",
          tags: ["Portfolio A+", "Strong UI"],
        },
        {
          id: "CAND-002",
          name: "Rahul Kumar",
          stage: "screening",
          score: 78,
          source: "Company Site",
          lastActivity: "6h ago",
          role: "Frontend Dev",
          tags: ["Shortlisted"],
        },
        {
          id: "CAND-003",
          name: "Emily Davis",
          stage: "offer",
          score: 88,
          source: "Referral",
          lastActivity: "1d ago",
          role: "Senior Frontend",
          tags: ["Offer Extended"],
        },
      ],
    },
    activity: [
      {
        id: 1,
        type: "pipeline",
        message: "Moved Sarah Chen to Interview",
        time: "2h ago",
      },
      {
        id: 2,
        type: "note",
        message: "Hiring manager wants strong UI portfolio",
        time: "1d ago",
      },
      {
        id: 3,
        type: "publish",
        message: "Job published to LinkedIn & Careers Site",
        time: "3d ago",
      },
    ],
  },
  {
    id: "JOB-002",
    title: "HR Officer",
    department: "People & Culture",
    location: "Suva (Onsite)",
    employmentType: "Full-time",
    workMode: "Onsite",
    status: "Draft",
    priority: "Medium",
    applicants: 8,
    createdAt: "Draft",
    manager: "Sanil Kumar",
    code: "FJ-HR-03",
    tags: ["Generalist"],
    avgTimeToFill: "—",
    pipeline: {
      stages: [
        { key: "new", label: "New", count: 0 },
        { key: "screening", label: "Screening", count: 0 },
        { key: "interview", label: "Interview", count: 0 },
        { key: "offer", label: "Offer", count: 0 },
      ],
      candidates: [],
    },
    activity: [
      {
        id: 1,
        type: "draft",
        message: "Job created as draft",
        time: "4h ago",
      },
    ],
  },
  {
    id: "JOB-003",
    title: "Marketing Lead",
    department: "Marketing",
    location: "Nadi (Remote-First)",
    employmentType: "Contract",
    workMode: "Remote",
    status: "Open",
    priority: "Normal",
    applicants: 27,
    createdAt: "5 days ago",
    manager: "Pauliasi",
    code: "FJ-MKT-02",
    tags: ["Brand", "Digital"],
    avgTimeToFill: "41 days",
    pipeline: {
      stages: [
        { key: "new", label: "New", count: 9 },
        { key: "screening", label: "Screening", count: 7 },
        { key: "interview", label: "Interview", count: 4 },
        { key: "offer", label: "Offer", count: 1 },
      ],
      candidates: [
        {
          id: "CAND-010",
          name: "Jordan Lee",
          stage: "screening",
          score: 80,
          source: "Job Board",
          lastActivity: "8h ago",
          role: "Marketing Lead",
          tags: ["Content", "Paid ads"],
        },
      ],
    },
    activity: [
      {
        id: 1,
        type: "pipeline",
        message: "Received 5 new applicants",
        time: "8h ago",
      },
      {
        id: 2,
        type: "note",
        message: "Priority for digital + brand campaigns",
        time: "1d ago",
      },
    ],
  },
];

// ========================================================
// 2. SMALL UI HELPERS
// ========================================================

const GlassPanel = ({ className = "", children }) => (
  <div
    className={`bg-gradient-to-br from-gray-900/90 via-black to-gray-950/90 border border-gray-800/80 rounded-2xl shadow-lg shadow-cyan-500/5 backdrop-blur-xl ${className}`}
  >
    {children}
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    Open: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40",
    Draft: "bg-gray-500/15 text-gray-300 border border-gray-500/40",
    Closed: "bg-red-500/15 text-red-300 border border-red-500/40",
    Paused: "bg-amber-500/15 text-amber-300 border border-amber-500/40",
  };
  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1 ${map[status] || map["Open"]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
};

const PriorityPill = ({ priority }) => {
  const map = {
    High: "from-pink-500/70 to-amber-400/70",
    Medium: "from-cyan-500/60 to-blue-400/60",
    Normal: "from-gray-500/60 to-gray-400/60",
  };
  return (
    <span className="inline-flex items-center gap-1 text-[11px]">
      <span
        className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${map[priority] || map.Normal} text-black font-semibold shadow-sm`}
      >
        {priority} priority
      </span>
    </span>
  );
};

// ========================================================
// 3. HEADER + KPI SECTION
// ========================================================

const JobsHeader = ({ onOpenCreate }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="px-2.5 py-1 rounded-full text-[11px] bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 uppercase tracking-[0.15em]">
            Recruitment · Jobs
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black leading-tight">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Roles you&apos;re{" "}
          </span>
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
            hiring for
          </span>
        </h1>
        <p className="mt-2 text-sm md:text-base text-gray-400 max-w-xl">
          Track open positions, priority roles and your live pipeline in one
          real-time view.
        </p>
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-900/80 border border-gray-700/80 text-xs md:text-sm text-gray-200 hover:bg-gray-800 transition-all duration-300">
          <Mail className="w-4 h-4" />
          Bulk email candidates
        </button>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-900/80 border border-gray-700/80 text-xs md:text-sm text-gray-200 hover:bg-gray-800 transition-all duration-300">
          <Globe2 className="w-4 h-4" />
          View career site
        </button>
        <button
          onClick={onOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-sm font-semibold text-black shadow-lg shadow-cyan-500/40 hover:shadow-pink-500/40 hover:translate-y-[1px] transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          New Job
        </button>
      </div>
    </div>
  );
};

const JobsKPIStrip = ({ jobs }) => {
  const totalOpen = jobs.filter((j) => j.status === "Open").length;
  const totalDrafts = jobs.filter((j) => j.status === "Draft").length;
  const totalApplicants = jobs.reduce((sum, j) => sum + j.applicants, 0);
  const avgApplicants =
    jobs.length > 0 ? Math.round(totalApplicants / jobs.length) : 0;

  const cards = [
    {
      label: "Open Jobs",
      value: totalOpen,
      sub: "Actively accepting candidates",
      icon: Briefcase,
      accent: "from-emerald-400/80 to-cyan-400/80",
    },
    {
      label: "Applicants / Job",
      value: avgApplicants,
      sub: "Average across all live roles",
      icon: Users,
      accent: "from-cyan-400/80 to-blue-400/80",
    },
    {
      label: "Draft Roles",
      value: totalDrafts,
      sub: "Waiting to be published",
      icon: Clock,
      accent: "from-amber-400/80 to-pink-400/80",
    },
    {
      label: "Pipeline Activity",
      value: "Live",
      sub: "Last updates within 24 hours",
      icon: Activity,
      accent: "from-pink-500/80 to-violet-400/80",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <GlassPanel
            key={idx}
            className="p-4 flex items-center justify-between overflow-hidden relative group"
          >
            <div>
              <p className="text-xs text-gray-400 mb-1">{card.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">
                  {card.value}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">{card.sub}</p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-white/5 shadow-inner shadow-black/60">
                <Icon className="w-4 h-4 text-cyan-300" />
              </div>
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-tr ${card.accent} opacity-30 blur-2xl absolute -bottom-6 -right-6 group-hover:opacity-60 transition-all`}
              />
            </div>
          </GlassPanel>
        );
      })}
    </div>
  );
};

// ========================================================
// 4. FILTERS + VIEW TOGGLE
// ========================================================

const JobsFilters = ({
  search,
  setSearch,
  viewMode,
  setViewMode,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <GlassPanel className="p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-3 flex-1">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-900/80 border border-gray-800 flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, department or code..."
            className="bg-transparent outline-none text-sm text-white placeholder:text-gray-500 w-full"
          />
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl bg-gray-900/80 border border-gray-800 text-gray-300 hover:border-gray-600 transition-all">
            <Filter className="w-3 h-3" />
            Filters
          </button>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-900/80 border border-gray-800 text-xs text-gray-200 rounded-xl px-2.5 py-1.5 outline-none"
          >
            <option value="all">All statuses</option>
            <option value="Open">Open only</option>
            <option value="Draft">Draft only</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-2">
        <span className="hidden md:inline text-[11px] text-gray-500 uppercase tracking-[0.18em]">
          View
        </span>
        <div className="inline-flex items-center rounded-full bg-gray-900/80 border border-gray-800 p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs ${
              viewMode === "grid"
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow shadow-cyan-500/40"
                : "text-gray-400"
            }`}
          >
            <LayoutGrid className="w-3 h-3" />
            Grid
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs ${
              viewMode === "table"
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow shadow-cyan-500/40"
                : "text-gray-400"
            }`}
          >
            <List className="w-3 h-3" />
            Table
          </button>
        </div>
      </div>
    </GlassPanel>
  );
};

// ========================================================
// 5. JOB GRID & JOB TABLE
// ========================================================

const JobCard = ({ job, onSelect }) => {
  return (
    <GlassPanel
      className="p-4 cursor-pointer hover:border-cyan-500/60 hover:shadow-cyan-500/25 transition-all duration-300 group"
      onClick={() => onSelect(job)}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs text-gray-500">{job.code}</span>
            <StatusBadge status={job.status} />
          </div>
          <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
            <span className="inline-flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              {job.department}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <UserCircle2 className="w-3 h-3" />
              {job.manager}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <PriorityPill priority={job.priority} />
          <button className="inline-flex items-center gap-1 text-[11px] text-cyan-300/80 hover:text-cyan-200">
            View role
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <div className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-200 border border-cyan-500/30">
            {job.applicants} applicants
          </div>
          <div className="px-2 py-1 rounded-full bg-gray-800/80 text-gray-300 border border-gray-700 text-[11px]">
            {job.employmentType} · {job.workMode}
          </div>
        </div>
        <div className="text-[11px] text-gray-500 flex items-center gap-1">
          <CalendarDays className="w-3 h-3" />
          {job.createdAt}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.tags?.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-gray-900/80 border border-gray-700 text-gray-300"
          >
            <Tag className="w-3 h-3 text-gray-400" />
            {t}
          </span>
        ))}
      </div>
    </GlassPanel>
  );
};

const JobGrid = ({ jobs, onSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
    {jobs.map((job) => (
      <JobCard key={job.id} job={job} onSelect={onSelect} />
    ))}
  </div>
);

const JobTable = ({ jobs, onSelect }) => (
  <GlassPanel className="overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800 text-gray-400 text-[11px] uppercase tracking-[0.14em]">
            <th className="text-left px-4 py-3">Role</th>
            <th className="text-left px-4 py-3">Dept</th>
            <th className="text-left px-4 py-3">Location</th>
            <th className="text-left px-4 py-3">Type</th>
            <th className="text-left px-4 py-3">Applicants</th>
            <th className="text-left px-4 py-3">Status</th>
            <th className="text-right px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, idx) => (
            <tr
              key={job.id}
              className={`border-t border-gray-900/80 hover:bg-gray-900/60 cursor-pointer ${
                idx === 0 ? "border-t-gray-800" : ""
              }`}
              onClick={() => onSelect(job)}
            >
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="text-sm text-white">{job.title}</span>
                  <span className="text-[11px] text-gray-500">{job.code}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-300">{job.department}</td>
              <td className="px-4 py-3 text-gray-300">{job.location}</td>
              <td className="px-4 py-3 text-gray-300">
                {job.employmentType} · {job.workMode}
              </td>
              <td className="px-4 py-3 text-gray-300">
                {job.applicants}{" "}
                <span className="text-[11px] text-gray-500">candidates</span>
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={job.status} />
              </td>
              <td className="px-4 py-3 text-right">
                <button className="inline-flex items-center gap-1 text-xs text-cyan-300 hover:text-cyan-200">
                  Open
                  <ChevronRight className="w-3 h-3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </GlassPanel>
);

// ========================================================
// 6. JOB DETAIL PANEL (OVERVIEW / PIPELINE / ACTIVITY)
// ========================================================

const JobDetailPanel = ({ job, activeTab, setActiveTab }) => {
  if (!job) {
    return (
      <GlassPanel className="p-6 flex flex-col items-center justify-center h-full border-dashed border-gray-700">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-3 border border-cyan-500/30">
          <GitBranch className="w-6 h-6 text-cyan-300" />
        </div>
        <h3 className="text-base font-semibold text-white">
          No role selected
        </h3>
        <p className="text-xs text-gray-500 mt-1 text-center max-w-xs">
          Click on a job on the left to see its live pipeline, details and
          recent activity.
        </p>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="p-5 h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <StatusBadge status={job.status} />
              <PriorityPill priority={job.priority} />
            </div>
            <h2 className="text-lg font-bold text-white">{job.title}</h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-1">
              <span className="inline-flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {job.department}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <UserCircle2 className="w-3 h-3" />
                Hiring: {job.manager}
              </span>
            </div>
          </div>
          <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gray-900/80 border border-gray-700 text-xs text-gray-200 hover:border-cyan-500/60 hover:text-cyan-200 transition-all">
            <Star className="w-3 h-3 text-yellow-300" />
            Add to focus list
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-4 border-b border-gray-800">
        {["overview", "pipeline", "activity"].map((tab) => {
          const label =
            tab === "overview"
              ? "Overview"
              : tab === "pipeline"
              ? "Pipeline"
              : "Activity";
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-3 py-2 text-xs font-medium transition-colors ${
                activeTab === tab
                  ? "text-cyan-300"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {label}
              {activeTab === tab && (
                <span className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4">
        {activeTab === "overview" && <JobOverviewTab job={job} />}
        {activeTab === "pipeline" && <JobPipelineTab job={job} />}
        {activeTab === "activity" && <JobActivityTab job={job} />}
      </div>
    </GlassPanel>
  );
};

// --- Overview tab ---
const JobOverviewTab = ({ job }) => (
  <div className="space-y-4 text-sm">
    <div className="grid grid-cols-2 gap-3 text-xs">
      <GlassPanel className="p-3">
        <p className="text-gray-400 text-[11px] mb-1">Applicants</p>
        <p className="text-xl font-bold text-white">{job.applicants}</p>
        <p className="text-[11px] text-gray-500 mt-1">
          Across all pipeline stages
        </p>
      </GlassPanel>
      <GlassPanel className="p-3">
        <p className="text-gray-400 text-[11px] mb-1">Avg. time to fill</p>
        <p className="text-xl font-bold text-white">
          {job.avgTimeToFill || "—"}
        </p>
        <p className="text-[11px] text-gray-500 mt-1">
          Historical based on similar roles
        </p>
      </GlassPanel>
    </div>

    <GlassPanel className="p-3">
      <p className="text-[11px] text-gray-400 mb-1">Highlights</p>
      <ul className="text-xs text-gray-200 space-y-1.5">
        <li className="flex items-start gap-2">
          <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Strong interest from{" "}
          <span className="text-cyan-300">LinkedIn & referrals</span>.
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-pink-400" />
          Prioritize candidates with{" "}
          <span className="text-pink-300">UI-heavy portfolios</span>.
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-amber-400" />
          Hiring manager prefers{" "}
          <span className="text-amber-300">hybrid availability</span>.
        </li>
      </ul>
    </GlassPanel>
  </div>
);

// --- Pipeline tab ---
const JobPipelineTab = ({ job }) => {
  const stages = job.pipeline?.stages || [];
  const candidates = job.pipeline?.candidates || [];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{stages.length} stages</span>
        <span className="inline-flex items-center gap-1 text-cyan-300">
          <GitBranch className="w-3 h-3" />
          Live pipeline view
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stages.map((stage) => {
          const list = candidates.filter((c) => c.stage === stage.key);
          return (
            <div
              key={stage.key}
              className="bg-gray-950/60 border border-gray-800 rounded-xl p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-300 font-medium">
                  {stage.label}
                </span>
                <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-gray-900/80 text-gray-300 border border-gray-700">
                  {stage.count}
                </span>
              </div>

              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {list.length === 0 && (
                  <p className="text-[11px] text-gray-500">No candidates yet</p>
                )}
                {list.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-lg bg-gradient-to-r from-gray-900 via-gray-950 to-black border border-gray-800 px-2 py-1.5 flex items-center justify-between gap-2"
                  >
                    <div className="flex flex-col">
                      <span className="text-[11px] text-white">{c.name}</span>
                      <span className="text-[10px] text-gray-500">
                        {c.role} · {c.source}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-[11px] text-cyan-300 font-semibold">
                        {c.score}
                      </span>
                      <span className="text-[9px] text-gray-500">
                        {c.lastActivity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Activity tab ---
const JobActivityTab = ({ job }) => {
  const activity = job.activity || [];
  if (!activity.length) {
    return (
      <p className="text-xs text-gray-500">
        No recent activity for this role yet.
      </p>
    );
  }
  return (
    <div className="space-y-2 text-xs">
      {activity.map((a) => (
        <div
          key={a.id}
          className="flex items-start gap-2 rounded-lg bg-gray-950/80 border border-gray-800 px-3 py-2"
        >
          <div className="mt-[3px]">
            {a.type === "pipeline" && (
              <GitBranch className="w-3 h-3 text-cyan-300" />
            )}
            {a.type === "note" && (
              <Tag className="w-3 h-3 text-pink-300" />
            )}
            {a.type === "publish" && (
              <Globe2 className="w-3 h-3 text-emerald-300" />
            )}
            {a.type === "draft" && (
              <Clock className="w-3 h-3 text-gray-300" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-gray-200">{a.message}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{a.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ========================================================
// 7. CREATE JOB SLIDE-IN SHEET
// ========================================================

const CreateJobSheet = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xl">
      <div className="w-full max-w-md h-full bg-black/95 border-l border-gray-800 shadow-2xl shadow-cyan-500/30 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-cyan-300 uppercase tracking-[0.18em] mb-1">
              New Role
            </p>
            <h2 className="text-lg font-bold text-white">Create Job</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-400 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
          {/* Basic Info */}
          <GlassPanel className="p-3">
            <p className="text-[11px] text-gray-400 mb-2 uppercase tracking-[0.16em]">
              Basic Details
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-[11px] text-gray-400 block mb-1">
                  Job title
                </label>
                <input
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full text-sm px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white outline-none focus:border-cyan-400 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">
                    Department
                  </label>
                  <input
                    placeholder="e.g. Engineering"
                    className="w-full text-sm px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white outline-none focus:border-cyan-400 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">
                    Location
                  </label>
                  <input
                    placeholder="e.g. Nadi (Hybrid)"
                    className="w-full text-sm px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white outline-none focus:border-cyan-400 transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">
                    Employment type
                  </label>
                  <select className="w-full text-sm px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white outline-none focus:border-cyan-400 transition-all">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">
                    Work mode
                  </label>
                  <select className="w-full text-sm px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white outline-none focus:border-cyan-400 transition-all">
                    <option>Hybrid</option>
                    <option>Onsite</option>
                    <option>Remote</option>
                  </select>
                </div>
              </div>
            </div>
          </GlassPanel>

          {/* Description */}
          <GlassPanel className="p-3">
            <p className="text-[11px] text-gray-400 mb-2 uppercase tracking-[0.16em]">
              Job Description
            </p>
            <textarea
              rows={5}
              placeholder="High-level summary, responsibilities and requirements..."
              className="w-full text-sm px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white outline-none focus:border-cyan-400 transition-all resize-none"
            />
          </GlassPanel>

          {/* Hiring setup */}
          <GlassPanel className="p-3">
            <p className="text-[11px] text-gray-400 mb-2 uppercase tracking-[0.16em]">
              Hiring Setup
            </p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">
                    Hiring manager
                  </label>
                  <input
                    placeholder="e.g. Monisha Lata"
                    className="w-full text-sm px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white outline-none focus:border-cyan-400 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">
                    Priority
                  </label>
                  <select className="w-full text-sm px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white outline-none focus:border-cyan-400 transition-all">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Normal</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[11px] text-gray-400 block mb-1">
                  Pipeline template
                </label>
                <select className="w-full text-sm px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white outline-none focus:border-cyan-400 transition-all">
                  <option>Standard (New → Screening → Interview → Offer)</option>
                  <option>Tech roles</option>
                  <option>High-volume hiring</option>
                </select>
              </div>
            </div>
          </GlassPanel>

          {/* Visibility */}
          <GlassPanel className="p-3">
            <p className="text-[11px] text-gray-400 mb-2 uppercase tracking-[0.16em]">
              Visibility
            </p>
            <div className="space-y-2 text-xs text-gray-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-black/70" />
                <span>Internal career portal</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-black/70" />
                <span>External careers site</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-black/70" />
                <span>Broadcast to LinkedIn / job boards</span>
              </label>
            </div>
          </GlassPanel>
        </div>

        <div className="p-4 border-t border-gray-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-xs px-3 py-2 rounded-xl bg-gray-900/80 border border-gray-700 text-gray-200 hover:border-gray-500 transition-all"
          >
            Save as Draft
          </button>
          <button className="flex-1 text-xs px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-black font-semibold shadow-lg shadow-cyan-500/40 hover:shadow-pink-500/40 transition-all">
            Publish Job
          </button>
        </div>
      </div>
    </div>
  );
};

// ========================================================
// 8. MAIN JOBS COMPONENT (ENTRY)
// ========================================================

const Jobs = () => {
  const [jobs] = useState(MOCK_JOBS);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState(MOCK_JOBS[0] || null);
  const [activeTab, setActiveTab] = useState("overview");
  const [createOpen, setCreateOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesStatus =
        statusFilter === "all" ? true : job.status === statusFilter;
      const query = search.toLowerCase();
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query) ||
        job.code.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }, [jobs, search, statusFilter]);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setActiveTab("overview");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] text-white p-6 space-y-4">
      {/* 3. Header + KPIs */}
      <JobsHeader onOpenCreate={() => setCreateOpen(true)} />
      <JobsKPIStrip jobs={jobs} />

      {/* 4. Filters */}
      <JobsFilters
        search={search}
        setSearch={setSearch}
        viewMode={viewMode}
        setViewMode={setViewMode}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Main content: list + detail */}
      <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,2fr)_minmax(320px,1.1fr)] gap-4">
        <div>
          {filteredJobs.length === 0 ? (
            <GlassPanel className="p-6 text-sm text-gray-400">
              No jobs found for this filter. Try clearing the search or changing
              status.
            </GlassPanel>
          ) : viewMode === "grid" ? (
            <JobGrid jobs={filteredJobs} onSelect={handleSelectJob} />
          ) : (
            <JobTable jobs={filteredJobs} onSelect={handleSelectJob} />
          )}
        </div>

        <div className="min-h-[320px] max-h-[640px]">
          <JobDetailPanel
            job={selectedJob}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>

      {/* Create Job Sheet */}
      <CreateJobSheet open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
};

export default Jobs;
