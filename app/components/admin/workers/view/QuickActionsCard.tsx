interface QuickActionsCardProps {
    onViewLogs: () => void;
    onAssignProject: () => void;
    onGenerateReport: () => void;
    onDeactivate: () => void;
  }
  
  export default function QuickActionsCard({
    onViewLogs,
    onAssignProject,
    onGenerateReport,
    onDeactivate
  }: QuickActionsCardProps) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <button 
            onClick={onViewLogs}
            className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            View Time Logs
          </button>
          <button 
            onClick={onAssignProject}
            className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            Assign New Project
          </button>
          <button 
            onClick={onGenerateReport}
            className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            Generate Report
          </button>
          <button 
            onClick={onDeactivate}
            className="w-full text-left px-4 py-3 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 text-sm font-medium"
          >
            Deactivate Worker
          </button>
        </div>
      </div>
    );
  }