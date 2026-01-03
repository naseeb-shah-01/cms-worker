

import Link from "next/link"
import { ArrowRight, Users, Clock, CreditCard, BarChart } from "lucide-react"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./components/ui/logoutButton";



export default async function HomePage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Title */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground">WorkerCMS</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Professional worker management and time tracking system. Track hours, manage payments, and monitor your
              workforce all in one place.
            </p>
          </div>


<LogoutButton />
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {/* Worker Management */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Worker Management</h3>
            <p className="text-muted-foreground">
              Add, edit, and manage your workers with detailed profiles including hourly rates and job titles.
            </p>
          </div>

          {/* Time Tracking */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Time Tracking</h3>
            <p className="text-muted-foreground">
              Log work hours with timestamps and notes. Simple start work button for quick time entry.
            </p>
          </div>

          {/* Payment Management */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-warning" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Payment Tracking</h3>
            <p className="text-muted-foreground">
              Track payments with status management, due dates, and payment history for complete financial oversight.
            </p>
          </div>

          {/* Analytics */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
              <BarChart className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Dashboard Analytics</h3>
            <p className="text-muted-foreground">
              View real-time statistics and insights about your workforce, hours logged, and payment status.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-border">
        <div className="text-center text-muted-foreground text-sm">
          <p>WorkerCMS - Deen Shah Scion</p>
        </div>
      </footer>
    </div>
  )
}
