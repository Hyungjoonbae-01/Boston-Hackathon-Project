import { Elysia, t } from 'elysia'
import { pool } from '../utils/db'

// Create table if not exists
await pool.execute(`
  CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(255) NOT NULL,
    age_range VARCHAR(50) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    heart_rate VARCHAR(20) NOT NULL,
    blood_pressure VARCHAR(20) NOT NULL,
    oxygen_saturation VARCHAR(20) NOT NULL,
    symptoms TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`)

export const patientPlugin = new Elysia().post(
  '/api/patient',
  async ({ body }) => {
    try {
      const [result]: any = await pool.execute(
        `INSERT INTO patients (
          patient_name, age_range, gender,
          heart_rate, blood_pressure, oxygen_saturation, symptoms
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          body.patientName,
          body.ageRange,
          body.gender,
          body.heartRate,
          body.bloodPressure,
          body.oxygenSaturation,
          body.symptoms
        ]
      )

      return {
        success: true,
        message: 'Patient data saved',
        patientId: result.insertId,
      }
    } catch (error) {
      return {
        success: false,
        error: 'DB insert failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  },
  {
    body: t.Object({
      patientName: t.String(),
      ageRange: t.String(),
      gender: t.String(),
      heartRate: t.String(),
      bloodPressure: t.String(),
      oxygenSaturation: t.String(),
      symptoms: t.String()
    })
  }
)
