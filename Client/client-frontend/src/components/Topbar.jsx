import React, { useState } from 'react';
import { LayoutDashboard, UserPlus, ClipboardCheck, Users, Calendar, Plane, DollarSign, TrendingUp, Bell, Settings, Sparkles } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoutAnimation from '../animations/LogoutAnimation'; // Import the animation

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutAnimation, setShowLogoutAnimation] = useState(false); // Add state

  const handleLogout = () => {
    setShowProfileMenu(false); // Close the menu
    setShowLogoutAnimation(true); // Show animation
  };

  const completeLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const menuItems = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'Recruitment', path: '/recruitment', icon: UserPlus },
    { name: 'Onboarding', path: '/onboarding', icon: ClipboardCheck },
    { name: 'Employee', path: '/employee', icon: Users },
    { name: 'Attendance', path: '/attendance', icon: Calendar },
    { name: 'Leave', path: '/leave', icon: Plane },
    { name: 'Payroll', path: '/payroll', icon: DollarSign },
    { name: 'Performance', path: '/performance', icon: TrendingUp }
  ];

  return (
    <>
      {/* Logout Animation Overlay */}
      {showLogoutAnimation && <LogoutAnimation onComplete={completeLogout} />}

      <div className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-b border-gray-800 z-50">
        <div className="h-full flex items-center justify-between px-6">
          
          {/* Logo - Left Side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                HRMS
              </h2>
              <p className="text-xs text-gray-500">Client Interface</p>
            </div>
          </div>

          {/* Navigation Menu - Center */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center max-w-4xl mx-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                             (item.path !== '/' && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30'
                      : 'hover:bg-gray-800/50'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-xl"></div>
                  )}

                  <Icon className={`w-4 h-4 relative z-10 ${
                    isActive ? 'text-purple-400' : 'text-gray-400 group-hover:text-gray-300'
                  }`} />

                  <span className={`relative z-10 text-sm font-medium ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                  }`}>
                    {item.name}
                  </span>

                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions - Right Side */}
          <div className="flex items-center gap-4 relative flex-shrink-0">

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-800/50 rounded-xl transition-all duration-300"
              >
                <Bell className="w-5 h-5 text-gray-400 hover:text-gray-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full border-2 border-gray-900"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 shadow-2xl shadow-purple-500/10 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="font-bold text-white">Notifications</h3>
                    <p className="text-xs text-gray-400">You have 3 unread messages</p>
                  </div>
                  {/* Notification items */}
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 hover:bg-gray-800/50 rounded-xl transition-all duration-300">
              <Settings className="w-5 h-5 text-gray-400 hover:text-gray-300" />
            </button>

            {/* Avatar */}
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="relative w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center font-bold text-sm hover:scale-110 transition-transform duration-300"
            >
              HR
            </button>

            {/* Profile dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-14 w-56 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 shadow-2xl shadow-purple-500/10 overflow-hidden z-50">
                  
                <div className="p-4 border-b border-gray-800">
                  <p className="font-bold text-white">Akshat Newal</p>
                  <p className="text-xs text-gray-500">HR Manager</p>
                </div>

                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/40 transition"
                >
                  View Profile
                </Link>

                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/40 transition"
                >
                  Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
                >
                  Logout
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;