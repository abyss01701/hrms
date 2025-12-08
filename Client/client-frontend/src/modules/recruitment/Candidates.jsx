// Candidates.jsx — Recruitment › Talent CRM (Modern Pop Theme)
// --------------------------------------------------------
// Sections:
// 1. Mock Data
// 2. Glow Panels + UI Helpers
// 3. Header + Filters
// 4. Candidate Grid + Table
// 5. Profile Drawer
// 6. Main Candidates Component Export
// --------------------------------------------------------

import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  List,
  LayoutGrid,
  Users,
  Star,
  Mail,
  Phone,
  Building2,
  Tag,
  MapPin,
  ArrowUpRight,
  X,
  Award
} from "lucide-react";

// ========================================================
// 1. MOCK DATA (Replace later with backend integration)
// ========================================================

const MOCK_CANDIDATES = [
  {
    id: "C001",
    name: "Sarah Chen",
    location: "Nadi",
    email: "sarah@example.com",
    phone: "+679 845 2212",
    score: 92,
    role: "Frontend Engineer",
    status: "Interview",
    source: "LinkedIn",
    tags: ["UI Specialist", "Portfolio A+"],
  },
  {
    id: "C002",
    name: "Rahul Kumar",
    location: "Suva",
    email: "rahul@example.com",
    phone: "+679 777 0922",
    score: 78,
    role: "Frontend Engineer",
    status: "Screening",
    source: "Career Site",
    tags: ["Shortlisted"],
  },
  {
    id: "C003",
    name: "Emily Davis",
    location: "USA · Remote",
    email: "emily@example.com",
    phone: "+1 424 232 9911",
    score: 88,
    role: "Marketing Lead",
    status: "Offer Extended",
    source: "Referral",
    tags: ["Content", "Campaign", "Offer"],
  },
];

// ========================================================
// 2. Glow Panels + Helpers
// ========================================================

const Glass = ({ children, className }) => (
  <div
    className={`bg-gradient-to-br from-gray-900/90 via-black to-gray-950/90 border border-gray-800/80 shadow-lg shadow-cyan-500/5 backdrop-blur-xl rounded-2xl ${className}`}
  >
    {children}
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    Interview: "text-amber-300 border-amber-500/40 bg-amber-500/15",
    Screening: "text-cyan-300 border-cyan-500/40 bg-cyan-500/15",
    "Offer Extended": "text-pink-300 border-pink-500/40 bg-pink-500/15",
  };
  return (
    <span
      className={`text-[11px] px-2 py-1 rounded-full border font-medium inline-flex items-center gap-1 ${
        map[status] || "text-gray-300 bg-gray-500/15 border-gray-500/40"
      }`}
    >
      <span className="w-1.5 h-1.5 bg-current rounded-full" />
      {status}
    </span>
  );
};

// ========================================================
// 3. PAGE HEADER + FILTERS
// ========================================================

const CandidatesHeader = () => (
  <div className="mb-6">
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-[11px] text-cyan-300 uppercase tracking-wider mb-2">
      Recruitment · Candidates
    </div>

    <h1 className="text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1">
      Your talent pool
    </h1>
    <p className="text-sm text-gray-400">
      Central view of all applicants across roles and pipelines.
    </p>
  </div>
);

const CandidatesFilters = ({
  query,
  setQuery,
  viewMode,
  setViewMode,
  statusFilter,
  setStatusFilter,
}) => (
  <Glass className="p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="flex items-center gap-2 flex-1">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/80 border border-gray-700 rounded-xl flex-1 max-w-lg">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search candidates..."
          className="bg-transparent text-white outline-none w-full text-sm placeholder:text-gray-500"
        />
      </div>

      <div className="hidden md:flex items-center gap-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-900/80 border border-gray-700 text-xs text-gray-200 px-2.5 py-1.5 rounded-xl outline-none"
        >
          <option value="all">All statuses</option>
          <option value="Interview">Interview</option>
          <option value="Screening">Screening</option>
          <option value="Offer Extended">Offer Extended</option>
        </select>
      </div>
    </div>

    <div className="flex items-center gap-2 justify-end">
      <div className="inline-flex rounded-full bg-gray-900/80 border border-gray-800 p-1">
        <button
          onClick={() => setViewMode("grid")}
          className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-full ${
            viewMode === "grid"
              ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow shadow-cyan-500/40"
              : "text-gray-400"
          }`}
        >
          <LayoutGrid className="w-3 h-3" /> Grid
        </button>
        <button
          onClick={() => setViewMode("table")}
          className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-full ${
            viewMode === "table"
              ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow shadow-cyan-500/40"
              : "text-gray-400"
          }`}
        >
          <List className="w-3 h-3" /> Table
        </button>
      </div>
    </div>
  </Glass>
);

// ========================================================
// 4. CANDIDATE CARD + GRID + TABLE
// ========================================================

