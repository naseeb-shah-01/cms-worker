export const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }
  
  export const calculateHoursWorked = (openTime: number, closeTime?: number) => {
    if (!openTime || closeTime) return null
    
    const start = new Date(openTime)
    const end = closeTime ? new Date(closeTime) : new Date()
    const diffMs = end.getTime() - start.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)
    
    return {
      hours: Math.floor(diffHours),
      minutes: Math.floor((diffHours % 1) * 60)
    }
  }