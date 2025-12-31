import React from "react"

interface LoadingSpinnerProps {
  /**
   * Text to display below the spinner
   */
  text?: string
  /**
   * Size of the spinner (small, medium, large)
   */
  size?: "sm" | "md" | "lg"
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Whether to show full screen overlay
   */
  fullScreen?: boolean
}

export function LoadingSpinner({ 
  text = "Loading...", 
  size = "md", 
  className = "",
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-8 w-8 border-2",
    md: "h-12 w-12 border-b-2",
    lg: "h-16 w-16 border-b-3"
  }

  const spinner = (
    <div className={`text-center ${className}`}>
      <div 
        className={`animate-spin rounded-full border-primary mx-auto mb-4 ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      {text && (
        <p className="text-text text-sm font-medium">{text}</p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
      {spinner}
    </div>
  )
}

// Alternative: Simple inline spinner for buttons/small spaces
export function InlineSpinner({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4 border",
    md: "h-5 w-5 border-2",
    lg: "h-6 w-6 border-2"
  }

  return (
    <div 
      className={`animate-spin rounded-full border-t-transparent border-primary ${sizeClasses[size]}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Alternative: Dot pulse loader
export function DotPulseLoader() {
  return (
    <div className="flex items-center space-x-1" role="status" aria-label="Loading">
      <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
      <div className="h-2 w-2 bg-primary rounded-full animate-pulse delay-150"></div>
      <div className="h-2 w-2 bg-primary rounded-full animate-pulse delay-300"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Alternative: Page loader with progress bar
export function PageLoader({ progress }: { progress?: number }) {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="w-64 max-w-full mb-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress || 0}%` }}
          ></div>
        </div>
      </div>
      <p className="text-text text-sm">Loading...</p>
    </div>
  )
}