import React, { useState, useMemo, useEffect } from 'react';
import { useHeader } from "../../../layout/HeaderContext";
import {
  Users,
  Search,
  Filter,
  ChevronDown,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  UserPlus,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Crown,
  User,
  Building2,
  Check,
  X,
  Plus,
} from 'lucide-react';

const AdminUserPage = () => {
  const { setHeaderConfig } = useHeader();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dropdownInfo, setDropdownInfo] = useState(null);


   useEffect(() => {
    setHeaderConfig({
      title: "Admin Users",
      subtitle: "Manage platform administrators and system access",
      button: {
        label: "Add User",
        icon: UserPlus,
        onClick: () => setShowAddUser(true),
      },
    });
  }, []);
  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@acme.com',
      role: 'Admin',
      company: 'Acme Corp',
      status: 'active',
      phone: '+1 234-567-8901',
      location: 'New York, USA',
      joinedDate: '2024-01-15',
      lastActive: '2 hours ago',
      avatar: 'SJ',
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@techstart.com',
      role: 'User',
      company: 'TechStart Inc',
      status: 'active',
      phone: '+1 234-567-8902',
      location: 'San Francisco, USA',
      joinedDate: '2024-02-20',
      lastActive: '5 hours ago',
      avatar: 'MC',
    },
    {
      id: 3,
      name: 'Emma Williams',
      email: 'emma.w@innovate.com',
      role: 'Manager',
      company: 'Innovate Labs',
      status: 'inactive',
      phone: '+1 234-567-8903',
      location: 'London, UK',
      joinedDate: '2024-03-10',
      lastActive: '2 days ago',
      avatar: 'EW',
    },
    {
      id: 4,
      name: 'David Martinez',
      email: 'david.m@globaltech.com',
      role: 'User',
      company: 'Global Tech',
      status: 'active',
      phone: '+1 234-567-8904',
      location: 'Miami, USA',
      joinedDate: '2024-01-25',
      lastActive: '1 hour ago',
      avatar: 'DM',
    },
    {
      id: 5,
      name: 'Olivia Brown',
      email: 'olivia.b@acme.com',
      role: 'Manager',
      company: 'Acme Corp',
      status: 'active',
      phone: '+1 234-567-8905',
      location: 'Boston, USA',
      joinedDate: '2024-02-05',
      lastActive: '30 min ago',
      avatar: 'OB',
    },
  ]);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => u.role === 'Admin').length,
    newThisMonth: 12,
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, filterRole, filterStatus]);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Admin': return <Crown className="w-4 h-4" />;
      case 'Manager': return <Shield className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'from-purple-500 to-pink-500';
      case 'Manager': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-8">
      {/* Header */}
      <div className="mb-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">
          {[
            {
              label: 'Total Users',
              value: stats.totalUsers,
              change: '+12%',
              icon: Users,
              color: 'from-blue-500 to-cyan-500',
              bg: 'from-blue-50 to-cyan-50',
            },
            {
              label: 'Active Users',
              value: stats.activeUsers,
              change: '+8%',
              icon: User,
              color: 'from-green-500 to-emerald-500',
              bg: 'from-green-50 to-emerald-50',
            },
            {
              label: 'Administrators',
              value: stats.admins,
              change: '0%',
              icon: Crown,
              color: 'from-purple-500 to-pink-500',
              bg: 'from-purple-50 to-pink-50',
            },
            {
              label: 'New This Month',
              value: stats.newThisMonth,
              change: '+24%',
              icon: UserPlus,
              color: 'from-orange-500 to-red-500',
              bg: 'from-orange-50 to-red-50',
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.bg} border-2 border-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <span
                  className={`text-sm font-bold px-3 py-1 rounded-full ${
                    stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-white">
        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-semibold"
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-semibold"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600 font-medium">
              Showing <span className="text-blue-600 font-bold">{filteredUsers.length}</span> users
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all transform hover:scale-105 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getRoleColor(user.role)} flex items-center justify-center font-bold text-white text-lg shadow-lg`}>
                      {user.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{user.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {getRoleIcon(user.role)}
                        <span className="text-sm font-semibold text-gray-600">{user.role}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setDropdownInfo({
                        id: user.id,
                        x: rect.right,
                        y: rect.bottom + window.scrollY,
                      });
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      user.status === 'active'
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                        : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                    }`}
                  >
                    {user.status === 'active' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {user.status.toUpperCase()}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span>{user.company}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{user.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{user.location}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Joined {user.joinedDate}
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-blue-600">
                    {user.lastActive}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Dropdown */}
      {dropdownInfo && (
        <div
          className="fixed bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden"
          style={{
            top: `${dropdownInfo.y + 4}px`,
            left: `${dropdownInfo.x - 200}px`,
            width: '200px',
          }}
          onMouseLeave={() => setDropdownInfo(null)}
        >
          <div className="py-1">
            <button className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-50">
              <Edit className="w-4 h-4 text-blue-600" />
              Edit User
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-50">
              <Lock className="w-4 h-4 text-amber-600" />
              Reset Password
            </button>
            <div className="h-px bg-gray-200 my-1" />
            <button className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-red-50">
              <Trash2 className="w-4 h-4 text-red-600" />
              Delete User
            </button>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUser && (
        <AddUserModal onClose={() => setShowAddUser(false)} />
      )}
    </div>
  );
};

const AddUserModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    company: '',
    phone: '',
    location: '',
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-white/70 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white px-8 py-6 flex items-center space-x-4 shadow-lg">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-md">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Add New User</h2>
            <p className="text-blue-100 text-sm">Create a new user account</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john.doe@company.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="User">User</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Acme Corp"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 234-567-8900"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="New York, USA"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 flex justify-end gap-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-md hover:from-blue-700 hover:to-purple-700 transition font-semibold"
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;