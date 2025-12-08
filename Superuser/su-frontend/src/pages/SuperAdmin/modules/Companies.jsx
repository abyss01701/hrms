// src/pages/SuperAdmin/SuperAdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useHeader } from "../../../layout/HeaderContext";

import {
  Building2,
  Users,
  Settings,
  Package,
  ChevronDown,
  TrendingUp,
  Search,
  Filter,
  Power,
  Zap,
  Check,
  MoreVertical,
  RefreshCcw,      
  Archive,         
  Trash2,
  Globe, 
  Plus,
} from "lucide-react";

import { modulesCatalog } from "../module-category/moduleCatalog";
import {
  getCompanies,
  onboardCompany,
  updateCompanyModules,
  updateCompanyStatus,
  removeCompany,
  getSystemStats,
} from "../api/su-api";


const API_URL = "http://localhost:3000";

const Companies = ({ onLogout }) => {
  const { setHeaderConfig } = useHeader();
  const [activeTab, setActiveTab] = useState("companies");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModuleConfig, setShowModuleConfig] = useState(false);
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [dropdownInfo, setDropdownInfo] = useState(null);
  const [systemStats, setSystemStats] = useState({activeCompanies: 0, activeUsers: 0,});
  const [darkMode, setDarkMode] = useState(false);
  
  const [stats, setStats] = useState({
    totalClients: 0,
    activeClients: 0,
    totalEmployees: 0,
    growth: 0,
  });

  // confirm dialog state
  const [confirm, setConfirm] = useState({
    show: false,
    title: "",
    subtitle: "",
    actionLabel: "",
    tone: "danger", // 'danger' | 'warn'
    onConfirm: null,
  });

  useEffect(() => {
    loadCompanies();
    loadStats();
    //calls header
    setHeaderConfig({
      title: "Tenant Management",
      subtitle: "Manage organizations and their configurations",
      button: {
        label: "Add Company",
        icon: Plus,
        onClick: () => setShowAddCompany(true),
      },
    });
  }, []);

const loadCompanies = async () => {
  setLoading(true);
  try {
    const data = await getCompanies();
    const rows = Array.isArray(data)
      ? data.map((client) => ({
          id: client.clientID,
          name: client.clientName,
          domain: client.domain,
          status: client.status || "active",
          employees: client.employees ?? 0,
          moduleName: client.moduleName || ["Overview"],
          plan: client.plan || "Professional",
          email: client.adminEmail,
          createdAt: client.createdAt,
        }))
      : [];
    setCompanies(rows);
  } catch (err) {
    console.error("Failed to load companies:", err);
  } finally {
    setLoading(false);
  }
};

const loadStats = async () => {
  try {
    const data = await getSystemStats();   // New backend stats route

    setStats({
      totalClients: data.activeCompanies ?? 0,   // maps to your card
      activeClients: data.activeCompanies ?? 0,  // same metric reused
      totalEmployees: data.activeUsers ?? 0,     // sum of all employees
      growth: stats.growth ?? 0,                 // keep existing growth value
    });

  } catch (err) {
    console.error("Failed to load stats:", err);
  }
};
const handleAddCompany = async (formData) => {
  const payload = {
    clientName: formData.clientName,
    plan: formData.plan,
    status: formData.status,
    domain: formData.domain,
    employees: Number(formData.employees || 0),
    adminEmail: formData.adminEmail,
    moduleName: formData.moduleName,         // must be string[]
    moduleFeatures: [],                      // or generate later
  };

  const { ok, data } = await onboardCompany(payload);
  if (!ok) {
    alert(data.message || "Onboarding failed.");
    return;
  }
  alert("✔ Company onboarded + credentials emailed.");
  loadCompanies();
  // loadStats();
  setShowAddCompany(false);
};

const handleUpdateModules = async (companyId, moduleName) => {
  await updateCompanyModules(companyId, moduleName);
  loadCompanies();
};

const handleToggleStatus = async (company) => {
  const next = company.status === "active" ? "suspended" : "active";
  await updateCompanyStatus(company.id, next);
  loadCompanies();
};
const askOffload = (company) => {
  setConfirm({
    show: true,
    title: `Offload ${company.name}?`,
    subtitle:
      "This will disable access, revoke user logins, and archive all data. You can re-activate later.",
    actionLabel: "Offload Client",
    tone: "warn",
    onConfirm: async () => {
      try {
        const { ok } = await removeCompany(company.id, "offload");
        if (ok) loadCompanies();
      } catch (e) {
        console.error("Offload failed:", e);
      } finally {
        setConfirm((c) => ({ ...c, show: false }));
      }
    },
  });
};


 const askHardDelete = (company) => {
  setConfirm({
    show: true,
    title: `Delete ${company.name} permanently?`,
    subtitle:
      "This irreversibly removes the company and all associated data. This action cannot be undone.",
    actionLabel: "Delete Permanently",
    tone: "danger",
    onConfirm: async () => {
      try {
        const { ok } = await removeCompany(company.id, "delete");
        if (ok) loadCompanies();
      } catch (e) {
        console.error("Delete failed:", e);
      } finally {
        setConfirm((c) => ({ ...c, show: false }));
      }
    },
  });
};
  const filteredCompanies = useMemo(() => {
    const t = (searchTerm || "").toLowerCase();
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(t) ||
        (c.email || "").toLowerCase().includes(t) ||
        (c.subdomain || "").toLowerCase().includes(t)
    );
  }, [companies, searchTerm]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
    
      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        

        {/* Stats */}
        <div className="bg-white/50 backdrop-blur-sm border-b border-gray-200 px-8 py-6">
          <div className="grid grid-cols-4 gap-6">
            {[
              {
                label: "Total Companies",
                value: stats.totalClients || "0",
                change: `+${stats.growth ?? 0}%`,
                icon: Building2,
                color: "from-blue-500 to-cyan-500",
                bg: "from-blue-50 to-cyan-50",
              },
              {
                label: "Active Users",
                value: (stats.totalEmployees ?? 0).toLocaleString(),
                change: "+8%",
                icon: Users,
                color: "from-purple-500 to-pink-500",
                bg: "from-purple-50 to-pink-50",
              },
              {
                label: "Active Modules",
                value: companies.reduce((sum, c) => sum + (c.moduleName?.length || 0), 0),
                change: "+5%",
                icon: Package,
                color: "from-green-500 to-emerald-500",
                bg: "from-green-50 to-emerald-50",
              },
              {
                label: "System Health",
                value: "99.9%",
                change: "0%",
                icon: TrendingUp,
                color: "from-orange-500 to-red-500",
                bg: "from-orange-50 to-red-50",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${stat.bg} border-2 border-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded-full ${
                      (stat.change || "").startsWith("+") ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-white">
            {/* Filters */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 w-80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <button className="flex items-center space-x-2 px-5 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-semibold transition-all">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Showing <span className="text-blue-600 font-bold">{filteredCompanies.length}</span> companies
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-200">
                  <tr>
                    {["Company", "Domain", "Status", "Employees", "Plan", "Modules", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                        Loading companies...
                      </td>
                    </tr>
                  ) : filteredCompanies.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                        No companies found
                      </td>
                    </tr>
                  ) : (
                    filteredCompanies.map((company) => (
                      <tr key={company.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                              {company.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <p className="font-bold text-gray-900">{company.name}</p>
                              <p className="text-sm text-gray-500">{company.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5 whitespace-nowrap">
                          <code className="text-sm bg-gray-100 px-3 py-2 rounded-lg font-mono border border-gray-200">
                            {company.domain}.hrms.com
                          </code>
                        </td>

                        <td className="px-6 py-5 whitespace-nowrap">
                          <span
                            className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm ${
                              company.status === "active"
                                ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                                : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                            }`}
                          >
                            {company.status.toUpperCase()}
                          </span>
                        </td>

                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-900">
                              {(company.employees ?? 0).toLocaleString()}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-lg">
                            {company.plan}
                          </span>
                        </td>

                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <Package className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-semibold text-gray-700">
                                {company.moduleName?.length || 0} / {modulesCatalog.length}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedCompany(company);
                                setShowModuleConfig(true);
                                setDropdownInfo(null);
                              }}
                              className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all transform hover:scale-110"
                              title="Configure Modules"
                            >
                              <Settings className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                        <td className="px-6 py-5 whitespace-nowrap text-right">
                          <button
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setDropdownInfo({
                                id: company.id,
                                x: rect.right,
                                y: rect.bottom + window.scrollY,
                              });
                            }}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                            title="Actions"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Dropdown via Portal */}
      {dropdownInfo && dropdownInfo.id && createPortal(
        <div
          className="fixed bg-white border border-gray-200 rounded-xl shadow-2xl z-[9999] overflow-hidden"
          style={{
            top: `${dropdownInfo.y + 4}px`,
            left: `${dropdownInfo.x - 220}px`,
            width: "220px",
          }}
          onMouseLeave={() => setDropdownInfo(null)}
        >
          <div className="py-1">
            <button
              onClick={() => {
                const company = companies.find((c) => c.id === dropdownInfo.id);
                setSelectedCompany(company);
                setShowModuleConfig(true);
                setDropdownInfo(null);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-50"
            >
              <Settings className="w-4 h-4" />
              Configure Modules
            </button>

            <button
              onClick={() => {
                const company = companies.find((c) => c.id === dropdownInfo.id);
                handleToggleStatus(company);
                setDropdownInfo(null);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-50"
            >
              {companies.find((c) => c.id === dropdownInfo.id)?.status === "active" ? (
                <>
                  <Power className="w-4 h-4 text-amber-600" />
                  Suspend Access
                </>
              ) : (
                <>
                  <RefreshCcw className="w-4 h-4 text-green-600" />
                  Activate
                </>
              )}
            </button>

            <div className="h-px bg-gray-200 my-1" />

            <button
              onClick={() => {
                const company = companies.find((c) => c.id === dropdownInfo.id);
                askOffload(company);
                setDropdownInfo(null);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-50"
            >
              <Archive className="w-4 h-4 text-blue-600" />
              Offload Client (Archive)
            </button>

            <button
              onClick={() => {
                const company = companies.find((c) => c.id === dropdownInfo.id);
                askHardDelete(company);
                setDropdownInfo(null);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
              Delete Permanently
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Module Config Modal */}
      {showModuleConfig && selectedCompany && (
        <ModuleConfigModal
          company={selectedCompany}
          onClose={() => {
            setShowModuleConfig(false);
            setSelectedCompany(null);
          }}
          onSave={(enabled) => handleUpdateModules(selectedCompany.id, enabled)}
        />
      )}

      {/* Add Company Modal */}
      {showAddCompany && (
        <AddCompanyModal onClose={() => setShowAddCompany(false)} onSave={handleAddCompany} />
      )}

      {/* Confirm Dialog */}
      {confirm.show && (
        <ConfirmDialog
          {...confirm}
          onCancel={() => setConfirm((c) => ({ ...c, show: false }))}
        />
      )}
    </div>
  );
};

/* ----------------------- Small Components ----------------------- */

const AddCompanyModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    adminEmail: "",
    domain: "",
    employees: 0,
    moduleName: [],
    status: "active",
    plan: "Professional",
  });

  const toggleModule = (slug) => {
    setFormData((f) => ({
      ...f,
      moduleName: f.moduleName.includes(slug) ? f.moduleName.filter((m) => m !== slug) : [...f.moduleName, slug],
    }));
  };

  return (
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl border border-white/70 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white px-8 py-6 flex items-center space-x-4 shadow-lg">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-md">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Add New Company</h2>
          <p className="text-blue-100 text-sm">Onboard a new client organization</p>
        </div>
      </div>

      {/* BODY — scrollable */}
      <div className="p-6 space-y-6 overflow-y-auto">
        
        {/* Company Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            placeholder="e.g., Acme Corporation"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Admin Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
          <div className="relative">
            <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.adminEmail}
              onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
              placeholder="admin@company.com"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Domain */}
          <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Domain</label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              placeholder="company.hrms.com"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>


        {/* Employees */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Employees</label>
          <input
            type="number"
            value={formData.employees}
            onChange={(e) => setFormData({ ...formData, employees: Number(e.target.value) || 0 })}
            placeholder="50"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Subscription Plan */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Subscription Plan</label>
          <select
            value={formData.plan}
            onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="Professional">Professional</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Starter">Starter</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Account Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Modules */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Initial Modules
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modulesCatalog.map((m) => (
              <div
                key={m.slug}
                onClick={() => toggleModule(m.slug)}
                className={`p-4 border rounded-xl cursor-pointer transition-all backdrop-blur-sm
                  ${formData.moduleName.includes(m.slug)
                    ? "border-blue-500 bg-blue-50 shadow"
                    : "border-gray-300 hover:border-gray-400"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{m.icon}</span>
                    <span className="font-semibold text-sm">{m.name}</span>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition
                      ${formData.moduleName.includes(m.slug)
                        ? "bg-blue-500"
                        : "bg-gray-300"
                      }`}
                  >
                    {formData.moduleName.includes(m.slug) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-50 px-8 py-6 flex justify-end gap-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition font-semibold"
        >
          Cancel
        </button>

        <button
          onClick={() => onSave(formData)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-md hover:from-blue-700 hover:to-purple-700 transition font-semibold"
        >
          Create Company
        </button>
      </div>

    </div>
  </div>
);

};

const ModuleConfigModal = ({ company, onClose, onSave }) => {
  const [enabled, setEnabled] = useState(company.moduleName || []);

  const toggle = (slug) => {
    setEnabled((prev) => (prev.includes(slug) ? prev.filter((m) => m !== slug) : [...prev, slug]));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl font-bold">{company.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold">{company.clientName}</h2>
                <p className="text-blue-100 mt-1 flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Configure Modules & Features</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">Total Employees</p>
              <p className="text-2xl font-bold">{company.employees}</p>
            </div>
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-250px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modulesCatalog.map((m) => (
              <div
                key={m.slug}
                className={`group border-2 rounded-2xl p-6 cursor-pointer transition-all transform hover:scale-105 ${
                  enabled.includes(m.slug)
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
                onClick={() => toggle(m.slug)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${m.color} shadow-lg`}>
                    <span className="drop-shadow-sm">{m.icon}</span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      enabled.includes(m.slug) ? "bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg scale-110" : "bg-gray-200"
                    }`}
                  >
                    {enabled.includes(m.slug) && <Check className="w-5 h-5 text-white" />}
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{m.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{m.description}</p>
                {enabled.includes(m.slug) && (
                  <div className="mt-4 flex items-center space-x-2 text-xs text-blue-600 font-semibold">
                    <Zap className="w-4 h-4" />
                    <span>ACTIVE</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 flex justify-between items-center border-t">
          <div className="text-sm font-semibold text-gray-700">
            <span className="text-2xl text-blue-600">{enabled.length}</span>
            <span className="text-gray-500"> / {modulesCatalog.length} modules enabled</span>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-white font-semibold transition-all">
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(enabled);
                onClose();
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg transition-all flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfirmDialog = ({ show, title, subtitle, actionLabel, tone = "danger", onConfirm, onCancel }) => {
  if (!show) return null;
  const tones = {
    danger: { grad: "from-red-600 to-rose-600", ring: "ring-red-600/30", btn: "bg-red-600 hover:bg-red-700", icon: <Trash2 className="w-6 h-6" /> },
    warn: { grad: "from-amber-600 to-yellow-600", ring: "ring-amber-600/30", btn: "bg-amber-600 hover:bg-amber-700", icon: <Archive className="w-6 h-6" /> },
  };
  const t = tones[tone] || tones.danger;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className={`p-6 text-white bg-gradient-to-r ${t.grad}`}>
          <div className="flex items-center gap-3">
            {t.icon}
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="text-white/90 mt-2">{subtitle}</p>
        </div>
        <div className="p-6">
          <div className="flex justify-end gap-3">
            <button onClick={onCancel} className="px-5 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-medium">
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-5 py-3 ${t.btn} text-white rounded-xl font-semibold shadow-lg`}
            >
              {actionLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// tiny mail icon (keeps lucide imports small in this block)
const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" className={props.className} xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default Companies;