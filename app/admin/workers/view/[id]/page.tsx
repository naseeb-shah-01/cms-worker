"use client";

import { useParams } from "next/navigation";
import useWorkerDetail from "@/app/components/admin/workers/view/hooks/useWorkerDetail";
import HoursChart from "@/app/components/ui/HoursChart";
import HoursLineChart from "@/app/components/ui/WorkChart";

import { useState } from "react";
import WorkerNotFound from "@/app/components/ui/NotFound";
import WorkerHeader from "@/app/components/admin/workers/view/WorkerHeader";
import PersonalInfoCard from "@/app/components/admin/workers/view/PersonalInfoCard";
import EmploymentDetailsCard from "@/app/components/admin/workers/view/EmploymentDetailsCard";
import PerformanceStatsCard from "@/app/components/admin/workers/view/ PerformanceStatsCard";
import QuickActionsCard from "@/app/components/admin/workers/view/QuickActionsCard";

export default function WorkerViewPage() {
  const { id } = useParams<{ id: string }>();
  const { userDetails, hours, loading } = useWorkerDetail(id);
  const [isEditing, setIsEditing] = useState(false);

  // Calculate performance stats from hours data
  const performanceStats = {
    totalHours: hours?.reduce((sum, day) => sum + (day.totalHours || 0), 0) || 0,
    avgWeeklyHours: 0, // You'll need to calculate this based on your logic
    completedProjects: 0, // Update with actual data
  };

  // Event handlers
  const handleEdit = () => {
    setIsEditing(true);
    // Implement edit logic
  };

  const handleContact = () => {
    // Implement contact logic
  };

  const handleViewLogs = () => {
    // Implement view logs logic
  };

  const handleAssignProject = () => {
    // Implement assign project logic
  };

  const handleGenerateReport = () => {
    // Implement generate report logic
  };

  const handleDeactivate = () => {
    // Implement deactivate logic
  };

  if (!userDetails && !loading) {
    return <WorkerNotFound />;
  }

  return (
    <div className="p-6">
      <WorkerHeader 
        userDetails={userDetails}
        onEdit={handleEdit}
        onContact={handleContact}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <PersonalInfoCard userDetails={userDetails} />
          <EmploymentDetailsCard userDetails={userDetails} />
          
          {!loading && hours && (
            <>
              <HoursLineChart data={hours} />
              <HoursChart data={hours} />
            </>
          )}
        </div>

        {/* Right Column - Stats & Actions */}
        <div className="space-y-6">
          <PerformanceStatsCard 
            totalHours={performanceStats.totalHours}
            avgWeeklyHours={performanceStats.avgWeeklyHours}
            completedProjects={performanceStats.completedProjects}
          />
          
          <QuickActionsCard 
            onViewLogs={handleViewLogs}
            onAssignProject={handleAssignProject}
            onGenerateReport={handleGenerateReport}
            onDeactivate={handleDeactivate}
          />
        </div>
      </div>
    </div>
  );
}