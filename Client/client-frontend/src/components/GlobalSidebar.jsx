import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { sidebarModules } from "../config/sidebarConfig";

export default function GlobalSidebar({ moduleKey, metrics = {} }) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const moduleConfig = sidebarModules[moduleKey];

  if (!moduleConfig) return null; // fail safe

  return (
    <div
      className={`fixed left-0 top-20 h-[calc(100vh-5rem)] bg-gradient-to-b from-gray-950/95 to-black/95 backdrop-blur-xl border-r border-gray-800 transition-all duration-300 z-40 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <ChevronRight
          className={`w-4 h-4 text-white transition-transform ${
            isCollapsed ? "" : "rotate-180"
          }`}
        />
      </button>

      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        {!isCollapsed && (
          <>
            <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {moduleConfig.title}
            </h3>
            {moduleConfig.subtitle && (
              <p className="text-xs text-gray-500 mt-1">{moduleConfig.subtitle}</p>
            )}
          </>
        )}
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2">
        {moduleConfig.menu.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                isActive
                  ? "bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30"
                  : "hover:bg-gray-800/50"
              }`}
              title={isCollapsed ? item.name : ""}
            >
              <Icon
                className={`w-5 h-5 relative z-10 ${
                  isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-gray-300"
                } ${isCollapsed ? "mx-auto" : ""}`}
              />

              {!isCollapsed && (
                <span
                  className={`relative z-10 text-sm ${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-gray-300"
                  }`}
                >
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Stats */}
      {!isCollapsed && moduleConfig.stats.length > 0 && (
        <div className="absolute bottom-6 left-4 right-4 space-y-3">
          {moduleConfig.stats.map((stat) => {
            const value = metrics[stat.key] ?? 0;
            const progress = metrics[stat.key + "_progress"] ?? 0;

            return (
              <div
                key={stat.key}
                className={`rounded-xl p-4 bg-gray-900/20 border border-gray-700/50`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">{stat.label}</span>
                  <span className="text-lg font-black text-cyan-400">{value}</span>
                </div>

                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${stat.progressColor}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
