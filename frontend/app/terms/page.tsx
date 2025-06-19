"use client"

import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Moon, Sun } from "lucide-react"

export default function TermsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="dark:text-white dark:hover:bg-white/20"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="p-5 pt-16">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="dark:text-white dark:hover:bg-white/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Terms of Service</h1>
        </div>

        <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
          <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg mb-6">
            <p className="text-lg font-medium mb-2">📄 Terms of Service</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Welcome to EmergencyConnect. By accessing or using our service, you agree to be bound by these Terms of
              Service. Please read them carefully.
            </p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Service Overview</h2>
              <p>
                EmergencyConnect is a tool designed to assist emergency responders by automating hospital availability
                checks and routing patients efficiently based on data input.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Eligibility</h2>
              <p>
                You must be authorized personnel (e.g., EMTs, hospital staff, or system administrators) to access and
                use this platform. Unauthorized use is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Use the service for any unlawful or harmful activity</li>
                <li>Submit false or misleading patient information</li>
                <li>Attempt to hack, reverse-engineer, or disrupt the system</li>
                <li>Bypass access control mechanisms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Account & Data Responsibility</h2>
              <p>Users are responsible for:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Protecting their login credentials</li>
                <li>Ensuring patient information is entered accurately and securely</li>
                <li>Not sharing access with unauthorized users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Limitations of Liability</h2>
              <p>EmergencyConnect does not guarantee:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Real-time hospital acceptance or response</li>
                <li>Medical outcomes or legal protection from negligence</li>
                <li>Continuous service availability or uptime</li>
              </ul>
              <p className="mt-3">
                We are not liable for any delay, miscommunication, or harm resulting from reliance on this system.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Modifications</h2>
              <p>
                We reserve the right to update this ToS at any time. Continued use constitutes acceptance of the updated
                terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
              <p>We may suspend or terminate your access if you violate these terms or misuse the system.</p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-600">
            <p className="text-sm text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
