"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart3, Mail, CreditCard, Check } from "lucide-react"

export default function AccountSetupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isProcessing, setIsProcessing] = useState(true)

  const options = [
    { id: 0, icon: BarChart3, text: "Set up N8N account", duration: 2000 },
    { id: 1, icon: Mail, text: "Confirm your email address", duration: 1500 },
    { id: 2, icon: CreditCard, text: "Choose your account", duration: 1800 },
  ]

  useEffect(() => {
    // Start the animation sequence
    const animateSetup = async () => {
      for (let i = 0; i < options.length; i++) {
        // Set current processing step
        setCurrentStep(i)

        // Wait for the step duration
        await new Promise((resolve) => setTimeout(resolve, options[i].duration))

        // Mark step as completed
        setCompletedSteps((prev) => [...prev, i])

        // Small pause between steps
        await new Promise((resolve) => setTimeout(resolve, 500))
      }

      // All steps completed, wait a moment then proceed
      setIsProcessing(false)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/hospital-selection")
    }

    animateSetup()
  }, [router])

  const getStepStatus = (stepId: number) => {
    if (completedSteps.includes(stepId)) return "completed"
    if (currentStep === stepId) return "processing"
    return "pending"
  }

  const getProgressStepClass = (stepNumber: number) => {
    if (stepNumber === 1) return "bg-green-500 text-white" // Always completed
    if (stepNumber === 2) return completedSteps.length >= 1 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
    if (stepNumber === 3) return completedSteps.length === 3 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
    return "bg-gray-300 text-gray-600"
  }

  const getProgressLineClass = (lineNumber: number) => {
    if (lineNumber === 1) return completedSteps.length >= 1 ? "bg-green-500" : "bg-gray-300"
    if (lineNumber === 2) return completedSteps.length === 3 ? "bg-green-500" : "bg-gray-300"
    return "bg-gray-300"
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="p-5 pt-16">
        <Link href="/patient-form">
          <Button variant="ghost" size="icon" className="mb-4 text-gray-900 hover:bg-gray-100">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center mb-8">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 ${getProgressStepClass(1)}`}
          >
            ✓
          </div>
          <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${getProgressLineClass(1)}`}></div>
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 ${getProgressStepClass(2)}`}
          >
            2
          </div>
          <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${getProgressLineClass(2)}`}></div>
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 ${getProgressStepClass(3)}`}
          >
            3
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">{isProcessing ? "Just a moment..." : "Setup Complete!"}</h2>
          <p className="text-gray-600">
            {isProcessing ? (
              <>
                We're building the best
                <br />
                study plan for you!
              </>
            ) : (
              "All setup tasks have been completed successfully!"
            )}
          </p>
        </div>

        <div className="space-y-3 mb-20">
          {options.map((option) => {
            const Icon = option.icon
            const status = getStepStatus(option.id)

            return (
              <div
                key={option.id}
                className={`flex items-center p-4 rounded-2xl transition-all duration-700 ${
                  status === "completed"
                    ? "bg-green-50 border-2 border-green-500 transform scale-[1.02]"
                    : status === "processing"
                      ? "bg-blue-50 border-2 border-blue-500 animate-pulse"
                      : "bg-gray-100 border-2 border-transparent"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-white mr-4 transition-all duration-500 ${
                    status === "completed" ? "bg-green-500" : status === "processing" ? "bg-blue-500" : "bg-gray-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 font-medium">{option.text}</div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                    status === "completed"
                      ? "bg-green-500 border-green-500 text-white"
                      : status === "processing"
                        ? "border-blue-500 animate-spin"
                        : "border-gray-300"
                  }`}
                >
                  {status === "completed" && <Check className="h-3 w-3" />}
                  {status === "processing" && (
                    <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Processing indicator */}
        {isProcessing && (
          <div className="fixed bottom-20 left-0 right-0 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Processing setup...</span>
            </div>
          </div>
        )}

        {/* Completion message */}
        {!isProcessing && (
          <div className="fixed bottom-20 left-0 right-0 text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Setup completed! Redirecting...</span>
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-200">
          <Button
            disabled={isProcessing}
            onClick={() => router.push("/hospital-selection")}
            className="w-full py-4 text-lg font-semibold rounded-full disabled:opacity-50"
          >
            {isProcessing ? "Setting up..." : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  )
}
