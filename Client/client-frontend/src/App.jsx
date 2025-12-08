// src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";

import Topbar from "./components/Topbar";
import GlobalSidebar from "./components/GlobalSidebar";
import RecruitmentOverview from "./modules/recruitment/RecruitmentDashboard";
import Jobs from "./modules/recruitment/Jobs";
import Pipeline from "./modules/recruitment/Pipeline";
import Candidates from "./modules/recruitment/Candidates";
import Interviews from "./modules/recruitment/Interviews";
import Offers from "./modules/recruitment/Offers";
import Configs from "./modules/recruitment/Configs";
import OnboardingDashboard from "./modules/onboarding/OnboardingDashboard";
import LoginPage from "./components/Login";

// Simple placeholder pages for now
const SimplePage = ({ title }) => (
  <div className="px-6 py-8">
    <h1 className="text-white text-4xl">{title}</h1>
  </div>
);

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const isLoginPage = location.pathname === "/login";

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoginPage, navigate]);

  const resolveModule = () => {
    if (location.pathname.startsWith("/recruitment")) return "recruitment";
    if (location.pathname.startsWith("/onboarding")) return "onboarding";
    if (location.pathname.startsWith("/payroll")) return "payroll";
    if (location.pathname.startsWith("/employee")) return "employee";
    if (location.pathname === "/" || location.pathname.startsWith("/overview"))
      return "overview";

    return null; // pages where sidebar shouldn't show
  };

  const moduleMetrics = {
    recruitment: {
      activeJobs: 24,
      activeJobs_progress: 65,
      candidates: 156,
      candidates_progress: 82,
    },
    onboarding: {
      completed: 42,
      completed_progress: 70,
      pending: 13,
      pending_progress: 45,
    },
    overview: {
      activeModules: 6,
      activeModules_progress: 90,
      users: 3200,
      users_progress: 75,
    },
  };

  const activeModule = resolveModule();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/3 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Top navigation - Only show when authenticated and not on login page */}
      {isAuthenticated && !isLoginPage && <Topbar />}

      {/* Sidebar - Only show when authenticated, not on login page, and module is active */}
      {isAuthenticated && !isLoginPage && activeModule && (
        <GlobalSidebar
          moduleKey={activeModule}
          metrics={moduleMetrics[activeModule]}
        />
      )}

      {/* Main content */}
      <main
        className={`relative z-10 ${
          isAuthenticated && !isLoginPage ? "pt-20" : "pt-0"
        } ${
          isAuthenticated && !isLoginPage && activeModule ? "pl-64" : ""
        }`}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Overview/Home */}
          <Route path="/" element={<SimplePage title="Overview Page" />} />

          {/* Recruitment Module */}
          <Route path="/recruitment" element={<RecruitmentOverview />} />
          <Route path="/recruitment/jobs" element={<Jobs />} />
          <Route path="/recruitment/pipeline" element={<Pipeline />} />
          <Route path="/recruitment/candidates" element={<Candidates />} />
          <Route path="/recruitment/interviews" element={<Interviews />} />
          <Route path="/recruitment/offers" element={<Offers />} />
          <Route path="/recruitment/configs" element={<Configs />} />

          {/* Onboarding Module */}
          <Route path="/onboarding" element={<OnboardingDashboard />} />

          {/* Other modules - placeholders */}
          <Route path="/employee" element={<SimplePage title="Employee Page" />} />
          <Route path="/attendance" element={<SimplePage title="Attendance Page" />} />
          <Route path="/leave" element={<SimplePage title="Leave Page" />} />
          <Route path="/payroll" element={<SimplePage title="Payroll Page" />} />
          <Route path="/performance" element={<SimplePage title="Performance Page" />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;