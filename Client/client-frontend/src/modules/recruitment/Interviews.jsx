// Interviews.jsx — Recruitment › Interviews Hub (Modern Pop Theme)
// --------------------------------------------------------
// Sections:
// 1. Mock Data
// 2. Glass UI Helpers & Components
// 3. Header + KPI Strip
// 4. Filters Bar (status/date)
// 5. Interviews List + Calendar Layout
// 6. Interview Card
// 7. Right Drawer (Interview Details + feedback actions)
// 8. Schedule Drawer (Create Interview)
// 9. Main Interviews Component Export
// --------------------------------------------------------

import React, { useState, useMemo } from "react";
import {
  CalendarDays,
  Users,
  Search,
  Clock,
  CheckCircle2,
  Video,
  Building2,
  ArrowUpRight,
  Tag,
  X,
  Plus,
  Mail,
  Phone,
  Award,
  MessageSquare,
  UserCircle,
} from "lucide-react";

// ========================================================
// 1. MOCK DATA
// ========================================================

const MOCK_INTERVIEWS = [
  {
    id: "INT-001",
    candidate: "Sarah Chen",
    role: "Frontend Engineer",
    stage: "Technical Interview",
    status: "Scheduled",
    datetime: "2025-12-12 3:00pm",
    panel: ["Monisha", "Pauliasi"],
    location: "Teams Video Call",
    score: 92,
    feedbackPending: true,
  },
  {
    id: "INT-002",
    candidate: "Rahul Kumar",
    role: "Frontend Engineer",
    stage: "Screening Call",
    status: "Completed",
    datetime: "2025-12-11 11:00am",
    panel: ["HR Officer"],
    location: "Phone Screening",
    score: 78,
    feedbackPending: false,
  },
  {
    id: "INT-003",
    candidate: "Emily Davis",
    role: "Marketing Lead",
    stage: "Hiring Manager Interview",
    status: "Awaiting Feedback",
    datetime: "2025-12-10 1:30pm",
    panel: ["Pauliasi"],
    location: "Teams Video Call",
    score: 88,
    feedbackPending: true,
  },
];

// ========================================================
// 2. SHARED UI (Glass, status, chips)
// ========================================================

const Glass = ({ children, className }) => (
  <div
    className={`bg-gradient-to-br from-gray-900/90 via-black to-gray-950/90 border border-gray-800/80 shadow-lg shadow-cyan-500/5 backdrop-blur-xl rounded-2xl ${className}`}
  >
    {children}
  </div>
);

const StatusChip = ({ status }) => {
  const map = {
    Scheduled: "text-cyan-300 border-cyan-400/40 bg-cyan-400/15",
    Completed: "text-emerald-300 border-emerald-400/40 bg-emerald-400/15",
    "Awaiting Feedback":
      "text-amber-300 border-amber-400/40 bg-amber-400/15 animate-pulse",
  };
  return (
    <span
      className={`text-[11px] px-2 py-1 rounded-full border font-medium ${map[status]}`}
    >
      {status}
    </span>
  );
};

// ========================================================
// 3. HEADER + KPI
// ========================================================

const InterviewsHeader = () => (
  <div className="mb-6">
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/40 text-[11px] text-pink-300 uppercase tracking-wider mb-2">
      Recruitment · Interviews
    </div>

    <h1 className="text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
      Interview Hub
    </h1>
    <p className="text-sm text-gray-400">
      Schedule, track and evaluate candidate interviews.
    </p>
  </div>
);

