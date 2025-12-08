import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import LogoutAnimation from "../../SuperAdmin/animations/LogoutAnimation";
import { logoutUser } from "../../../services/authServices";

export default function SuperAdminWrapper() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [playLogoutAnimation, setPlayLogoutAnimation] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check token at mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  // Triggered by Sidebar
  const handleLogout = () => {
    setPlayLogoutAnimation(true);
  };

  const handleLogoutAnimationComplete = async () => {
    await logoutUser();
    localStorage.removeItem("accessToken");
    setPlayLogoutAnimation(false);
    setIsAuthenticated(false);
    navigate("/login");
  };

  if (loading) return null;

  return (
    <>
      {/* LOGOUT ANIMATION */}
      {playLogoutAnimation && (
        <LogoutAnimation
          darkMode={false}
          onComplete={handleLogoutAnimationComplete}
        />
      )}

      {/* If not authenticated and not animating → go login */}
      {!isAuthenticated && !playLogoutAnimation && navigate("/login")}

      {/* MAIN SUPER ADMIN LAYOUT */}
      {isAuthenticated && !playLogoutAnimation && (
        <Outlet context={{ onLogout: handleLogout }} />
      )}
    </>
  );
}
