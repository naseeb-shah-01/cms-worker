"use client"

import { useState } from "react"
import { Clock, FileText } from "lucide-react"

interface ShiftFormProps {
  loading: boolean
  onSubmit: () => Promise<void>
  onCancel: () => void,
  handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  form:{ remark: string }
}

export default function ShiftForm({ loading, onSubmit, onCancel,handleChange,form }: ShiftFormProps) {
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await onSubmit()
    
  }

  return (
    <div className="rounded-lg border border-border bg-surface shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-text">Clock In</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Record your start time for today</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <label htmlFor="remark" className="block text-sm font-medium text-text">
            Remark / Notes (Optional)
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            <textarea
              id="remark"
              name="remark"
              value={form?.remark}
              onChange={handleChange}
              placeholder="Add any additional notes or comments..."
              rows={4}
              className="w-full pl-10 pr-3 py-2.5 rounded-md border border-border bg-surface text-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 h-11 px-4 rounded-md border border-border bg-surface text-text hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            Cancel
          </button>
          <button
  type="submit"
  disabled={loading}
  className="flex-1 h-11 px-4 rounded-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors inline-flex items-center justify-center gap-2"
>
  {loading ? (
    <>
      <span className="animate-spin">⏳</span>
      Starting...
    </>
  ) : (
    <>
      <Clock className="h-4 w-4" />
      Start Work
    </>
  )}
</button>
        </div>
      </form>
    </div>
  )
}