import React, { useEffect, useState } from "react";
import { useHeader } from "../../../layout/HeaderContext";

import {
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  Cpu,
  LayoutDashboard,
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function AnalyticsPage() {
  const { setHeaderConfig } = useHeader();

  useEffect(() => {
    setHeaderConfig({
      title: "Analytics Dashboard",
      subtitle: "Usage insights and performance indicators",
      button: null,
    });
  }, []);

  // ------- DUMMY DATA (replace with backend later) ---------

  const stats = [
    {
      label: "Active Users",
      value: 124,
      icon: Users,
      color: "from-purple-500 to-purple-700",
    },
    {
      label: "Active Companies",
      value: 14,
      icon: Building2,
      color: "from-blue-500 to-blue-700",
    },
    {
      label: "Modules Enabled",
      value: 38,
      icon: LayoutDashboard,
      color: "from-green-500 to-emerald-600",
    },
    {
      label: "System Health",
      value: "99.2%",
      icon: Cpu,
      color: "from-orange-500 to-red-500",
    },
  ];

  const growthData = [
    { month: "Jan", users: 80 },
    { month: "Feb", users: 90 },
    { month: "Mar", users: 120 },
    { month: "Apr", users: 140 },
    { month: "May", users: 160 },
    { month: "Jun", users: 180 },
  ];

  const moduleUsage = [
    { name: "Recruitment", usage: 120 },
    { name: "Attendance", usage: 95 },
    { name: "Leave", usage: 75 },
    { name: "Performance", usage: 55 },
    { name: "Reports", usage: 45 },
  ];

  const companyDistribution = [
    { name: "Small", value: 35 },
    { name: "Medium", value: 45 },
    { name: "Enterprise", value: 20 },
  ];

  const chartColors = ["#6366F1", "#10B981", "#F59E0B"];

  // ---------------------------------------------------------

  return (
    <div className="space-y-10">
      
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{item.label}</p>
                <p className="text-3xl font-bold mt-2">{item.value}</p>
              </div>
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color} text-white`}
              >
                <item.icon className="w-7 h-7" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LINE CHART SECTION */}
      <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-700" />
          User Growth Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#7C3AED"
              strokeWidth={3}
              dot={{ stroke: "#7C3AED", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-700" />
          Module Usage Frequency
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={moduleUsage}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="usage" fill="#3B82F6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART */}
      <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <PieChart className="w-6 h-6 text-yellow-700" />
          Company Category Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={companyDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {companyDistribution.map((_, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
