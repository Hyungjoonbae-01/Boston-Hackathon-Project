"use client"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export default function HomePage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="app-container min-h-screen bg-slate-800 dark:bg-slate-800 text-white">
      <div className="welcome-screen flex flex-col min-h-screen">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white hover:bg-white/20"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <div className="ambulance-container flex-1 flex items-center justify-center bg-gradient-to-b from-sky-400 to-blue-600 mx-0 p-10 rounded-b-3xl">
          <div className="ambulance-icon w-44 h-32 bg-white rounded-2xl relative shadow-2xl flex items-center justify-center animate-bounce">
            <span className="text-7xl">🚑</span>
          </div>
        </div>

        <div className="welcome-content p-8 text-center">
          <h1 className="text-3xl font-bold mb-3">Welcome to MediRoute</h1>
          <p className="text-base opacity-80 mb-8 leading-relaxed">
            Optimize patient transport with real-time
            <br />
            hospital data and AI-driven insights.
          </p>
          <Link href="/patient-form">
            <Button className="w-full py-4 text-lg font-semibold rounded-full bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
          </Link>
          <p className="text-xs text-gray-400 text-center mt-5 px-5 leading-relaxed">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-blue-400 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-400 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
