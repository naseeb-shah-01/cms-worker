import { Clock, CheckCircle2, LogOut } from "lucide-react"


import { WorkerSlot } from "@/app/types/worker"
import { calculateHoursWorked, formatTime } from "@/app/utils/timeUtils"

interface ShiftStatusCardProps {
  slot: WorkerSlot
  onEndShift: () => void
  loading: boolean
}

export default function ShiftStatusCard({ slot, onEndShift, loading }: ShiftStatusCardProps) {
  const hoursWorked = calculateHoursWorked(slot.openTime, slot.closeTime)

  if (slot.closeTime) {
    return (
      <div className="p-4 rounded-lg border border-success/20 bg-success/10 animate-in fade-in slide-in-from-top-2">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-success" />
          <div className="flex-1">
            <h3 className="font-semibold text-text">Shift Completed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <p className="text-sm text-text">
                <span className="font-medium">Started:</span> {formatTime(slot.openTime)}
              </p>
              <p className="text-sm text-text">
                <span className="font-medium">Ended:</span> {formatTime(slot.closeTime)}
              </p>
              {slot.remark && (
                <p className="text-sm text-text col-span-full">
                  <span className="font-medium">Note:</span> {slot.remark}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-lg border border-primary/20 bg-primary/10 animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-text">Shift in Progress</h3>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-text">
              <span className="font-medium">Started:</span> {formatTime(slot.openTime)}
            </p>
            {hoursWorked && (
              <p className="text-sm text-text">
                <span className="font-medium">Duration:</span> {hoursWorked.hours}h {hoursWorked.minutes}m
              </p>
            )}
            {slot.remark && (
              <p className="text-sm text-text">
                <span className="font-medium">Note:</span> {slot.remark}
              </p>
            )}
          </div>
        </div>
        
        <button
          onClick={onEndShift}
          disabled={loading}
          className="h-11 px-6 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors inline-flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              Ending...
            </>
          ) : (
            <>
              <LogOut className="h-4 w-4" />
              End Shift
            </>
          )}
        </button>
      </div>
    </div>
  )
}