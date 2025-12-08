import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Users, Calendar, FileCheck, Clock, TrendingUp, TrendingDown, 
  Eye, ChevronRight, Star, AlertCircle, Sparkles, Plus, Mail, 
  Target, Award, Zap, Activity, Bell
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RecruitmentOverview = () => {
  const [activeMetric, setActiveMetric] = useState(null);

  // KPI Data
  const kpiData = [
    { 
      label: 'Open Jobs', 
      value: '12', 
      subtitle: 'Active Openings',
      change: '+3',
      trend: 'up',
      icon: Briefcase,
      color: 'from-cyan-600 to-blue-600'
    },
    { 
      label: 'Candidates', 
      value: '256', 
      subtitle: 'In Pipeline',
      change: '+18',
      trend: 'up',
      icon: Users,
      color: 'from-purple-600 to-pink-600'
    },
    { 
      label: 'Interviews', 
      value: '14', 
      subtitle: 'This Week',
      change: '+4',
      trend: 'up',
      icon: Calendar,
      color: 'from-orange-600 to-red-600'
    },
    { 
      label: 'Pending Offers', 
      value: '3', 
      subtitle: 'Awaiting Reply',
      change: '0',
      trend: 'neutral',
      icon: FileCheck,
      color: 'from-green-600 to-emerald-600'
    },
    { 
      label: 'Time-to-Hire', 
      value: '18', 
      subtitle: 'Days Average',
      change: '-2',
      trend: 'up',
      icon: Clock,
      color: 'from-blue-600 to-cyan-600'
    },
    { 
      label: 'Acceptance Rate', 
      value: '67%', 
      subtitle: 'Offer Success',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-pink-600 to-purple-600'
    }
  ];

  // Funnel Data
  const funnelData = [
    { stage: 'Applied', candidates: 256, fill: '#06b6d4' },
    { stage: 'Screening', candidates: 145, fill: '#3b82f6' },
    { stage: 'Shortlisted', candidates: 78, fill: '#8b5cf6' },
    { stage: 'Interview', candidates: 34, fill: '#ec4899' },
    { stage: 'Offer', candidates: 12, fill: '#f97316' },
    { stage: 'Hired', candidates: 8, fill: '#10b981' }
  ];

  // Hiring Velocity Data
  const velocityData = [
    { month: 'Jan', screening: 5, interview: 8, offer: 3 },
    { month: 'Feb', screening: 4, interview: 7, offer: 4 },
    { month: 'Mar', screening: 6, interview: 9, offer: 5 },
    { month: 'Apr', screening: 5, interview: 6, offer: 3 },
    { month: 'May', screening: 4, interview: 8, offer: 4 },
    { month: 'Jun', screening: 3, interview: 7, offer: 2 }
  ];

  // Source Analytics
  const sourceData = [
    { name: 'LinkedIn', value: 35, color: '#0077b5' },
    { name: 'Company Site', value: 28, color: '#8b5cf6' },
    { name: 'Referrals', value: 22, color: '#10b981' },
    { name: 'Job Boards', value: 15, color: '#f59e0b' }
  ];

  // Department Data
  const departmentData = [
    { dept: 'IT', openJobs: 5, candidates: 89 },
    { dept: 'Marketing', openJobs: 3, candidates: 45 },
    { dept: 'Customer Service', openJobs: 2, candidates: 67 },
    { dept: 'Finance', openJobs: 1, candidates: 34 },
    { dept: 'HR', openJobs: 1, candidates: 21 }
  ];

  // Open Jobs
  const openJobs = [
    { 
      title: 'Senior Frontend Developer', 
      dept: 'Engineering', 
      applicants: 45, 
      progress: 65,
      stages: { screening: 12, interview: 8, offer: 2 },
      priority: 'high',
      manager: 'JD'
    },
    { 
      title: 'Marketing Manager', 
      dept: 'Marketing', 
      applicants: 32, 
      progress: 45,
      stages: { screening: 8, interview: 5, offer: 1 },
      priority: 'normal',
      manager: 'SK'
    },
    { 
      title: 'Data Analyst', 
      dept: 'Analytics', 
      applicants: 28, 
      progress: 35,
      stages: { screening: 10, interview: 3, offer: 0 },
      priority: 'high',
      manager: 'MP'
    }
  ];

  // Upcoming Interviews
  const upcomingInterviews = [
    { candidate: 'Sarah Chen', role: 'Frontend Dev', time: 'Today 2:00 PM', type: 'technical', interviewer: 'John D.', status: 'confirmed' },
    { candidate: 'Michael Ross', role: 'Marketing Mgr', time: 'Today 4:30 PM', type: 'hr', interviewer: 'Lisa M.', status: 'confirmed' },
    { candidate: 'Emma Wilson', role: 'Data Analyst', time: 'Tomorrow 10:00 AM', type: 'screening', interviewer: 'Alex K.', status: 'pending' },
    { candidate: 'David Park', role: 'Frontend Dev', time: 'Tomorrow 3:00 PM', type: 'technical', interviewer: 'John D.', status: 'confirmed' }
  ];

  // Recent Activity
  const recentActivity = [
    { type: 'application', text: 'New application for Senior Frontend Developer', user: 'Sarah Chen', time: '5 mins ago' },
    { type: 'stage', text: 'Moved to Interview stage', user: 'Michael Ross', time: '1 hour ago' },
    { type: 'interview', text: 'Interview scheduled', user: 'Emma Wilson', time: '2 hours ago' },
    { type: 'offer', text: 'Offer sent', user: 'David Park', time: '3 hours ago' }
  ];

  // Top Candidates
  const topCandidates = [
    { 
      name: 'Sarah Chen', 
      role: 'Senior Frontend Dev', 
      score: 95, 
      tags: ['React Expert', '8 yrs exp', 'Team Lead'],
      strength: 'Outstanding React expertise and proven leadership in agile teams'
    },
    { 
      name: 'Michael Ross', 
      role: 'Marketing Manager', 
      score: 92, 
      tags: ['SEO Master', 'Growth Hacker', '6 yrs exp'],
      strength: 'Exceptional growth marketing skills with proven ROI improvements'
    },
    { 
      name: 'Emma Wilson', 
      role: 'Data Analyst', 
      score: 88, 
      tags: ['Python', 'SQL', 'ML'],
      strength: 'Strong analytical capabilities with machine learning experience'
    }
  ];

  // Bottlenecks
  const bottlenecks = [
    { issue: 'Interview feedback pending for 7 candidates', severity: 'high', icon: AlertCircle },
    { issue: 'Shortlist stage taking 5 days longer than normal', severity: 'medium', icon: Clock },
    { issue: 'Offer acceptance rate dropped 15% this month', severity: 'high', icon: TrendingDown }
  ];

  const getInterviewTypeColor = (type) => {
    const colors = {
      screening: 'from-blue-500 to-blue-600',
      technical: 'from-orange-500 to-orange-600',
      hr: 'from-green-500 to-green-600'
    };
    return colors[type] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black mb-2">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Recruitment </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Overview</span>
          </h1>
          <p className="text-gray-400">Monitor your hiring pipeline and team performance</p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl transition-all duration-300 border border-gray-700">
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Send Bulk Email</span>
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-4 py-2 rounded-xl transition-all duration-300 font-bold shadow-lg shadow-cyan-500/50">
            <Plus className="w-4 h-4" />
            <span className="text-sm">New Job</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : null;
          
          return (
            <button
              key={idx}
              onClick={() => setActiveMetric(kpi.label)}
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-5 border border-gray-800 hover:border-gray-700 transition-all duration-300 group text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                {TrendIcon && (
                  <div className={`flex items-center gap-1 text-xs font-bold ${kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    <TrendIcon className="w-3 h-3" />
                    <span>{kpi.change}</span>
                  </div>
                )}
              </div>
              <h3 className="text-3xl font-black text-white mb-1">{kpi.value}</h3>
              <p className="text-xs text-gray-400">{kpi.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Funnel */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Pipeline Funnel</h2>
              <p className="text-sm text-gray-400">Candidate flow through stages</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {funnelData.map((stage, idx) => {
              const percentage = idx === 0 ? 100 : Math.round((stage.candidates / funnelData[0].candidates) * 100);
              const dropoff = idx > 0 ? funnelData[idx - 1].candidates - stage.candidates : 0;
              
              return (
                <div key={idx} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">{stage.stage}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-white">{stage.candidates}</span>
                      <span className="text-xs text-gray-500">({percentage}%)</span>
                    </div>
                  </div>
                  <div className="relative h-12 bg-gray-800 rounded-xl overflow-hidden">
                    <div 
                      className="absolute inset-0 rounded-xl transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        background: `linear-gradient(to right, ${stage.fill}, ${stage.fill}dd)`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center px-4">
                      {dropoff > 0 && (
                        <span className="ml-auto text-xs text-red-400 font-medium">-{dropoff}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Candidate Source */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-1">Candidate Sources</h2>
          <p className="text-sm text-gray-400 mb-6">Where candidates come from</p>
          
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2 mt-4">
            {sourceData.map((source, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                  <span className="text-sm text-gray-300">{source.name}</span>
                </div>
                <span className="text-sm font-bold text-white">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hiring Velocity & Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Velocity */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-1">Hiring Velocity</h2>
          <p className="text-sm text-gray-400 mb-6">Time spent per stage (days)</p>
          
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Line type="monotone" dataKey="screening" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} name="Screening" />
                <Line type="monotone" dataKey="interview" stroke="#F97316" strokeWidth={3} dot={{ r: 4 }} name="Interview" />
                <Line type="monotone" dataKey="offer" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} name="Offer" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-1">Department Breakdown</h2>
          <p className="text-sm text-gray-400 mb-6">Jobs and candidates by department</p>
          
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="dept" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Bar dataKey="openJobs" fill="#06B6D4" radius={[8, 8, 0, 0]} name="Open Jobs" />
                <Bar dataKey="candidates" fill="#8B5CF6" radius={[8, 8, 0, 0]} name="Candidates" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Open Jobs Grid */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Open Jobs</h2>
            <p className="text-sm text-gray-400">Active job openings</p>
          </div>
          <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {openJobs.map((job, idx) => (
            <div key={idx} className="bg-gray-800/30 rounded-xl p-5 hover:bg-gray-800/50 transition-all duration-300 border border-gray-700 hover:border-gray-600 group cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{job.title}</h3>
                    {job.priority === 'high' && <span className="text-sm">🔥</span>}
                  </div>
                  <p className="text-sm text-gray-400">{job.dept}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {job.manager}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
                <span>{job.applicants} applicants</span>
                <span>•</span>
                <span>{job.stages.interview} interviews</span>
              </div>

              <div className="mb-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-bold">{job.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${job.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1 bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full">
                  <span>{job.stages.screening}</span>
                  <span>Screening</span>
                </div>
                <div className="flex items-center gap-1 bg-orange-600/20 text-orange-400 px-2 py-1 rounded-full">
                  <span>{job.stages.interview}</span>
                  <span>Interview</span>
                </div>
                {job.stages.offer > 0 && (
                  <div className="flex items-center gap-1 bg-green-600/20 text-green-400 px-2 py-1 rounded-full">
                    <span>{job.stages.offer}</span>
                    <span>Offer</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Interviews */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Upcoming Interviews</h2>
              <p className="text-xs text-gray-400">Next 2 days</p>
            </div>
            <Calendar className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="space-y-3">
            {upcomingInterviews.map((interview, idx) => (
              <div key={idx} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${getInterviewTypeColor(interview.type)} rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                    {interview.candidate.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-sm truncate">{interview.candidate}</h4>
                    <p className="text-xs text-gray-400">{interview.role}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span className="text-gray-400">{interview.time}</span>
                      {interview.status === 'confirmed' ? (
                        <span className="text-green-400">✓ Confirmed</span>
                      ) : (
                        <span className="text-orange-400">⏳ Pending</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Candidates */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Top Candidates</h2>
              <p className="text-xs text-gray-400">AI-curated standouts</p>
            </div>
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>

          <div className="space-y-3">
            {topCandidates.map((candidate, idx) => (
              <div key={idx} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{candidate.name}</h4>
                      <p className="text-xs text-gray-400">{candidate.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-bold">
                    <Star className="w-3 h-3" />
                    <span>{candidate.score}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-2">{candidate.strength}</p>
                <div className="flex flex-wrap gap-1">
                  {candidate.tags.map((tag, i) => (
                    <span key={i} className="bg-cyan-600/20 text-cyan-400 px-2 py-0.5 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottleneck Detector */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Bottleneck Detector</h2>
              <p className="text-xs text-gray-400">Pipeline issues</p>
            </div>
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>

          <div className="space-y-3">
            {bottlenecks.map((bottleneck, idx) => {
              const Icon = bottleneck.icon;
              return (
                <div 
                  key={idx} 
                  className={`rounded-xl p-4 border ${bottleneck.severity === 'high' ? 'bg-red-900/20 border-red-500/30' : 'bg-orange-900/20 border-orange-500/30'}`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 flex-shrink-0 ${bottleneck.severity === 'high' ? 'text-red-400' : 'text-orange-400'}`} />
                    <p className="text-sm text-gray-300">{bottleneck.issue}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-xl p-4 border border-cyan-800/30">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-cyan-400 mb-1">Quick Insight</h4>
                <p className="text-xs text-gray-300">Your interview-to-offer conversion is 35% - above industry average of 30%! 🎉</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Recent Activity</h2>
            <p className="text-sm text-gray-400">Latest updates</p>
          </div>
          <Activity className="w-5 h-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity, idx) => {
            // pick an icon by type
            const iconMap = {
              application: Briefcase,
              stage: ChevronRight,
              interview: Calendar,
              offer: FileCheck
            };
            const Icon = iconMap[activity.type] || Eye;
            return (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  <Icon className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-200">{activity.text}</p>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">By <span className="text-white font-medium">{activity.user}</span></p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer quick metrics */}
        <div className="mt-6 border-t border-gray-800 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Alerts</p>
                <p className="text-sm text-white font-bold">4</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Automations</p>
                <p className="text-sm text-white font-bold">6 active</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Avg. Score</p>
                <p className="text-sm text-white font-bold">83</p>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-400">
            Last updated: <span className="text-white">just now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentOverview;
