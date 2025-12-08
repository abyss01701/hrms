import React, { useEffect, useState } from "react";
import { UserPlus, CheckCircle, ClipboardList, Loader2, ArrowRight } from "lucide-react";

export default function OnboardingDashboard() {
  // Example dynamic values — replace with API call later
  const [metrics, setMetrics] = useState({
    completed: 42,
    pending: 13,
    inProgress: 18,
  });

  const pendingTasks = [
    { id: 1, name: "Document upload", assignedTo: "John Deo", due: "Today" },
    { id: 2, name: "Contract signing", assignedTo: "Sarah Lee", due: "Tomorrow" },
    { id: 3, name: "Laptop provisioning", assignedTo: "Iris Kumar", due: "Friday" },
  ];

  return (
    <div className="px-6 pt-6 pb-12 space-y-10 relative z-10">
      
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-black bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
          Onboarding Overview
        </h1>
        <p className="text-gray-400 mt-1">
          Track employee onboarding progress and pending activities
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Completed */}
        <div className="bg-gradient-to-br from-green-900/20 to-teal-900/20 rounded-xl p-6 border border-green-800/40">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Completed</span>
            <CheckCircle className="h-6 w-6 text-teal-400" />
          </div>

          <h2 className="text-4xl font-black text-teal-400 mt-2">
            {metrics.completed}
          </h2>

          <div className="mt-4 h-2 w-full bg-gray-800 rounded-full">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-green-500"
              style={{ width: `${(metrics.completed / (metrics.completed + metrics.pending + metrics.inProgress)) * 100}%` }}
            />
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-800/40">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">In Progress</span>
            <Loader2 className="h-6 w-6 text-blue-400" />
          </div>

          <h2 className="text-4xl font-black text-blue-400 mt-2">
            {metrics.inProgress}
          </h2>

          <div className="mt-4 h-2 w-full bg-gray-800 rounded-full">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${(metrics.inProgress / (metrics.completed + metrics.pending + metrics.inProgress)) * 100}%` }}
            />
          </div>
        </div>

        {/* Pending */}
        <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-xl p-6 border border-orange-800/40">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Pending</span>
            <ClipboardList className="h-6 w-6 text-orange-400" />
          </div>

          <h2 className="text-4xl font-black text-orange-400 mt-2">
            {metrics.pending}
          </h2>

          <div className="mt-4 h-2 w-full bg-gray-800 rounded-full">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
              style={{ width: `${(metrics.pending / (metrics.completed + metrics.pending + metrics.inProgress)) * 100}%` }}
            />
          </div>
        </div>

      </div>

      {/* Pending Tasks */}
      <div className="bg-gradient-to-br from-gray-900/40 to-gray-950/60 border border-gray-800/60 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Pending Task Queue</h3>

        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between bg-gray-800/40 p-4 rounded-lg border border-gray-700/50 hover:bg-gray-700/40 transition"
            >
              <div>
                <p className="text-gray-300 font-medium">{task.name}</p>
                <p className="text-xs text-gray-500">
                  Assigned to {task.assignedTo} · Due {task.due}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action */}
      <button
        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl font-semibold text-black hover:opacity-90 transition flex items-center gap-2 shadow-lg"
      >
        <UserPlus className="h-5 w-5" />
        Add New Onboarding
      </button>
    </div>
  );
}
