"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { UserPlus, Mail, Phone, Briefcase, DollarSign, CheckCircle2, XCircle, ArrowLeft } from "lucide-react"

import { useSession } from "next-auth/react"

export default  function CreateWorkerPage() {
  const router = useRouter()
  const session =useSession()
  
  // app/worker/page.tsx

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    hourlyRate: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch("/api/admin/workers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          hourlyRate: Number(form.hourlyRate),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Failed to create worker")
      }

      setSuccess("Worker account created successfully")
      setForm({
        name: "",
        email: "",
        phone: "",
        jobTitle: "",
        hourlyRate: "",
      })

      setTimeout(() => router.push("/admin/workers"), 1500)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/workers")}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Worker</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Add a new worker to your team</p>
          </div>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-lg border border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100 animate-in fade-in slide-in-from-top-2">
            <XCircle className="h-4 w-4 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 p-4 rounded-lg border border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-100 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <p className="text-sm">{success}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              <h2 className="text-xl text-text font-semibold">Worker Information</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Fill in the details to create a new worker account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full h-11 px-3 rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  required
                  className="w-full h-11 pl-10 pr-3 rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">This will be used as the login ID</p>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-11 pl-10 pr-3 rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
              </div>
            </div>

            {/* Job Title Field */}
            <div className="space-y-2">
              <label htmlFor="jobTitle" className="block text-sm font-medium">
                Job Role
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  id="jobTitle"
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  placeholder="Electrician, Mason, Helper"
                  className="w-full h-11 pl-10 pr-3 rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
              </div>
            </div>

            {/* Hourly Rate Field */}
            <div className="space-y-2">
              <label htmlFor="hourlyRate" className="block text-sm font-medium">
                Hourly Rate <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  id="hourlyRate"
                  type="number"
                  name="hourlyRate"
                  value={form.hourlyRate}
                  onChange={handleChange}
                  placeholder="25.00"
                  step="0.01"
                  min="0"
                  required
                  className="w-full h-11 pl-10 pr-3 rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Enter the hourly rate in USD</p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.push("/admin/workers")}
                disabled={loading}
                className="flex-1 h-11 px-4 rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 h-11 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Create Worker
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
