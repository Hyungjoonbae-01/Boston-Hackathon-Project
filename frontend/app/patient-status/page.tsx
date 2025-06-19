"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Navigation, Home } from "lucide-react"

export default function PatientStatusPage() {
  const [patientData, setPatientData] = useState<any>({})
  const [selectedHospital, setSelectedHospital] = useState("")
  const [currentETA, setCurrentETA] = useState(12)
  const [arrivalTime, setArrivalTime] = useState("")

  useEffect(() => {
    // Load data from localStorage
    const data = localStorage.getItem("patientData")
    const hospital = localStorage.getItem("selectedHospital")

    if (data) setPatientData(JSON.parse(data))
    if (hospital) setSelectedHospital(hospital)

    updateArrivalTime()

    // Update ETA every 30 seconds
    const interval = setInterval(() => {
      setCurrentETA((prev) => Math.max(1, prev - 1))
      updateArrivalTime()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const updateArrivalTime = () => {
    const now = new Date()
    const arrival = new Date(now.getTime() + currentETA * 60000)
    const hours = arrival.getHours()
    const minutes = arrival.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    const displayHours = hours % 12 || 12
    const displayMinutes = minutes < 10 ? "0" + minutes : minutes

    setArrivalTime(`${displayHours}:${displayMinutes} ${ampm}`)
  }

  const handleNavigate = () => {
    if (confirm(`Open navigation to ${selectedHospital}?`)) {
      alert("Opening navigation...")
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Live Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-green-600">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>LIVE</span>
      </div>

      <div className="p-5 pt-16">
        <div className="flex items-center justify-between mb-5">
          <Link href="/hospital-selection">
            <Button variant="ghost" size="icon" className="text-gray-900 hover:bg-gray-100">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Patient Status</h1>
          <div></div>
        </div>

        {/* Route Visualization */}
        <div className="h-52 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl mb-5 relative overflow-hidden">
          <div className="absolute inset-4 border-2 border-dashed border-white/50 rounded-2xl"></div>
          <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 text-3xl">📍</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 text-4xl animate-pulse">🚑</div>
          <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 text-3xl">🏥</div>
        </div>

        {/* Status Info Grid */}
        <div className="grid grid-cols-1 gap-3 mb-5">
          <div className="bg-gray-50 p-4 rounded-2xl flex items-center border border-gray-200">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">🏥</div>
            <div>
              <div className="text-xs text-gray-500">Destination</div>
              <div className="font-semibold text-gray-900">{selectedHospital || "City General Hospital"}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center border border-gray-200">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mr-3 text-lg">⏱️</div>
              <div>
                <div className="text-xs text-gray-500">ETA</div>
                <div className="font-semibold text-gray-900">{currentETA} minutes</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl flex items-center border border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3 text-lg">📏</div>
              <div>
                <div className="text-xs text-gray-500">Distance</div>
                <div className="font-semibold text-gray-900">2.3 miles</div>
              </div>
            </div>
          </div>
        </div>

        {/* ETA Highlight */}
        <div className="bg-green-500 p-5 rounded-2xl text-center mb-5 shadow-lg text-white">
          <div className="text-sm opacity-90 mb-1">Estimated Time of Arrival</div>
          <div className="text-3xl font-bold">{arrivalTime}</div>
        </div>

        {/* Patient Overview */}
        <div className="bg-gray-50 p-5 rounded-2xl mb-20 border border-gray-200">
          <div className="mb-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
              <div className="w-1 h-4 bg-blue-500 rounded"></div>
              Patient Overview
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-900">{patientData.patientName || "Not Applicable"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Age:</span>
                <span className="font-medium text-gray-900">{patientData.ageRange || "36-50"} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gender:</span>
                <span className="font-medium text-gray-900 capitalize">{patientData.gender || "Male"}</span>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
              <div className="w-1 h-4 bg-blue-500 rounded"></div>
              Chief Complaint
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {patientData.symptoms ||
                "Patient experiencing severe chest pain, shortness of breath, and dizziness. Symptoms started 30 minutes ago."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
              <div className="w-1 h-4 bg-blue-500 rounded"></div>
              Vital Signs
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl flex items-center border border-gray-200">
                <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center mr-3">❤️</div>
                <div>
                  <div className="text-xs text-gray-500">Blood Pressure</div>
                  <div className="font-semibold text-gray-900">{patientData.bloodPressure || "140/90"}</div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl flex items-center border border-gray-200">
                <div className="w-9 h-9 bg-pink-100 rounded-lg flex items-center justify-center mr-3">💓</div>
                <div>
                  <div className="text-xs text-gray-500">Heart Rate</div>
                  <div className="font-semibold text-gray-900">{patientData.heartRate || "110"} bpm</div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl flex items-center border border-gray-200">
                <div className="w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">🌡️</div>
                <div>
                  <div className="text-xs text-gray-500">Temperature</div>
                  <div className="font-semibold text-gray-900">98.6°F</div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl flex items-center border border-gray-200">
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center mr-3">💨</div>
                <div>
                  <div className="text-xs text-gray-500">Oxygen Saturation</div>
                  <div className="font-semibold text-gray-900">{patientData.oxygenSaturation || "94"}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white space-y-3 border-t border-gray-200">
          <Button
            onClick={handleNavigate}
            className="w-full py-4 text-lg font-semibold rounded-2xl flex items-center justify-center gap-2"
          >
            <Navigation className="h-5 w-5" />
            Navigate
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="w-full py-4 text-lg font-semibold rounded-2xl border-gray-300 text-gray-900 hover:bg-gray-50"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
