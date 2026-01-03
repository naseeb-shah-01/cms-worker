"use client";

import { DayStrip } from "@/app/components/hours/DayStrip";
import { useHours } from "@/app/components/hours/hooks/useHours";
import ShiftStatusCard from "@/app/components/ui/ShiftStatusCard";

const WorkerHoursPage = () => {
  const { hours, loading, userName } = useHours();

  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <h2 className="text-lg sm:text-xl font-bold tracking-tight">
        Welcome, <span className="capitalize">{userName}</span>
      </h2>

      <div className="mt-6 sm:mt-8 space-y-6">
        {hours?.map((day, index) => (
          <div
            key={day?._id + index}
            className="border rounded-lg p-4 space-y-4"
          >
            {/* Day */}
            <DayStrip day={day?._id} totalHours={day?.totalHours} />

            {/* Total Hours */}
           
            

            {/* Shift Cards */}
            <div className="flex gap-3 overflow-x-auto sm:overflow-visible sm:flex-wrap">
              {day.entries.map((e: any, i: number) => (
                <div
                  key={i}
                  className="min-w-[260px] sm:min-w-0 sm:w-auto"
                >
                  <ShiftStatusCard
                    slot={e}
                    onEndShift={() => {}}
                    loading={loading}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerHoursPage;
