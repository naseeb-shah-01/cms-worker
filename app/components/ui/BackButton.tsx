"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronLeft, X, Home } from "lucide-react"

interface BackButtonProps {
  /**
   * Custom label for screen readers
   */
  label?: string
  /**
   * Icon variant
   */
  variant?: "arrow" | "chevron" | "close" | "home"
  /**
   * Size of the button
   */
  size?: "sm" | "md" | "lg"
  /**
   * Custom click handler (overrides default router back)
   */
  onClick?: () => void
  /**
   * Custom fallback URL if no history
   */
  fallbackUrl?: string
  /**
   * Whether to show text label
   */
  showLabel?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Whether the button is disabled
   */
  disabled?: boolean
}

export default function BackButton({
  label = "Go back",
  variant = "arrow",
  size = "md",
  onClick,
  fallbackUrl = "/",
  showLabel = false,
  className = "",
  disabled = false
}: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }

    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(fallbackUrl)
    }
  }

  const getIcon = () => {
    const iconProps = {
      "sm": { size: 14 },
      "md": { size: 16 },
      "lg": { size: 20 }
    }[size]

    switch (variant) {
      case "chevron":
        return <ChevronLeft {...iconProps} />
      case "close":
        return <X {...iconProps} />
      case "home":
        return <Home {...iconProps} />
      default:
        return <ArrowLeft {...iconProps} />
    }
  }

  const sizeClasses = {
    "sm": "h-8 w-8 text-sm",
    "md": "h-10 w-10 text-base",
    "lg": "h-12 w-12 text-lg"
  }[size]

  const buttonContent = showLabel ? (
    <div className="flex items-center gap-2">
      {getIcon()}
      <span>{label}</span>
    </div>
  ) : (
    getIcon()
  )

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center 
        rounded-md 
        hover:bg-muted 
        active:bg-muted/80
        disabled:opacity-50 
        disabled:cursor-not-allowed 
        transition-all 
        duration-200 
        focus:outline-none 
        focus:ring-2 
        focus:ring-primary 
        focus:ring-offset-2
        ${sizeClasses} 
        ${className}
      `}
      aria-label={label}
      title={label}
    >
      {buttonContent}
    </button>
  )
}

// Alternative: Breadcrumb back button with context
export function BreadcrumbBackButton({ path }: { path: string }) {
  const router = useRouter()
  const pathSegments = path.split('/').filter(Boolean)
  const parentPath = `/${pathSegments.slice(0, -1).join('/')}`

  return (
    <div className="flex items-center gap-2">
      <BackButton variant="chevron" size="sm" />
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex items-center gap-2 text-muted-foreground">
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`
            
            return (
              <li key={segment} className="flex items-center gap-2">
                {!isLast ? (
                  <button
                    onClick={() => router.push(path)}
                    className="hover:text-text transition-colors capitalize"
                  >
                    {segment.replace(/-/g, ' ')}
                  </button>
                ) : (
                  <span className="text-text font-medium capitalize">
                    {segment.replace(/-/g, ' ')}
                  </span>
                )}
                {!isLast && <span className="text-muted-foreground">/</span>}
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}

// Alternative: Floating back button for mobile
export function FloatingBackButton({
  position = "top-left",
  showOnScroll = true
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  showOnScroll?: boolean
}) {
  const [isVisible, setIsVisible] = React.useState(!showOnScroll)
  const [lastScrollY, setLastScrollY] = React.useState(0)

  React.useEffect(() => {
    if (!showOnScroll) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, showOnScroll])

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4"
  }[position]

  if (!isVisible) return null

  return (
    <div className={`fixed z-40 ${positionClasses}`}>
      <div className="bg-surface/95 backdrop-blur-sm rounded-full shadow-lg border border-border/50">
        <BackButton 
          variant="arrow" 
          size="md" 
          className="hover:bg-muted/50"
        />
      </div>
    </div>
  )
}

// Utility hook for back navigation
export function useBackNavigation(fallbackUrl?: string) {
  const router = useRouter()

  const goBack = React.useCallback(() => {
    if (window.history.length > 1) {
      router.back()
    } else if (fallbackUrl) {
      router.push(fallbackUrl)
    } else {
      router.push('/')
    }
  }, [router, fallbackUrl])

  return goBack
}