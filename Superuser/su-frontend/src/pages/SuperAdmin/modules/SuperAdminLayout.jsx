import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../../../layout/Sidebar";
import Header from "../../../layout/Header";
import { HeaderProvider } from "../../../layout/HeaderContext";
import { logoutUser } from "../../../services/authServices";
import LogoutAnimation from "../animations/LogoutAnimation";

const SuperAdminLayout = () => {  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
 
  const handleLogout = () => {
  setIsLoggingOut(true);   // show animation
  };

  const handleLogoutAnimationComplete = async () => {
  await logoutUser();
  localStorage.removeItem("accessToken");
  navigate("/login");
};
  return (
    <HeaderProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
        
        {isLoggingOut && (
  <LogoutAnimation 
    darkMode={false}
    onComplete={handleLogoutAnimationComplete}
  />
)}    
        <Sidebar onLogout={handleLogout}/>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>

      </div>
    </HeaderProvider>
  );
};

export default SuperAdminLayout;
