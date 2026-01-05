interface PerformanceStatsCardProps {
    totalHours: number;
    avgWeeklyHours: number;
    completedProjects: number;
  }
  
  export default function PerformanceStatsCard({ 
    totalHours = 0, 
    avgWeeklyHours = 0, 
    completedProjects = 0 
  }: PerformanceStatsCardProps) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Stats</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total Hours This Month</span>
            <span className="font-bold text-gray-900">{totalHours.toFixed(1)} hrs</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Avg. Weekly Hours</span>
            <span className="font-bold text-gray-900">{avgWeeklyHours.toFixed(1)} hrs</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Completed Projects</span>
            <span className="font-bold text-gray-900">{completedProjects}</span>
          </div>
        </div>
      </div>
    );
  }