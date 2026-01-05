import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { IHour } from "@/app/models/hours"



export const useShiftManagement = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  
  const [form, setForm] = useState({ remark: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [slot, setSlot] = useState<IHour[] | null>(null)
  const [isCheckingSlot, setIsCheckingSlot] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login')
    } else if (status === "authenticated") {
      fetchTodaySlot()
    }
  }, [status, router])

  const fetchTodaySlot = async () => {
    setIsCheckingSlot(true)
    try {
      const res = await fetch(`/api/workers/todayslots/${session?.user.id}`)
      if (res.ok) {
        const data = await res.json()
        setSlot(data.slots||[])
      } else {
        setSlot(null)
      }
    } catch (error) {
      console.error("Error fetching slot:", error)
      setSlot(null)
    } finally {
      setIsCheckingSlot(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleStartShift = async () => {
    
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const today = new Date()
      const openTime = Date.now()

      const res = await fetch("/api/workers/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day: today,
          openTime,
          closeTime: undefined,
          remark: form.remark,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to start shift")
      }

      setSuccess("Shift started successfully!")
      setForm({ remark: "" })
      await fetchTodaySlot()
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleEndShift = async (id:string) => {
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch("/api/workers/end", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotId: id,
          closeTime: Date.now(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to end shift")
      }

      setSuccess("Shift ended successfully!")
      await fetchTodaySlot()
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }
  const ShowAddSlot=slot?.length==0||slot?.every(s=>s.closeTime)
  return {
    session,
    status,
    form,
    loading,
    error,
    success,
    slot,
    isCheckingSlot,
    handleChange,
    handleStartShift,
    handleEndShift,
    fetchTodaySlot,
    router,ShowAddSlot
  }
}