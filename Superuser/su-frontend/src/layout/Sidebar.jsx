// src/components/SuperAdmin/Layout/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  Users,
  User,
  Shield,
  Settings,
  BarChart3,
  Package,
  Lock,
  ChevronDown,
  Power,
  Zap,
} from "lucide-react";

const navigationItems = [
  { id: "companies", label: "Companies", icon: Building2, color: "from-blue-500 to-cyan-500", path: "/superadmin/companies" },
  { id: "modules", label: "Modules", icon: Package, color: "from-purple-500 to-pink-500", path: "/superadmin/modules" },
  { id: "users", label: "Users", icon: Users, color: "from-green-500 to-emerald-500", path: "/superadmin/users" },
  { id: "security", label: "Security", icon: Lock, color: "from-red-500 to-orange-500", path: "/superadmin/security" },
  { id: "analytics", label: "Analytics", icon: BarChart3, color: "from-yellow-500 to-orange-500", path: "/superadmin/analytics" },
  { id: "settings", label: "Settings", icon: Settings, color: "from-gray-500 to-gray-600", path: "/superadmin/settings" },
];

export const Sidebar = ({ onLogout }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Determine if sidebar item is active
  const isActive = (path) => pathname.startsWith(path);

  return (
    <div className="w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col shadow-2xl">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              HR Portal
            </h1>
            <p className="text-xs text-gray-400 flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>Super Admin</span>
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all group
                  ${
                    isActive(item.path)
                      ? `bg-gradient-to-r ${item.color} shadow-lg transform scale-105`
                      : "text-gray-300 hover:bg-gray-800/50"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive(item.path)
                      ? ""
                      : "group-hover:scale-110 transition-transform"
                  }`}
                />
                <span className="font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Profile Menu */}
      <div className="p-4 border-t border-gray-700/50 relative">
        <button
          onClick={() => setProfileMenuOpen((p) => !p)}
          className="flex items-center space-x-3 bg-gray-800/50 rounded-xl p-4 w-full hover:bg-gray-700/60 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg">
            SA
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-sm">Super Admin</p>
            <p className="text-xs text-gray-400">super@hrms.com</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        {profileMenuOpen && (
          <div
            className="absolute bottom-20 left-4 w-60 bg-white border border-gray-200 rounded-xl shadow-2xl z-[9999] overflow-hidden"
          >
            <button
              onClick={() => {
                alert("Profile View coming soon");
                setProfileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-2"
            >
              <User className="w-4 h-4 text-blue-600" /> View Profile
            </button>

            <button
              onClick={() => {
                onLogout?.();
                setProfileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-semibold flex items-center gap-2"
            >
              <Power className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
