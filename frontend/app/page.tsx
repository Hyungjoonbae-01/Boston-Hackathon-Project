"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is already logged in
    const verifySession = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/me", { credentials: "include" });
        if (res.ok) {
          router.replace("/patient-form")
        }
      } catch (error) {
        console.error("Session verification failed:", error)
      }
    };
    verifySession();
  }, [router])

  const handleLogin = async () => {
    setError("")
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })

    if (res.ok) {
      router.replace("/patient-form")
    } else {
      const data = await res.json()
      setError(data.message || "Login failed")
    }
  }

  return (
    <div className="app-container min-h-screen bg-slate-800 dark:bg-slate-800 text-white">
      <div className="welcome-screen flex flex-col min-h-screen">
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

          {/* Login Button */}
          <Button
            className="w-full py-4 text-lg font-semibold rounded-full bg-blue-600 hover:bg-blue-700 mb-4"
            onClick={handleLogin}
          >
            Login
          </Button>

          {/* Email/password inputs */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-2 p-3 rounded text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-2 p-3 rounded text-black"
          />
          {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

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
