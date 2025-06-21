import { Elysia, t } from 'elysia'
import jwt from 'jsonwebtoken'
import { pool } from '../utils/db'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export const patientPlugin = new Elysia().post(
  '/api/patient',
  async ({ body, cookie, set }) => {
    const token = cookie.accessToken?.value

    if (!token) {
      set.status = 401
      return { success: false, message: 'Unauthorized' }
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
      const userId = decoded.userId

      if (!userId) {
        set.status = 401
        return { success: false, message: 'Invalid token payload' }
      }

      const {
        patientName,
        notApplicable,
        ageRange,
        gender,
        heartRate,
        bloodPressure,
        oxygenSaturation,
        symptoms,
      } = body

      const [result]: any = await pool.execute(
        `INSERT INTO patients (
          user_id, patient_name, not_applicable, age_range, gender,
          heart_rate, blood_pressure, oxygen_saturation, symptoms
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          patientName,
          notApplicable,
          ageRange,
          gender,
          heartRate,
          bloodPressure,
          oxygenSaturation,
          symptoms,
        ]
      )

      return {
        success: true,
        message: 'Patient data saved',
        patientId: result.insertId,
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        set.status = 401
        return { success: false, message: 'Invalid or expired token' }
      }
      console.error('DB insert failed:', error)
      set.status = 500
      return {
        success: false,
        error: 'DB insert failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  },
  {
    body: t.Object({
      patientName: t.String(),
      notApplicable: t.Boolean(),
      ageRange: t.String(),
      gender: t.String(),
      heartRate: t.String(),
      bloodPressure: t.String(),
      oxygenSaturation: t.String(),
      symptoms: t.String(),
    }),
  }
)
