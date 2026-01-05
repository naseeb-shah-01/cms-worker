"use client"


import CreateHoursHeader from "@/app/components/shift/CreateHoursHeader"
import { useShiftManagement } from "@/app/components/shift/hooks/useShiftManagement"
import ShiftForm from "@/app/components/shift/ShiftForm"
import ShiftStatusCard from "@/app/components/ui/ShiftStatusCard"
import StatusMessage from "@/app/components/shift/StatusMassage"
import { LoadingSpinner } from "@/app/components/ui/LoadingSpinner"

export default function CreateHoursPage() {
  const {
    session,
    status,
    loading,
    error,
    success,
    slot,
    isCheckingSlot,
    handleStartShift, form, handleChange,
    handleEndShift,
    router, ShowAddSlot
  } = useShiftManagement()

  if (status === "loading" || isCheckingSlot) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
      <StatusMessage type="error" message={error} />
        <StatusMessage type="success" message={success} />

        <CreateHoursHeader
          title={getPageTitle(slot)}
          description={getPageDescription(slot)}
        />

        {ShowAddSlot && (
          <ShiftForm
            loading={loading}
            handleChange={handleChange}
            onSubmit={handleStartShift}
            form={form}
            onCancel={() => router.push("/admin/hours")}
          />
        )}

        {
          slot?.map((s) => <ShiftStatusCard
            slot={s}
            onEndShift={() => handleEndShift(s?._id?.toString())}
            loading={loading}
          />)
        }


        
      </div>
    </div>
  )
}

// Helper functions
function getPageTitle(slot: any): string {
  if (slot?.closeTime) return "Shift Completed"
  if (slot) return "Current Shift"
  return "Start Work"
}

function getPageDescription(slot: any): string {
  if (slot?.closeTime) return "Your shift has been completed"
  if (slot) return "Manage your current shift"
  return "Clock in for today"
}