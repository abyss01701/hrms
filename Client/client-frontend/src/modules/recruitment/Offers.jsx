// Offers.jsx — Recruitment › Offers (Modern Pop Theme)
// --------------------------------------------------------
// Sections:
// 1. Mock Data
// 2. UI Helpers (Glass, Status Pill, Etc.)
// 3. Header + KPI Tiles
// 4. Filters Bar
// 5. Offer Cards Grid
// 6. Right Drawer — Offer Detail & Contract Actions
// 7. Create Offer Sheet (Slide-In)
// 8. Main Offers Component Export
// --------------------------------------------------------

import React, { useState, useMemo } from "react";
import {
  Award,
  CheckCircle2,
  Mail,
  FileCheck2,
  FileSignature,
  XCircle,
  LayoutGrid,
  List,
  Search,
  Building2,
  ArrowUpRight,
  Tag,
  DollarSign,
  UserCircle2,
  CalendarDays,
  X,
  Plus,
  BadgeCheck,
} from "lucide-react";

// ========================================================
// 1. MOCK OFFERS DATA
// ========================================================

const MOCK_OFFERS = [
  {
    id: "OF-001",
    candidate: "Sarah Chen",
    role: "Frontend Engineer",
    department: "Engineering",
    salary: "FJD $85,000",
    status: "Accepted",
    issuedOn: "5 days ago",
    approver: "Monisha",
    tags: ["Tech", "UI Specialist"],
  },
  {
    id: "OF-002",
    candidate: "Rahul Kumar",
    role: "Frontend Engineer",
    department: "Engineering",
    salary: "FJD $65,000",
    status: "Sent",
    issuedOn: "2 days ago",
    approver: "Pauliasi",
    tags: ["Shortlisted"],
  },
  {
    id: "OF-003",
    candidate: "Emily Davis",
    role: "Marketing Lead",
    department: "Marketing",
    salary: "FJD $70,000",
    status: "Awaiting Approval",
    issuedOn: "Draft",
    approver: "People Manager",
    tags: ["Priority", "Campaigns"],
  },
  {
    id: "OF-004",
    candidate: "John Doe",
    role: "Business Analyst",
    department: "Business Markets",
    salary: "FJD $55,000",
    status: "Declined",
    issuedOn: "1 week ago",
    approver: "Sanil",
    tags: ["Internal Transfer"],
  },
];

// ========================================================
// 2. SHARED UI HELPERS
// ========================================================

const Glass = ({ children, className }) => (
  <div
    className={`bg-gradient-to-br from-gray-900/90 via-black to-gray-950/90 border border-gray-800/80 shadow-lg shadow-cyan-500/5 backdrop-blur-xl rounded-2xl ${className}`}
  >
    {children}
  </div>
);

const OfferStatus = ({ status }) => {
  const map = {
    Accepted: "bg-emerald-500/20 border-emerald-400/40 text-emerald-300",
    Sent: "bg-cyan-500/20 border-cyan-400/40 text-cyan-300",
    "Awaiting Approval":
      "bg-amber-500/20 border-amber-400/40 text-amber-300 animate-pulse",
    Declined: "bg-red-500/20 border-red-400/40 text-red-300",
    Draft: "bg-gray-500/20 border-gray-400/40 text-gray-300",
  };
  return (
    <span
      className={`text-[11px] px-2 py-1 rounded-full font-medium border ${map[status] ||
        map["Draft"]}`}
    >
      {status}
    </span>
  );
};

// ========================================================
// 3. HEADER + KPI BLOCKS
// ========================================================

const OffersHeader = () => (
  <div className="mb-6">
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/40 text-[11px] text-pink-300 uppercase tracking-wider mb-2">
      Recruitment · Offers
    </div>

    <h1 className="text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
      Offer Management
    </h1>
    <p className="text-sm text-gray-400">
      Track salary offers, approvals, signatures & outcomes.
    </p>
  </div>
);

