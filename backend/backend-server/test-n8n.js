const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// N8N Configuration
const N8N_BASE_URL = process.env.N8N_BASE_URL || "http://localhost:5678"
const N8N_WEBHOOK_URL = `${N8N_BASE_URL}/webhook`

// Emergency intake endpoint - forwards to N8N
app.post("/api/emergency-intake", async (req, res) => {
  try {
    console.log("Received emergency intake:", req.body)

    // Forward to N8N webhook
    const n8nResponse = await axios.post(`${N8N_WEBHOOK_URL}/emergency-intake`, req.body, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000, // 30 second timeout
    })

    console.log("N8N Response:", n8nResponse.data)
    res.json(n8nResponse.data)
  } catch (error) {
    console.error("Error forwarding to N8N:", error.message)

    // Fallback response for demo
    const fallbackResponse = {
      success: true,
      patientId: Date.now().toString(),
      status: "processing",
      message: "Emergency case received and being processed. Hospitals are being contacted.",
    }

    res.json(fallbackResponse)
  }
})

// Emergency status endpoint - checks N8N workflow status
app.get("/api/emergency-status/:id", async (req, res) => {
  try {
    const patientId = req.params.id
    console.log("Checking status for patient:", patientId)

    // Try to get status from N8N
    try {
      const n8nResponse = await axios.get(`${N8N_WEBHOOK_URL}/emergency-status/${patientId}`, {
        timeout: 10000, // 10 second timeout
      })

      console.log("N8N Status Response:", n8nResponse.data)
      res.json(n8nResponse.data)
    } catch (n8nError) {
      console.log("N8N not available, using fallback status")

      // Fallback status for demo
      const fallbackStatus = {
        patientId,
        status: "assigned",
        assignedHospital: {
          name: "City General Hospital",
          phone: "+1-765-123-4567",
          address: "123 Medical Dr, West Lafayette, IN",
          distance: "2.3 km",
        },
        responseTime: new Date().toISOString(),
        message: "Hospital assigned: City General Hospital. Emergency services notified.",
        lastUpdated: new Date().toISOString(),
      }

      res.json(fallbackStatus)
    }
  } catch (error) {
    console.error("Error checking emergency status:", error.message)
    res.status(500).json({
      error: "Failed to check emergency status",
      patientId: req.params.id,
    })
  }
})

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    n8nUrl: N8N_WEBHOOK_URL,
  })
})

// Test endpoint to verify N8N connection
app.get("/test-n8n", async (req, res) => {
  try {
    const testData = {
      name: "Test Patient",
      age: "25-35",
      gender: "male",
      symptoms: "Test symptoms for N8N connection",
      phone: "+1-555-TEST",
      address: "123 Test St, Test City",
      severity: "medium",
      vitals: {
        heartRate: "80",
        bloodPressure: "120/80",
        oxygenSaturation: "98",
      },
    }

    const response = await axios.post(`${N8N_WEBHOOK_URL}/emergency-intake`, testData, {
      timeout: 10000,
    })

    res.json({
      success: true,
      message: "N8N connection successful",
      response: response.data,
    })
  } catch (error) {
    res.json({
      success: false,
      message: "N8N connection failed",
      error: error.message,
      n8nUrl: N8N_WEBHOOK_URL,
    })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`)
  console.log(`📡 N8N Webhook URL: ${N8N_WEBHOOK_URL}`)
  console.log(`🏥 Health check: http://localhost:${PORT}/health`)
  console.log(`🧪 Test N8N: http://localhost:${PORT}/test-n8n`)
})
