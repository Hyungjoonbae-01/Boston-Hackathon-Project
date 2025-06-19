"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight } from "lucide-react"

export default function HospitalSelectionPage() {
  const router = useRouter()
  const [expandedHospital, setExpandedHospital] = useState<number | null>(null)
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null)

  const hospitals = [
    {
      id: 0,
      name: "City General Hospital",
      distance: "12 min | 2.3 miles",
      location: "123 Main St, Anytown",
      capability: "MRI/CT on-site, Neonatal ICU",
      availability: "ICU Beds Available",
      waitTime: "~15 min",
      specialties: ["Cardiology", "Neurology", "Trauma Center", "Emergency Care"],
      description:
        "Level 1 Trauma Center with 24/7 specialist availability. Advanced cardiac care unit with catheterization lab. Stroke center certified.",
    },
    {
      id: 1,
      name: "County Medical Center",
      distance: "15 min | 3.2 miles",
      location: "456 Oak Ave, Anytown",
      capability: "General Surgery, Pediatrics",
      availability: "2 OR Available",
      waitTime: "~25 min",
      specialties: ["General Surgery", "Pediatrics", "Orthopedics", "Maternity"],
      description:
        "Full-service community hospital with comprehensive medical services. Specialized pediatric emergency department. Joint replacement center of excellence.",
    },
    {
      id: 2,
      name: "Regional Trauma Center",
      distance: "18 min | 4.1 miles",
      location: "789 Emergency Blvd, Anytown",
      capability: "Level 1 Trauma, Burn Unit",
      availability: "Trauma Bay Open",
      waitTime: "Immediate",
      specialties: ["Level 1 Trauma", "Burn Center", "Neurosurgery", "Air Ambulance"],
      description:
        "Regional Level 1 Trauma Center serving 5-county area. Specialized burn unit with hyperbaric chamber. Helipad available for critical transfers.",
    },
  ]

  const toggleHospital = (id: number) => {
    setExpandedHospital(expandedHospital === id ? null : id)
  }

  const selectHospital = (id: number) => {
    setSelectedHospital(id)
    localStorage.setItem("selectedHospital", hospitals[id].name)
  }

  const handleNext = () => {
    if (selectedHospital !== null) {
      router.push("/patient-status")
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
      <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-5 pt-16">
        <div className="flex items-center gap-3">
          <Link href="/account-setup">
            <Button variant="ghost" size="icon" className="dark:text-white dark:hover:bg-white/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Hospital Selection</h1>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-48 bg-gradient-to-br from-green-300 to-green-500 m-5 rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">🗺️</span>
        </div>
        <div className="absolute top-1/3 left-2/5 text-3xl animate-pulse">🏥</div>
        <div className="absolute top-1/2 right-2/5 text-3xl animate-pulse">🏥</div>
        <div className="absolute bottom-1/3 left-1/2 text-3xl animate-pulse">🏥</div>
      </div>

      <div className="px-5">
        <h3 className="text-lg font-semibold mb-4">Recommended Hospitals</h3>

        <div className="space-y-3 pb-24">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className={`rounded-2xl overflow-hidden transition-all ${
                expandedHospital === hospital.id
                  ? "border-2 border-blue-500 shadow-lg"
                  : "bg-gray-100 dark:bg-slate-700 border-2 border-transparent"
              } ${selectedHospital === hospital.id ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
            >
              <div
                onClick={() => toggleHospital(hospital.id)}
                className="flex items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center text-2xl mr-4">
                  🏥
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-base">{hospital.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{hospital.distance}</div>
                </div>
                <ChevronRight
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    expandedHospital === hospital.id ? "rotate-90 text-blue-500" : ""
                  }`}
                />
              </div>

              {expandedHospital === hospital.id && (
                <div className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-600">
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Location</div>
                        <div className="font-semibold text-sm">{hospital.location}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Capability</div>
                        <div className="font-semibold text-sm">{hospital.capability}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Availability</div>
                        <div className="font-semibold text-sm">{hospital.availability}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Wait Time</div>
                        <div className="font-semibold text-sm">{hospital.waitTime}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-semibold mb-2">Specialties</div>
                      <div className="flex flex-wrap gap-2">
                        {hospital.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-semibold mb-2">Additional Information</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {hospital.description}
                      </div>
                    </div>

                    <Button onClick={() => selectHospital(hospital.id)} className="w-full rounded-full">
                      Select This Hospital
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
        <Button
          onClick={handleNext}
          disabled={selectedHospital === null}
          className="w-full py-4 text-lg font-semibold rounded-full disabled:opacity-50"
        >
          {selectedHospital !== null ? "Next" : "Select a Hospital to Continue"}
        </Button>
      </div>
    </div>
  )
}