const OfferStats = ({ offers }) => {
  const accepted = offers.filter((o) => o.status === "Accepted").length;
  const pending = offers.filter((o) => o.status === "Awaiting Approval").length;
  const declined = offers.filter((o) => o.status === "Declined").length;

  const cards = [
    { label: "Accepted", value: accepted, icon: CheckCircle2 },
    { label: "Pending Approval", value: pending, icon: FileSignature },
    { label: "Declined", value: declined, icon: XCircle },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <Glass
            key={i}
            className="p-4 flex items-center justify-between relative overflow-hidden"
          >
            <div>
              <p className="text-[11px] text-gray-400 uppercase">{c.label}</p>
              <h3 className="text-xl font-bold text-white">{c.value}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-700 flex items-center justify-center">
              <Icon className="w-4 h-4 text-cyan-300" />
            </div>
          </Glass>
        );
      })}
    </div>
  );
};

// ========================================================
// 4. FILTERS BAR
// ========================================================

const OffersFilters = ({
  query,
  setQuery,
  viewMode,
  setViewMode,
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
          placeholder="Search offers or candidate..."
          className="bg-transparent text-white outline-none text-sm w-full placeholder:text-gray-500"
        />
      </div>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="bg-gray-900/80 border border-gray-700 text-xs text-gray-200 px-2.5 py-1.5 rounded-xl outline-none"
      >
        <option value="all">All</option>
        <option value="Accepted">Accepted</option>
        <option value="Sent">Sent</option>
        <option value="Awaiting Approval">Awaiting Approval</option>
        <option value="Declined">Declined</option>
      </select>
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
// 5. OFFER CARD + GRID + TABLE
// ========================================================

const OfferCard = ({ offer, onSelect }) => (
  <Glass
    onClick={() => onSelect(offer)}
    className="p-4 cursor-pointer hover:border-cyan-500/60 hover:shadow-cyan-500/30 transition-all"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-white font-semibold">{offer.candidate}</h3>
        <p className="text-xs text-gray-400">{offer.role}</p>
      </div>
      <OfferStatus status={offer.status} />
    </div>

    <div className="mt-3 flex flex-col gap-1 text-xs text-gray-300">
      <div className="flex items-center gap-1">
        <Building2 className="w-3 h-3" /> {offer.department}
      </div>
      <div className="flex items-center gap-1">
        <DollarSign className="w-3 h-3" /> {offer.salary}
      </div>
      <div className="flex items-center gap-1">
        <CalendarDays className="w-3 h-3" /> {offer.issuedOn}
      </div>
    </div>

    <div className="mt-3 flex flex-wrap gap-1">
      {offer.tags?.map((t) => (
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

const OfferGrid = ({ offers, onSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    {offers.map((o) => (
      <OfferCard key={o.id} offer={o} onSelect={onSelect} />
    ))}
  </div>
);

const OfferTable = ({ offers, onSelect }) => (
  <Glass className="overflow-hidden">
    <table className="w-full text-sm">
      <thead>
        <tr className="text-gray-400 text-[11px] uppercase tracking-wider border-b border-gray-800">
          <th className="text-left px-4 py-3">Candidate</th>
          <th className="text-left px-4 py-3">Role</th>
          <th className="text-left px-4 py-3">Salary</th>
          <th className="text-left px-4 py-3">Status</th>
          <th className="text-right px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {offers.map((o, i) => (
          <tr
            key={o.id}
            onClick={() => onSelect(o)}
            className="border-t border-gray-900/80 hover:bg-gray-900/60 cursor-pointer"
          >
            <td className="px-4 py-3 text-white">{o.candidate}</td>
            <td className="px-4 py-3 text-gray-300">{o.role}</td>
            <td className="px-4 py-3 text-gray-300">{o.salary}</td>
            <td className="px-4 py-3">
              <OfferStatus status={o.status} />
            </td>
            <td className="px-4 py-3 text-right">
              <button className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1">
                View <ArrowUpRight className="w-3 h-3" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Glass>
);

// ========================================================
// 6. OFFER DETAIL DRAWER
// ========================================================

const OfferDrawer = ({ offer, onClose }) => {
  if (!offer) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xl">
      <Glass className="w-full max-w-md h-full border-l border-gray-800 shadow-2xl flex flex-col">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <div>
            <p className="text-[11px] text-cyan-300 uppercase tracking-wider">
              Offer
            </p>
            <h2 className="text-lg font-bold text-white">{offer.candidate}</h2>
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
            <p className="text-gray-400 mb-1">Role</p>
            <p className="text-white">{offer.role}</p>
          </Glass>

          <Glass className="p-3">
            <p className="text-gray-400 mb-1">Salary</p>
            <p className="text-white text-sm flex items-center gap-2">
              <DollarSign className="w-3 h-3" /> {offer.salary}
            </p>
          </Glass>

          <Glass className="p-3">
            <p className="text-gray-400 mb-1">Approver</p>
            <p className="text-white flex items-center gap-2 text-sm">
              <UserCircle2 className="w-3 h-3" /> {offer.approver}
            </p>
          </Glass>

          <Glass className="p-3">
            <p className="text-gray-400 mb-1">Status</p>
            <OfferStatus status={offer.status} />
          </Glass>

          {/* Buttons */}
          <Glass className="p-3 space-y-2 text-xs">
            {offer.status === "Sent" && (
              <button className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-black font-bold shadow-lg">
                Resend Offer Letter
              </button>
            )}
            {offer.status === "Awaiting Approval" && (
              <button className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-gray-300 hover:border-gray-600">
                Approve Offer
              </button>
            )}
            {offer.status === "Accepted" && (
              <button className="w-full px-3 py-2 rounded-xl bg-emerald-500/30 border border-emerald-400 text-emerald-300">
                Generate Contract
              </button>
            )}
          </Glass>
        </div>
      </Glass>
    </div>
  );
};

// ========================================================
// 7. CREATE OFFER SHEET
// ========================================================

const OfferSheet = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xl">
      <Glass className="w-full max-w-md h-full border-l border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Create Offer</h2>
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
            <input
              placeholder="e.g. Sarah Chen"
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-sm"
            />
          </Glass>

          <Glass className="p-3">
            <p className="text-[11px] text-gray-400 mb-1">Role</p>
            <input
              placeholder="e.g. Frontend Engineer"
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-sm"
            />
          </Glass>

          <Glass className="p-3">
            <p className="text-[11px] text-gray-400 mb-1">Salary</p>
            <input
              placeholder="e.g. FJD $85,000"
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-sm"
            />
          </Glass>

          <Glass className="p-3">
            <p className="text-[11px] text-gray-400 mb-1">Approver</p>
            <input
              placeholder="e.g. People Manager"
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-sm"
            />
          </Glass>

          <Glass className="p-3">
            <p className="text-[11px] text-gray-400 mb-1">Tags</p>
            <input
              placeholder="e.g. UI Specialist, Priority"
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-sm"
            />
          </Glass>
        </div>

        <div className="p-4 border-t border-gray-800">
          <button className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-black text-xs font-bold shadow-lg">
            Issue Offer
          </button>
        </div>
      </Glass>
    </div>
  );
};

// ========================================================
// 8. MAIN COMPONENT EXPORT
// ========================================================

export default function Offers() {
  const [offers] = useState(MOCK_OFFERS);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredOffers = useMemo(() => {
    return offers.filter((o) => {
      const q = query.toLowerCase();
      const matchesQ =
        !q ||
        o.candidate.toLowerCase().includes(q) ||
        o.role.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "all" ? true : o.status === statusFilter;
      return matchesQ && matchesStatus;
    });
  }, [query, statusFilter, offers]);

  return (
    <div className="p-6 space-y-6 text-white">
      <OffersHeader />
      <OfferStats offers={offers} />

      <OffersFilters
        query={query}
        setQuery={setQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {filteredOffers.length === 0 ? (
        <Glass className="p-6 text-sm text-gray-400">
          No matching offers found.
        </Glass>
      ) : viewMode === "grid" ? (
        <OfferGrid offers={filteredOffers} onSelect={setSelectedOffer} />
      ) : (
        <OfferTable offers={filteredOffers} onSelect={setSelectedOffer} />
      )}

      {/* Fab button */}
      <button
        onClick={() => setSheetOpen(true)}
        className="fixed bottom-6 right-6 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-black text-xs font-bold shadow-xl shadow-cyan-500/30"
      >
        + Create Offer
      </button>

      {/* Drawers */}
      <OfferDrawer offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
      <OfferSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  );
}
