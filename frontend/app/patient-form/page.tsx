"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"

export default function PatientFormPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    patientName: "",
    notApplicable: true,
    ageRange: "",
    gender: "",
    heartRate: "",
    bloodPressure: "",
    oxygenSaturation: "",
    symptoms: "",
  })

  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = () => {
    const { ageRange, gender, heartRate, bloodPressure, oxygenSaturation, symptoms } = formData
    const newErrors: string[] = []

    // Validate each required field
    if (!ageRange) newErrors.push("Age range is required")
    if (!gender) newErrors.push("Gender is required")
    if (!heartRate) newErrors.push("Heart rate is required")
    if (!bloodPressure) newErrors.push("Blood pressure is required")
    if (!oxygenSaturation) newErrors.push("Oxygen saturation is required")
    if (!symptoms.trim()) newErrors.push("Patient symptoms are required")

    if (newErrors.length > 0) {
      setErrors(newErrors)
      alert("Please fill in all required fields:\n" + newErrors.join("\n"))
      return
    }

    // Clear errors and proceed
    setErrors([])

    // Store in both localStorage and sessionStorage for compatibility
    const patientDataToStore = {
      ...formData,
      patientName: formData.notApplicable ? "Not applicable" : formData.patientName,
    }

    localStorage.setItem("patientData", JSON.stringify(patientDataToStore))
    sessionStorage.setItem("patientData", JSON.stringify(patientDataToStore))

    console.log("Form data saved:", patientDataToStore) // Debug log

    // Navigate to next page
    router.push("/account-setup")
  }

  return (
    <div className="min-h-screen bg-slate-800 dark:bg-slate-800 text-white">
      <div className="p-5 pt-16">
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Patient Detail</h1>
          <div></div>
        </div>

        <div className="bg-slate-700 p-5 rounded-2xl mb-20">
          <div className="space-y-5">
            <div>
              <Input
                placeholder="Patient Name"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                disabled={formData.notApplicable}
                className="bg-slate-800 border-none text-white placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="notApplicable"
                checked={formData.notApplicable}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    notApplicable: !!checked,
                    patientName: checked ? "" : formData.patientName,
                  })
                }
              />
              <label htmlFor="notApplicable" className="text-white cursor-pointer">
                Not applicable
              </label>
            </div>

            <div>
              <Select
                value={formData.ageRange}
                onValueChange={(value) => setFormData({ ...formData, ageRange: value })}
              >
                <SelectTrigger
                  className={`bg-slate-800 border-none text-white ${errors.includes("Age range is required") ? "border-red-500 border-2" : ""}`}
                >
                  <SelectValue placeholder="Age range *" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-18">0-18</SelectItem>
                  <SelectItem value="19-35">19-35</SelectItem>
                  <SelectItem value="36-50">36-50</SelectItem>
                  <SelectItem value="51-65">51-65</SelectItem>
                  <SelectItem value="65+">65+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger
                  className={`bg-slate-800 border-none text-white ${errors.includes("Gender is required") ? "border-red-500 border-2" : ""}`}
                >
                  <SelectValue placeholder="Gender *" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input
              type="number"
              placeholder="Heart Rate (bpm) *"
              value={formData.heartRate}
              onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
              className={`bg-slate-800 border-none text-white placeholder:text-gray-400 ${errors.includes("Heart rate is required") ? "border-red-500 border-2" : ""}`}
            />

            <Input
              type="text"
              placeholder="Blood Pressure (e.g., 120/80) *"
              value={formData.bloodPressure}
              onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
              className={`bg-slate-800 border-none text-white placeholder:text-gray-400 ${errors.includes("Blood pressure is required") ? "border-red-500 border-2" : ""}`}
            />

            <Input
              type="number"
              placeholder="Oxygen Saturation (%) *"
              value={formData.oxygenSaturation}
              onChange={(e) => setFormData({ ...formData, oxygenSaturation: e.target.value })}
              className={`bg-slate-800 border-none text-white placeholder:text-gray-400 ${errors.includes("Oxygen saturation is required") ? "border-red-500 border-2" : ""}`}
              min="0"
              max="100"
            />

            <Textarea
              placeholder="Patient Symptoms *"
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              className={`bg-slate-800 border-none text-white placeholder:text-gray-400 min-h-[100px] ${errors.includes("Patient symptoms are required") ? "border-red-500 border-2" : ""}`}
            />
          </div>

          {/* Show validation errors */}
          {errors.length > 0 && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm font-medium mb-2">Please fix the following errors:</p>
              <ul className="text-red-300 text-sm space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Debug info */}
          <div className="mt-4 p-3 bg-slate-600 rounded-lg text-xs">
            <p className="text-gray-300 mb-2">Form Status:</p>
            <p className="text-gray-400">Age: {formData.ageRange || "Not selected"}</p>
            <p className="text-gray-400">Gender: {formData.gender || "Not selected"}</p>
            <p className="text-gray-400">Heart Rate: {formData.heartRate || "Empty"}</p>
            <p className="text-gray-400">Blood Pressure: {formData.bloodPressure || "Empty"}</p>
            <p className="text-gray-400">Oxygen Sat: {formData.oxygenSaturation || "Empty"}</p>
            <p className="text-gray-400">Symptoms: {formData.symptoms ? "Filled" : "Empty"}</p>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-5 bg-slate-800 border-t border-slate-700">
          <Button onClick={handleSubmit} className="w-full py-4 text-lg font-semibold rounded-full">
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
