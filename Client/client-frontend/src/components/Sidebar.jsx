import React, { useState } from 'react';
import { LayoutDashboard, Briefcase, GitBranch, Users, CalendarCheck, FileCheck, Settings2, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const RecruitmentSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/recruitment', icon: LayoutDashboard },
    { name: 'Jobs', path: '/recruitment/jobs', icon: Briefcase },
    { name: 'Pipeline', path: '/recruitment/pipeline', icon: GitBranch },
    { name: 'Candidates', path: '/recruitment/candidates', icon: Users },
    { name: 'Interviews', path: '/recruitment/interviews', icon: CalendarCheck },
    { name: 'Offers', path: '/recruitment/offers', icon: FileCheck },
    { name: 'Configs', path: '/recruitment/configs', icon: Settings2 }
  ];

  return (
    <div className={`fixed left-0 top-20 h-[calc(100vh-5rem)] bg-gradient-to-b from-gray-950/95 to-black/95 backdrop-blur-xl border-r border-gray-800 transition-all duration-300 z-40 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform duration-300"
      >
        <ChevronRight className={`w-4 h-4 text-white transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} />
      </button>

      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-800">
        {!isCollapsed && (
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Recruitment
            </h3>
            <p className="text-xs text-gray-500 mt-1">Hiring Management</p>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30'
                  : 'hover:bg-gray-800/50'
              }`}
              title={isCollapsed ? item.name : ''}
            >
              {/* Glow effect for active item */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 blur-xl"></div>
              )}
              
              <Icon className={`w-5 h-5 relative z-10 transition-colors ${
                isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-gray-300'
              } ${isCollapsed ? 'mx-auto' : ''}`} />
              
              {!isCollapsed && (
                <span className={`relative z-10 text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                }`}>
                  {item.name}
                </span>
              )}

              {/* Active indicator */}
              {isActive && !isCollapsed && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-r-full"></div>
              )}

              {/* Dot indicator when collapsed */}
              {isActive && isCollapsed && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Stats */}
      {!isCollapsed && (
        <div className="absolute bottom-6 left-4 right-4 space-y-3">
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-xl p-4 border border-cyan-800/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Active Jobs</span>
              <span className="text-lg font-black text-cyan-400">24</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full" style={{width: '65%'}}></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-4 border border-blue-800/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Candidates</span>
              <span className="text-lg font-black text-blue-400">156</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style={{width: '82%'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruitmentSidebar;