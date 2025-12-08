import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Topbar from "./components/Topbar";
import RecruitmentSidebar from "./components/RecruitmentSidebar";
import RecruitmentOverview from '../modules/recruitment/RecruitmentDashboard';

export function AppContent() {
  const location = useLocation();
  const isRecruitmentPage = location.pathname.startsWith('/recruitment');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <Topbar />
      
      {/* Show RecruitmentSidebar only on recruitment pages */}
      {isRecruitmentPage && <RecruitmentSidebar />}
      
      {/* Main Content - add left padding when sidebar is visible */}
      <div className={`relative z-10 pt-20 ${isRecruitmentPage ? 'pl-64' : ''}`}>
        <Routes>
          <Route path="/" element={<RecruitmentOverview/>} />
          <Route path="/recruitment" element={<RecruitmentOverview/>} />
          <Route path="/recruitment/jobs" element={<></>} />
          <Route path="/recruitment/pipeline" element={<></>} />
          <Route path="/recruitment/candidates" element={<></>} />
          <Route path="/recruitment/interviews" element={<></>} />
          <Route path="/recruitment/offers" element={<></>} />
          <Route path="/recruitment/configs" element={<></>} />
          <Route path="/onboarding" element={<></>} />
          <Route path="/employee" element={<></>} />
          <Route path="/attendance" element={<></>} />
          <Route path="/leave" element={<></>} />
          <Route path="/payroll" element={<></>} />
          <Route path="/performance" element={<></>} />
        </Routes>
      </div>
    </div>
  );
}
