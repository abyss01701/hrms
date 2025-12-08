import React, { useEffect, useState } from "react";
import { useHeader } from "../../../layout/HeaderContext";
import { modulesCatalog } from "../../../pages/SuperAdmin/module-category/moduleCatalog";
import {
  Package,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react";

export default function ModulesPage() {
  const { setHeaderConfig } = useHeader();

  // Dynamic module state
  const [modules, setModules] = useState(
    modulesCatalog.map((m) => ({ ...m, enabled: true }))
  );

  // Modal state
  const [selectedModule, setSelectedModule] = useState(null);

  // Header Config
  useEffect(() => {
    setHeaderConfig({
      title: "Module Management",
      subtitle: "Enable, configure, or view details of HR Portal modules",
      button: {
        label: "Add Module",
        icon: Plus,
        onClick: () => alert("Add Module — coming soon!"),
      },
    });
  }, []);

  // Toggle module
  const toggleModule = (slug) => {
    setModules((prev) =>
      prev.map((mod) =>
        mod.slug === slug ? { ...mod, enabled: !mod.enabled } : mod
      )
    );
  };

  return (
    <div className="space-y-8">

      {/* MODULE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <div
            key={mod.slug}
            className="bg-white/60 backdrop-blur-xl border border-gray-200 shadow-md rounded-2xl p-6 transition-all hover:shadow-xl hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${mod.color} flex items-center justify-center text-2xl`}
                >
                  {mod.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {mod.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{mod.description}</p>
                </div>
              </div>

              {/* Toggle */}
              <div
                onClick={() => toggleModule(mod.slug)}
                className={`cursor-pointer w-16 h-8 rounded-full p-1 flex items-center transition-all ${
                  mod.enabled
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-gray-400"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all ${
                    mod.enabled ? "translate-x-8" : ""
                  }`}
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              {/* Status */}
              <div className="flex items-center gap-2 text-sm">
                {mod.enabled ? (
                  <>
                    <CheckCircle2 className="text-green-600 w-4 h-4" />
                    <span className="text-green-700">Enabled</span>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-600 w-4 h-4" />
                    <span className="text-red-700">Disabled</span>
                  </>
                )}
              </div>

              {/* Details Button */}
              <button
                onClick={() => setSelectedModule(mod)}
                className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
              >
                Details
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DETAILS MODAL */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-xl shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-transparent">
              {selectedModule.name}
            </h2>
            <p className="text-gray-600">{selectedModule.description}</p>

            <div className="space-y-3">
              <p className="font-semibold text-gray-900">Key Features:</p>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                {selectedModule.features?.map((f, i) => (
                  <li key={i}>{f}</li>
                )) || (
                  <li className="italic text-gray-500">
                    No feature list provided
                  </li>
                )}
              </ul>
            </div>

            <div className="flex justify-end pt-4">
              <button
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all"
                onClick={() => setSelectedModule(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
