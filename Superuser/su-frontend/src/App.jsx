import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import SuperAdminLayout from "./pages/SuperAdmin/modules/SuperAdminLayout";

import Companies from "./pages/SuperAdmin/modules/Companies";
import AdminUsers from "./pages/SuperAdmin/modules/AdminUsers";
import ModulesPage from "./pages/SuperAdmin/modules/Modules";
import AnalyticsPage from "./pages/SuperAdmin/modules/Analytics";
import SecurityPage from "./pages/SuperAdmin/modules/Security";
import SettingsPage from "./pages/SuperAdmin/modules/Settings";
import SuperAdminWrapper from "./pages/SuperAdmin/modules/SuperAdminWrapper";
import LoginPage from "./components/Login/Login";

function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected SuperAdmin zone */}
      <Route element={<SuperAdminWrapper />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/superadmin" element={<SuperAdminLayout />}>
            <Route index element={<Navigate to="companies" />} />
            <Route path="companies" element={<Companies />} />
            <Route path="modules" element={<ModulesPage />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="security" element={<SecurityPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
      </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
