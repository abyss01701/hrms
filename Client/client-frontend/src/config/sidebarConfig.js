import {
  LayoutDashboard,
  Briefcase,
  GitBranch,
  Users,
  CalendarCheck,
  FileCheck,
  Settings2,
  ClipboardList,
  UserCheck,
} from "lucide-react";

export const sidebarModules = {
  overview: {
    title: "Overview",
    subtitle: "System Highlights",

    menu: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/overview" },
      { name: "Reports", icon: ClipboardList, path: "/overview/reports" },
      { name: "Configs", icon: Settings2, path: "/overview/settings" },
    ],

    stats: [
      {
        label: "Modules Active",
        key: "activeModules",
        progressColor: "bg-gradient-to-r from-green-500 to-teal-500",
      },
      {
        label: "Users",
        key: "users",
        progressColor: "bg-gradient-to-r from-blue-500 to-purple-500",
      },
    ],
  },

  recruitment: {
    title: "Recruitment",
    subtitle: "Hiring Management",

    menu: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/recruitment" },
      { name: "Jobs", icon: Briefcase, path: "/recruitment/jobs" },
      { name: "Pipeline", icon: GitBranch, path: "/recruitment/pipeline" },
      { name: "Candidates", icon: Users, path: "/recruitment/candidates" },
      { name: "Interviews", icon: CalendarCheck, path: "/recruitment/interviews" },
      { name: "Offers", icon: FileCheck, path: "/recruitment/offers" },
      { name: "Configs", icon: Settings2, path: "/recruitment/configs" },
    ],

    stats: [
      {
        label: "Active Jobs",
        key: "activeJobs",
        progressColor: "bg-gradient-to-r from-cyan-500 to-blue-500",
      },
      {
        label: "Candidates",
        key: "candidates",
        progressColor: "bg-gradient-to-r from-blue-500 to-purple-500",
      },
    ],
  },

  onboarding: {
    title: "Onboarding",
    subtitle: "Employee Integration",

    menu: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/onboarding" },
      { name: "Tasks", icon: UserCheck, path: "/onboarding/tasks" },
      { name: "Documents", icon: FileCheck, path: "/onboarding/docs" },
      { name: "Configs", icon: Settings2, path: "/onboarding/configs" },
    ],

    stats: [
      {
        label: "Completed Onboarding",
        key: "completed",
        progressColor: "bg-gradient-to-r from-green-500 to-teal-500",
      },
      {
        label: "Pending Tasks",
        key: "pending",
        progressColor: "bg-gradient-to-r from-orange-500 to-red-500",
      },
    ],
  },
};