const InterviewStats = ({ interviews }) => {
  const completed = interviews.filter((i) => i.status === "Completed").length;
  const scheduled = interviews.filter((i) => i.status === "Scheduled").length;
  const feedback = interviews.filter((i) => i.feedbackPending).length;

  const cards = [
    {
      label: "Upcoming",
      value: scheduled,
      icon: CalendarDays,
      accent: "from-cyan-400 to-blue-400",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      accent: "from-emerald-400 to-teal-400",
    },
    {
      label: "Pending feedback",
      value: feedback,
      icon: MessageSquare,
      accent: "from-amber-400 to-pink-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <Glass
            key={i}
            className={`p-4 flex items-center justify-between relative overflow-hidden`}
          >
            <div>
              <p className="text-[11px] text-gray-400 uppercase">{c.label}</p>
              <h3 className="text-xl font-bold text-white">{c.value}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-700 flex items-center justify-center">
              <Icon className="w-4 h-4 text-cyan-300" />
            </div>
            <div
              className={`absolute w-24 h-24 bg-gradient-to-br ${c.accent} opacity-20 blur-xl -bottom-4 -right-4`}
            />
          </Glass>
        );
      })}
    </div>
  );
};

// ========================================================
// 4. FILTERS BAR
// ========================================================

const InterviewsFilters = ({
  query,
  setQuery,
  statusFilter,
  setStatusFilter,
}) => (
  <Glass className="p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="flex items-center gap-2 flex-1">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/80 border border-gray-800 rounded-xl flex-1 max-w-lg">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search candidates or role..."
          className="bg-transparent text-white outline-none text-sm w-full placeholder:text-gray-500"
        />
      </div>
    </div>

    <div className="flex items-center gap-2">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="bg-gray-900/80 border border-gray-700 text-xs text-gray-200 px-2.5 py-1.5 rounded-xl outline-none"
      >
        <option value="all">All</option>
        <option value="Scheduled">Scheduled</option>
        <option value="Completed">Completed</option>
        <option value="Awaiting Feedback">Awaiting Feedback</option>
      </select>

      <button className="px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-black text-xs font-bold shadow-lg">
        New Interview
      </button>
    </div>
  </Glass>
);

// ========================================================
// 5 & 6. INTERVIEW CARD + LIST
// ========================================================

const InterviewCard = ({ interview, onSelect }) => (
  <Glass
    onClick={() => onSelect(interview)}
    className="p-4 cursor-pointer hover:border-cyan-500/60 hover:shadow-cyan-500/30 transition-all"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-white font-semibold">{interview.candidate}</h3>
        <p className="text-xs text-gray-400">{interview.role}</p>
      </div>
      <div className="px-2 py-1 rounded-xl bg-gray-900 border border-gray-700 text-xs text-cyan-300">
        {interview.score}
      </div>
    </div>

    <div className="mt-3 flex flex-col gap-1 text-xs text-gray-300">
      <div className="flex items-center gap-1">
        <Clock className="w-3 h-3" /> {interview.datetime}
      </div>
      <div className="flex items-center gap-1">
        <Video className="w-3 h-3" /> {interview.location}
      </div>
      <StatusChip status={interview.status} />
    </div>

    <div className="mt-3 flex flex-wrap gap-1">
      {interview.panel?.map((p) => (
        <span
          key={p}
          className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800/80 border border-gray-700 text-gray-300"
        >
          {p}
        </span>
      ))}
    </div>
  </Glass>
);

const InterviewsList = ({ interviews, onSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    {interviews.map((i) => (
      <InterviewCard key={i.id} interview={i} onSelect={onSelect} />
    ))}
  </div>
);

// ========================================================
// 7. INTERVIEW DETAILS DRAWER
// ========================================================

const InterviewDrawer = ({ interview, onClose }) => {
  if (!interview) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xl">
      <Glass className="w-full max-w-md h-full border-l border-gray-800 shadow-2xl flex flex-col">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <div>
            <p className="text-[11px] text-cyan-300 uppercase tracking-wider">
              Interview
            </p>
            <h2 className="text-lg font-bold text-white">{interview.candidate}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-gray-900 border border-gray-700 rounded-xl text-gray-300 hover:border-cyan-400"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4 text-xs overflow-y-auto">
          {/* info */}
          <Glass className="p-3">
            <p className="text-gray-400 mb-1">Role</p>
            <p className="text-white">{interview.role}</p>
          </Glass>

          <Glass className="p-3">
            <p className="text-gray-400 mb-1">Time</p>
            <p className="text-white flex items-center gap-2 text-sm">
              <Clock className="w-3 h-3" /> {interview.datetime}
            </p>
          </Glass>

          <Glass className="p-3">
            <p className="text-gray-400 mb-1">Location</p>
            <p className="text-white flex items-center gap-2 text-sm">
              <Video className="w-3 h-3" /> {interview.location}
            </p>
          </Glass>

          <Glass className="p-3">
            <p className="text-gray-400 mb-1">Panel Members</p>
            <div className="flex flex-wrap gap-2">
              {interview.panel?.map((p) => (
                <span
                  key={p}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 text-gray-300"
                >
                  {p}
                </span>
              ))}
            </div>
          </Glass>

          {/* Actions */}
          <Glass className="p-3 space-y-2 text-xs">
            <button className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-black font-bold shadow-lg">
              Add / Submit Feedback
            </button>
            <button className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-gray-300 hover:border-gray-600">
              Reschedule
            </button>
          </Glass>
        </div>
      </Glass>
    </div>
  );
};

