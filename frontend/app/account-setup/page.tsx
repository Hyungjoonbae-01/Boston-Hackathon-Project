"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart3, Mail, CreditCard } from "lucide-react"

export default function AccountSetupPage() {
  const router = useRouter()
  const [selectedOptions, setSelectedOptions] = useState<number[]>([])

  const options = [
    { id: 0, icon: BarChart3, text: "Set up N8N account" },
    { id: 1, icon: Mail, text: "Confirm your email address" },
    { id: 2, icon: CreditCard, text: "Choose your account" },
  ]

  const toggleOption = (id: number) => {
    setSelectedOptions((prev) => (prev.includes(id) ? prev.filter((optionId) => optionId !== id) : [...prev, id]))
  }

  const handleNext = () => {
    if (selectedOptions.length > 0) {
      router.push("/hospital-selection")
    } else {
      alert("Please select at least one option")
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
      <div className="p-5 pt-16">
        <Link href="/patient-form">
          <Button variant="ghost" size="icon" className="mb-4 dark:text-white dark:hover:bg-white/20">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center mb-8">
          <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold text-sm">
            ✓
          </div>
          <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
          <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold text-sm">
            2
          </div>
          <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 mx-2"></div>
          <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 font-semibold text-sm">
            3
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">Just a moment...</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We're building the best
            <br />
            study plan for you!
          </p>
        </div>

        <div className="space-y-3 mb-20">
          {options.map((option) => {
            const Icon = option.icon
            const isSelected = selectedOptions.includes(option.id)

            return (
              <div
                key={option.id}
                onClick={() => toggleOption(option.id)}
                className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all ${
                  isSelected
                    ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-500"
                    : "bg-gray-100 dark:bg-slate-700 border-2 border-transparent"
                }`}
              >
                <div className="w-11 h-11 bg-green-500 rounded-full flex items-center justify-center text-white mr-4">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 font-medium">{option.text}</div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? "bg-green-500 border-green-500 text-white" : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {isSelected && <span className="text-sm">✓</span>}
                </div>
              </div>
            )
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
          <Button onClick={handleNext} className="w-full py-4 text-lg font-semibold rounded-full">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
