"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Moon, Sun } from "lucide-react"

export default function PatientFormPage() {
  const { theme, setTheme } = useTheme()
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

  const handleSubmit = () => {
    const { ageRange, gender, heartRate, bloodPressure, oxygenSaturation, symptoms } = formData

    if (ageRange && gender && heartRate && bloodPressure && oxygenSaturation && symptoms) {
      localStorage.setItem("patientData", JSON.stringify(formData))
      router.push("/account-setup")
    } else {
      alert("Please fill in all required fields")
    }
  }

  return (
    <div className="min-h-screen bg-slate-800 dark:bg-slate-800 text-white">
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

            <Select value={formData.ageRange} onValueChange={(value) => setFormData({ ...formData, ageRange: value })}>
              <SelectTrigger className="bg-slate-800 border-none text-white">
                <SelectValue placeholder="Age range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-18">0-18</SelectItem>
                <SelectItem value="19-35">19-35</SelectItem>
                <SelectItem value="36-50">36-50</SelectItem>
                <SelectItem value="51-65">51-65</SelectItem>
                <SelectItem value="65+">65+</SelectItem>
              </SelectContent>
            </Select>

            <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
              <SelectTrigger className="bg-slate-800 border-none text-white">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Heart Rate"
              value={formData.heartRate}
              onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
              className="bg-slate-800 border-none text-white placeholder:text-gray-400"
            />

            <Input
              placeholder="Blood Pressure"
              value={formData.bloodPressure}
              onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
              className="bg-slate-800 border-none text-white placeholder:text-gray-400"
            />

            <Input
              placeholder="Oxygen Saturation"
              value={formData.oxygenSaturation}
              onChange={(e) => setFormData({ ...formData, oxygenSaturation: e.target.value })}
              className="bg-slate-800 border-none text-white placeholder:text-gray-400"
            />

            <Textarea
              placeholder="Patient Symptoms"
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              className="bg-slate-800 border-none text-white placeholder:text-gray-400 min-h-[100px]"
            />
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
