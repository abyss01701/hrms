import React, { useEffect, useState } from "react";
import { useHeader } from "../../../layout/HeaderContext";

import {
  Shield,
  KeyRound,
  Eye,
  EyeOff,
  Save,
  ShieldCheck,
  AlertTriangle,
  Lock,
  UserCog,
  Search,
} from "lucide-react";

// SIMPLE TOGGLE COMPONENT (Same style as Settings)
const ToggleSwitch = ({ enabled, setEnabled }) => (
  <div
    onClick={() => setEnabled(!enabled)}
    className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all ${
      enabled
        ? "bg-gradient-to-r from-blue-600 to-purple-600"
        : "bg-gray-400"
    }`}
  >
    <div
      className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all ${
        enabled ? "translate-x-7" : ""
      }`}
    />
  </div>
);

export default function SecurityPage() {
  const { setHeaderConfig } = useHeader();

  const [saving, setSaving] = useState(false);

  // MFA / Session / Password features
  const [forceMFA, setForceMFA] = useState(false);
  const [passwordExpiry, setPasswordExpiry] = useState(90);
  const [autoLogout, setAutoLogout] = useState(true);

  // ROLES & PERMISSIONS (example)
  const [roles, setRoles] = useState([
    { name: "Super Admin", permissions: ["ALL"], protected: true },
    { name: "Manager", permissions: ["VIEW", "EDIT"] },
    { name: "Viewer", permissions: ["VIEW"] },
  ]);

  // AUDIT LOGS (example static logs)
  const auditLogs = [
    { id: 1, action: "Logged in", user: "admin@hr.com", time: "2 mins ago" },
    { id: 2, action: "Updated role permissions", user: "superadmin", time: "1 hour ago" },
    { id: 3, action: "Viewed tenant details", user: "jane@corp.com", time: "Yesterday" },
  ];

  // ------ HEADER CONFIG ------
  useEffect(() => {
    setHeaderConfig({
      title: "Security Center",
      subtitle: "Manage system roles, authentication policies and audit logs",
      button: {
        label: saving ? "Saving…" : "Save Changes",
        icon: Save,
        onClick: handleSave,
      },
    });
  }, [saving]);

  async function handleSave() {
    setSaving(true);
    await new Promise((res) => setTimeout(res, 1000)); // mock API call
    setSaving(false);
    alert("Security settings updated successfully!");
  }

  // UI BUILDERS
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
      <span className="font-medium text-gray-700">{label}</span>
      {children}
    </div>
  );

  return (
    <div className="space-y-10">

      {/* AUTHENTICATION POLICIES */}
      <Section title="Authentication & Policies" icon={Shield}>
        <Row label="Force Multi-Factor Authentication (MFA)">
          <ToggleSwitch enabled={forceMFA} setEnabled={setForceMFA} />
        </Row>

        <Row label="Auto logout inactive users">
          <ToggleSwitch enabled={autoLogout} setEnabled={setAutoLogout} />
        </Row>

        <Row label="Password Expiry (days)">
          <input
            type="number"
            value={passwordExpiry}
            onChange={(e) => setPasswordExpiry(Number(e.target.value))}
            className="w-24 px-3 py-1.5 border border-gray-300 rounded-xl shadow-sm"
          />
        </Row>
      </Section>

      {/* ROLE MANAGEMENT */}
      <Section title="Role Management" icon={UserCog}>
        <div className="space-y-4">

          {roles.map((role, idx) => (
            <div
              key={idx}
              className="p-4 bg-white/70 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {role.name}
                    {role.protected && (
                      <span className="ml-2 text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded-md">
                        Protected
                      </span>
                    )}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {role.permissions.includes("ALL")
                      ? "Full system access"
                      : `Permissions: ${role.permissions.join(", ")}`}
                  </p>
                </div>

                {!role.protected && (
                  <button
                    onClick={() => alert("Edit roles coming soon")}
                    className="px-4 py-2 text-sm bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-all"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}

        </div>
      </Section>

      {/* AUDIT LOGS */}
      <Section title="Audit Logs" icon={Eye}>
        <div className="space-y-3">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 bg-white/70 border border-gray-200 rounded-xl shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-gray-900 font-semibold">{log.action}</p>
                <p className="text-gray-500 text-sm">
                  {log.user} • {log.time}
                </p>
              </div>
              <EyeOff className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </Section>

      {/* SECURITY WARNINGS */}
      <Section title="Security Warnings" icon={AlertTriangle}>
        <p className="text-gray-600">
          Everything looks stable. No critical threats detected.
        </p>
      </Section>

    </div>
  );
}
