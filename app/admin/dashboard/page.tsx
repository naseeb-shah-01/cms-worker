"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  Calendar,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Edit,
  MessageSquare,
  Search,
  ChevronRight,
  RefreshCw
} from "lucide-react";
import { useRouter } from "next/navigation";

// Types based on your API response
interface Worker {
  _id: string;
  name: string;
  email: string;
  role: string;
  hourlyRate: number;
  jotTitle?: string;
  totalHoursThisMonth: number;
  totalCostThisMonth: number;
  efficiency: number;
  isOverBudget: boolean;
  lastActive: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Department {
  id: string;
  name: string;
  totalWorkers: number;
  totalHours: number;
  totalCost: number;
  avgEfficiency: number;
}

interface MonthlySummary {
  totalWorkers: number;
  activeWorkers: number;
  totalHours: number;
  totalCost: number;
  avgEfficiency: number;
  costTrend: number;
  hoursTrend: number;
}

export default function ManagerDashboard() {
  const router = useRouter();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch workers data
  const fetchWorkers = async () => {
    try {
      setLoading(true);
      
      // Build query params
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedDepartment !== 'all' && { department: selectedDepartment })
      });

      const response = await fetch(`/api/admin/dashboard?${params}`);
      const result = await response.json();

      if (result.success) {
        setWorkers(result.data.workers);
        setDepartments(result.data.departments);
        setMonthlySummary(result.data.summary);
        setTotalPages(result.data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching workers:', error);
      alert('Failed to fetch workers data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchWorkers();
  }, [currentPage, selectedDepartment]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== '' || selectedDepartment !== 'all') {
        setCurrentPage(1);
        fetchWorkers();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchWorkers();
  };

  // Event handlers
  const handleViewWorker = (workerId: string) => {
    router.push(`/admin/workers/view/${workerId}`);
  };

  const handleEditWorker = (workerId: string) => {
    router.push(`/workers/${workerId}/edit`);
  };

  const handleSendMessage = (workerEmail: string) => {
    window.location.href = `mailto:${workerEmail}`;
  };

  const handleExportData = async () => {
    try {
      const response = await fetch('/api/workers/export');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `workers-report-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Failed to export data');
    }
  };

  const handleDepartmentChange = (deptName: string) => {
    setSelectedDepartment(deptName === selectedDepartment ? 'all' : deptName);
    setCurrentPage(1);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Get status color
  const getStatusColor = (status: boolean) => {
    return status ? 'bg-green-500' : 'bg-gray-400';
  };

  // Get efficiency color
  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return 'bg-green-500';
    if (efficiency >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse space-y-6">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center">
            <div>
              <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 bg-gray-200 rounded w-32"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          </div>

          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manager Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Overview of all workers, hours, and costs for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button 
              onClick={handleExportData}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workers by name, email, role, or job title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>
              <button className="p-2.5 hover:bg-gray-100 rounded-lg">
                <Filter className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Summary Stats */}
      {monthlySummary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total Workers</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    {monthlySummary.totalWorkers}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    {monthlySummary.activeWorkers} active
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Across {departments.length} departments
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total Hours</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    {monthlySummary.totalHours.toLocaleString()}
                  </span>
                  <span className={`text-sm font-medium ${monthlySummary.hoursTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {monthlySummary.hoursTrend >= 0 ? '+' : ''}{monthlySummary.hoursTrend}%
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Avg. {(monthlySummary.totalHours / monthlySummary.activeWorkers).toFixed(1)} hrs/worker
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total Cost</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    {formatCurrency(monthlySummary.totalCost)}
                  </span>
                  <span className={`text-sm font-medium ${monthlySummary.costTrend >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {monthlySummary.costTrend >= 0 ? '+' : ''}{monthlySummary.costTrend}%
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Avg. {formatCurrency(monthlySummary.totalCost / monthlySummary.activeWorkers)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Avg. Efficiency</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    {monthlySummary.avgEfficiency}%
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    +2.4% from last month
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Based on hours vs output
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workers Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  All Workers ({workers.length})
                </h3>
                <button 
                  onClick={() => router.push('/workers')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All →
                </button>
              </div>
            </div>
            
            {workers.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-gray-400 mb-4">No workers found</div>
                <p className="text-gray-500">Try changing your search criteria</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {workers.map((worker) => (
                      <tr key={worker._id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                              {worker.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{worker.name}</p>
                              <p className="text-sm text-gray-500">{worker.role || 'Worker'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                            {worker.jotTitle || 'No Department'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-gray-900">{worker.totalHoursThisMonth.toFixed(1)}h</p>
                            <p className="text-sm text-gray-500">${worker.hourlyRate}/hr</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className={`${worker.isOverBudget ? 'text-red-600' : 'text-gray-900'} font-medium`}>
                            {formatCurrency(worker.totalCostThisMonth)}
                            {worker.isOverBudget && (
                              <AlertCircle className="inline w-4 h-4 ml-1 text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${getEfficiencyColor(worker.efficiency)} rounded-full`}
                                style={{ width: `${worker.efficiency}%` }}
                              />
                            </div>
                            <span className={`text-sm font-medium ${
                              worker.efficiency >= 80 ? 'text-green-600' :
                              worker.efficiency >= 60 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {worker.efficiency}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${getStatusColor(worker.isActive)}`} />
                            <span className="text-sm font-medium capitalize">
                              {worker.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleViewWorker(worker._id)}
                              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleEditWorker(worker._id)}
                              className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 hover:text-blue-700"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleSendMessage(worker.email)}
                              className="p-2 hover:bg-green-50 rounded-lg text-green-600 hover:text-green-700"
                              title="Send Message"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Departments */}
        <div className="space-y-6">
          {/* Department Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
            <div className="space-y-4">
              {departments.map((dept) => (
                <div 
                  key={dept.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedDepartment === dept.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleDepartmentChange(dept.name)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{dept.name}</h4>
                    <span className="text-sm font-medium text-gray-600">{dept.totalWorkers} workers</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Hours: {dept.totalHours.toFixed(1)}</span>
                      <span className="text-gray-600">Cost: {formatCurrency(dept.totalCost)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="w-3/4 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${dept.avgEfficiency}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{dept.avgEfficiency.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Avg. Hourly Rate</span>
                <span className="font-bold text-gray-900">
                  {formatCurrency(workers.reduce((sum, w) => sum + w.hourlyRate, 0) / workers.length || 0)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Workers Over Budget</span>
                <span className="font-bold text-red-600">
                  {workers.filter(w => w.isOverBudget).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Inactive Workers</span>
                <span className="font-bold text-gray-900">
                  {workers.filter(w => !w.isActive).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Projects</span>
                <span className="font-bold text-gray-900">
                  {workers.length * 2} {/* Mock data */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}