// ========================================================
// 8. SCHEDULE DRAWER — Create Interview
// ========================================================

const ScheduleDrawer = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xl">
      <Glass className="w-full max-w-md h-full border-l border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Schedule Interview</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 flex items-center justify-center hover:border-cyan-400"
          >
            ✕
          </button>
        </div>

        <div className="p-4 text-xs overflow-y-auto space-y-4">
          <Glass className="p-3">
            <p className="text-[11px] text-gray-400 mb-1">Candidate</p>
            <select className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-sm">
              <option>SARAH CHEN</option>
            </select>
          </Glass>

          <Glass className="p-3">
            <p className="text-[11px] text-gray-400 mb-1">Interview Type</p>
            <select className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-sm">
              <option>Screening</option>
              <option>Technical</option>
              <option>Hiring Manager</option>
            </select>
          </Glass>

          <Glass className="p-3">
            <p className="text-[11px] text-gray-400 mb-1">Date & Time</p>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-sm"
            />
          </Glass>

          <Glass className="p-3">
            <p className="text-[11px] text-gray-400 mb-1">Panel</p>
            <input
              placeholder="e.g. Monisha, Pauliasi"
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-sm"
            />
          </Glass>

          <Glass className="p-3">
            <p className="text-[11px] text-gray-400 mb-1">Location</p>
            <select className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-sm">
              <option>Teams Call</option>
              <option>Phone</option>
              <option>Onsite Office</option>
            </select>
          </Glass>
        </div>

        <div className="p-4 border-t border-gray-800">
          <button className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-black text-xs font-bold shadow-lg">
            Send Invite & Schedule
          </button>
        </div>
      </Glass>
    </div>
  );
};

// ========================================================
// 9. MAIN COMPONENT EXPORT
// ========================================================

export default function Interviews() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_INTERVIEWS.filter((i) => {
      const q = query.toLowerCase();
      const matchesQ =
        !q ||
        i.candidate.toLowerCase().includes(q) ||
        i.role.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "all" ? true : i.status === statusFilter;
      return matchesQ && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="p-6 space-y-6 text-white">
      <InterviewsHeader />
      <InterviewStats interviews={MOCK_INTERVIEWS} />

      <InterviewsFilters
        query={query}
        setQuery={setQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {filtered.length === 0 ? (
        <Glass className="p-6 text-sm text-gray-400">No interviews found.</Glass>
      ) : (
        <InterviewsList
          interviews={filtered}
          onSelect={setSelectedInterview}
        />
      )}

      <button
        onClick={() => setScheduleOpen(true)}
        className="fixed bottom-6 right-6 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-black text-xs font-bold shadow-xl shadow-cyan-500/30"
      >
        + Schedule Interview
      </button>

      <InterviewDrawer
        interview={selectedInterview}
        onClose={() => setSelectedInterview(null)}
      />

      <ScheduleDrawer open={scheduleOpen} onClose={() => setScheduleOpen(false)} />
    </div>
  );
}
