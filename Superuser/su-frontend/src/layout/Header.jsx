import React from "react";
import { Plus } from "lucide-react";
import { useHeader } from "../layout/HeaderContext";

export const Header = () => {
  const { headerConfig } = useHeader();

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-8 py-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            {headerConfig.title ?? "Dashboard"}
          </h2>

          <p className="text-gray-600 mt-2 flex items-center space-x-2">
            <span>{headerConfig.subtitle ?? ""}</span>
          </p>
        </div>

        {/* Dynamic button */}
        {headerConfig.button && (
          <button
            onClick={headerConfig.button.onClick}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            {headerConfig.button.icon ? (
              <headerConfig.button.icon className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            <span>{headerConfig.button.label}</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
