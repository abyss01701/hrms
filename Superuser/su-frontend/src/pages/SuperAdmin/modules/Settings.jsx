import React, { useEffect, useState } from "react";
import { useHeader } from "../../../layout/HeaderContext";
import {
  Settings as SettingsIcon,
  Save,
  SlidersHorizontal,
  Bell,
  Shield,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";

export default function SettingsPage() {
  const { setHeaderConfig } = useHeader();

  // ---------- PAGE-LEVEL SETTINGS ----------
  const [darkMode, setDarkMode] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(30); // minutes

  const [saving, setSaving] = useState(false);

  // ---------- HEADER CONFIG ----------
  useEffect(() => {
    setHeaderConfig({
      title: "System Settings",
      subtitle: "Control global preferences and configurations",
      button: {
        label: saving ? "Saving..." : "Save Settings",
        icon: Save,
        onClick: handleSave,
      },
    });
  }, [saving]);

  // ---------- SAVE HANDLER ----------
  async function handleSave() {
    setSaving(true);

    // Simulate API call
    await new Promise((res) => setTimeout(res, 1200));

    setSaving(false);
    alert("Settings updated successfully.");
  }

  // ---------- REUSABLE UI COMPONENTS ----------
  const ToggleSwitch = ({ enabled, setEnabled }) => (
    <div
      onClick={() => setEnabled(!enabled)}
      className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all ${
        enabled ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gray-400"
      }`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all ${
          enabled ? "translate-x-7" : ""
        }`}
      />
    </div>
  );

  // UI Wrappers
  const Section = ({ title, icon: Icon, children }) => (
    <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6 text-gray-700" />
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-between">
      <span className="text-gray-700 font-medium">{label}</span>
      {children}
    </div>
  );

  return (
    <div className="space-y-8">

      {/* SYSTEM INFO SECTION */}
      <Section title="System Information" icon={SettingsIcon}>
        <Row label="Application Version">
          <span className="text-gray-600">v1.0.0</span>
        </Row>
        <Row label="Environment">
          <span className="text-gray-600">Production</span>
        </Row>
        <Row label="Maintenance Mode">
          <ToggleSwitch enabled={maintenance} setEnabled={setMaintenance} />
        </Row>
      </Section>

      {/* APPEARANCE */}
      <Section title="Appearance" icon={Monitor}>
        <Row label="Theme Mode">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(false)}
              className={`px-4 py-2 rounded-xl border font-medium flex items-center gap-2 transition-all ${
                !darkMode
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Sun className="w-4 h-4" /> Light
            </button>
            <button
              onClick={() => setDarkMode(true)}
              className={`px-4 py-2 rounded-xl border font-medium flex items-center gap-2 transition-all ${
                darkMode
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Moon className="w-4 h-4" /> Dark
            </button>
          </div>
        </Row>
      </Section>

      {/* SECURITY */}
      <Section title="Security" icon={Shield}>
        <Row label="Session Timeout (minutes)">
          <input
            type="number"
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(Number(e.target.value))}
            className="w-24 px-3 py-1.5 border border-gray-300 rounded-xl text-gray-700 shadow-sm"
          />
        </Row>
        <Row label="Force MFA (coming soon)">
          <span className="text-gray-500 italic">Not available yet</span>
        </Row>
      </Section>

      {/* NOTIFICATIONS */}
      <Section title="Notifications" icon={Bell}>
        <Row label="Email Notifications">
          <ToggleSwitch
            enabled={emailNotifications}
            setEnabled={setEmailNotifications}
          />
        </Row>
        <Row label="System Alerts">
          <span className="text-gray-500 italic">Coming soon…</span>
        </Row>
      </Section>

      {/* ADVANCED */}
      <Section title="Advanced Settings" icon={SlidersHorizontal}>
        <Row label="Developer Logging">
          <span className="text-gray-500 italic">Disabled (internal use)</span>
        </Row>
        <Row label="Database Region">
          <span className="text-gray-600">Auto</span>
        </Row>
      </Section>

    </div>
  );
}
