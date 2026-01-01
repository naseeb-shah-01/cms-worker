import { CheckCircle2, XCircle } from "lucide-react"

interface StatusMessageProps {
  type: 'success' | 'error'
  message?: string
}

export default function StatusMessage({ type, message }: StatusMessageProps) {
  if (!message) return null

  const config = {
    success: {
      icon: CheckCircle2,
      className: "border-success/20 bg-success/10 text-success"
    },
    error: {
      icon: XCircle,
      className: "border-danger/20 bg-danger/10 text-danger"
    }
  }[type]

  const Icon = config.icon

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border animate-in fade-in slide-in-from-top-2 ${config.className}`}>
      <Icon className="h-4 w-4 flex-shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  )
}