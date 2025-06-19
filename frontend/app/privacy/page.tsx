"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
      <div className="p-5 pt-16">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="dark:text-white dark:hover:bg-white/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
        </div>

        <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
          <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg mb-6">
            <p className="text-lg font-medium mb-2">🔒 Privacy Policy</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This Privacy Policy describes how we collect, use, and protect personal and medical data submitted through
              EmergencyConnect.
            </p>
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <p>Effective Date: {new Date().toLocaleDateString()}</p>
              <p>Last Updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Data We Collect</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Patient demographics (age, gender, condition severity)</li>
                <li>Time of emergency input</li>
                <li>Ambulance and hospital routing logs</li>
                <li>Contact metadata for auditing (e.g., IP address, timestamp)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Purpose of Data Use</h2>
              <p>We use this data solely for:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Routing patients to the most suitable and available hospital</li>
                <li>Ensuring accountability in emergency communication</li>
                <li>Analyzing service quality and performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Data Sharing</h2>
              <p>We share data only with:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Authorized hospitals and emergency departments</li>
                <li>Regulatory or law enforcement agencies (if required by law)</li>
              </ul>
              <p className="mt-3 font-medium">We never sell your data.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Storage & Security</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>All data is encrypted during transmission and at rest</li>
                <li>Access is role-restricted and logged</li>
                <li>Records may be stored for up to 12 months unless otherwise required</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Request access to stored data</li>
                <li>Request corrections if information is inaccurate</li>
                <li>Request deletion if permitted under emergency law regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Contact Information</h2>
              <p>For privacy-related questions or requests, please contact us at:</p>
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg mt-3">
                <p className="font-medium">Privacy Officer</p>
                <p>Email: privacy@emergencyconnect.com</p>
                <p>Phone: 1-800-EMERGENCY</p>
              </div>
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