const CandidateCard = ({ candidate, onSelect }) => (
  <Glass
    onClick={() => onSelect(candidate)}
    className="p-4 cursor-pointer hover:border-cyan-500/60 hover:shadow-cyan-500/30 transition-all"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-white font-semibold">{candidate.name}</h3>
        <p className="text-gray-400 text-xs">{candidate.role}</p>
      </div>
      <div className="px-2 py-1 rounded-xl bg-gray-900 border border-gray-700 text-xs text-cyan-300">
        {candidate.score}
      </div>
    </div>

    <div className="mt-3 text-xs text-gray-300 space-y-1">
      <div className="flex items-center gap-1">
        <MapPin className="w-3 h-3" /> {candidate.location}
      </div>
      <div className="flex items-center gap-1">
        <Building2 className="w-3 h-3" /> {candidate.source}
      </div>
      <StatusBadge status={candidate.status} />
    </div>

    <div className="mt-3 flex flex-wrap gap-1">
      {candidate.tags?.map((t) => (
        <span
          key={t}
          className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800/80 border border-gray-700 text-gray-300"
        >
          {t}
        </span>
      ))}
    </div>
  </Glass>
);

const CandidateGrid = ({ candidates, onSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    {candidates.map((c) => (
      <CandidateCard key={c.id} candidate={c} onSelect={onSelect} />
    ))}
  </div>
);

const CandidateTable = ({ candidates, onSelect }) => (
  <Glass className="overflow-hidden">
    <table className="w-full text-sm">
      <thead>
        <tr className="text-gray-400 text-[11px] uppercase tracking-wider border-b border-gray-800">
          <th className="text-left px-4 py-3">Name</th>
          <th className="text-left px-4 py-3">Role</th>
          <th className="text-left px-4 py-3">Source</th>
          <th className="text-left px-4 py-3">Score</th>
          <th className="text-left px-4 py-3">Status</th>
          <th className="text-right px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((c, i) => (
          <tr
            key={c.id}
            onClick={() => onSelect(c)}
            className="border-t border-gray-900/80 hover:bg-gray-900/60 cursor-pointer"
          >
            <td className="px-4 py-3 text-white">{c.name}</td>
            <td className="px-4 py-3 text-gray-300">{c.role}</td>
            <td className="px-4 py-3 text-gray-300">{c.source}</td>
            <td className="px-4 py-3 text-gray-300">{c.score}</td>
            <td className="px-4 py-3">
              <StatusBadge status={c.status} />
            </td>
            <td className="px-4 py-3 text-right">
              <button className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1">
                Open <ArrowUpRight className="w-3 h-3" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Glass>
);

// ========================================================
// 5. PROFILE DRAWER
// ========================================================

const ProfileDrawer = ({ candidate, onClose }) => {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xl">
      <Glass className="w-full max-w-md h-full border-l border-gray-800 shadow-2xl flex flex-col">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <div>
            <p className="text-[11px] text-cyan-300 uppercase tracking-wider">
              Candidate
            </p>
            <h2 className="text-lg font-bold text-white">{candidate.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-gray-900 border border-gray-700 rounded-xl text-gray-300 hover:border-cyan-400"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4 text-xs overflow-y-auto">
          <Glass className="p-3">
            <p className="text-gray-400 mb-1">Email</p>
            <p className="text-white flex items-center gap-2 text-sm">
              <Mail className="w-3 h-3" /> {candidate.email}
            </p>
          </Glass>
          <Glass className="p-3">
            <p className="text-gray-400 mb-1">Phone</p>
            <p className="text-white flex items-center gap-2 text-sm">
              <Phone className="w-3 h-3" /> {candidate.phone}
            </p>
          </Glass>
          <Glass className="p-3">
            <p className="text-gray-400 mb-1">Role Applied</p>
            <p className="text-white">{candidate.role}</p>
          </Glass>
          <Glass className="p-3">
            <p className="text-gray-400 mb-1">Sourcing</p>
            <p className="text-white">{candidate.source}</p>
          </Glass>
          <Glass className="p-3">
            <p className="text-gray-400 mb-1">Tags</p>
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
            <p className="text-gray-400 mb-1">Actions</p>
            <button className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-black text-xs font-bold shadow-lg">
              Advance in Pipeline
            </button>
            <button className="w-full px-3 py-2 mt-2 rounded-xl bg-gray-900 border border-gray-700 text-gray-300 text-xs hover:border-gray-600">
              Send Assessment
            </button>
          </Glass>
        </div>
      </Glass>
    </div>
  );
};

// ========================================================
// 6. MAIN COMPONENT EXPORT
// ========================================================

export default function Candidates() {
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredCandidates = useMemo(() => {
    return MOCK_CANDIDATES.filter((c) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.source.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ? true : c.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="p-6 space-y-6 text-white">
      <CandidatesHeader />

      <Glass className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-cyan-300" />
          <span className="text-xs text-gray-400">
            {filteredCandidates.length} candidates displayed
          </span>
        </div>
        <button className="px-3 py-2 rounded-xl bg-gray-900/80 border border-gray-700 text-gray-200 text-xs hover:border-cyan-500/60">
          Add Candidate
        </button>
      </Glass>

      <CandidatesFilters
        query={query}
        setQuery={setQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {filteredCandidates.length === 0 ? (
        <Glass className="p-6 text-sm text-gray-400">
          No candidates found.
        </Glass>
      ) : viewMode === "grid" ? (
        <CandidateGrid
          candidates={filteredCandidates}
          onSelect={setSelectedCandidate}
        />
      ) : (
        <CandidateTable
          candidates={filteredCandidates}
          onSelect={setSelectedCandidate}
        />
      )}

      <ProfileDrawer
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />
    </div>
  );
}
