import { ArrowLeft } from "lucide-react"
import BackButton from "../ui/BackButton"


interface CreateHoursHeaderProps {
  title: string
  description: string
}

export default function CreateHoursHeader({ title, description }: CreateHoursHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <BackButton />
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text">
          {title}
        </h1>
        <p className="text-muted-foreground mt-1">
          {description}
        </p>
      </div>
    </div>
  )
}