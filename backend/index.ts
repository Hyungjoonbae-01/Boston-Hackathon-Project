import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { patientPlugin } from './api/patient'
import { geminiPlugin } from './api/gemini'
import { authRedirectMiddleware } from './middleware'
import { pool } from './utils/db'
import { authPlugin } from './api/auth'
import { cookie } from '@elysiajs/cookie'

const dbSetup = new Elysia({ name: 'db-setup' })
  .onStart(async () => {
    await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
  
    // Create `patients` table
    await pool.execute(`
    CREATE TABLE IF NOT EXISTS patients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      patient_name VARCHAR(255),
      not_applicable BOOLEAN DEFAULT FALSE,
      age_range VARCHAR(50) NOT NULL,
      gender VARCHAR(20) NOT NULL,
      heart_rate VARCHAR(20) NOT NULL,
      blood_pressure VARCHAR(20) NOT NULL,
      oxygen_saturation VARCHAR(20) NOT NULL,
      symptoms TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)
  console.log('Database tables ensured.');
  })

const app = new Elysia()
  .use(dbSetup)
  .use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
  .use(cookie())
  .use(authRedirectMiddleware)
  .use(authPlugin)
  .use(patientPlugin)
  .use(geminiPlugin)
  .listen(3000)

console.log(`🚀 Server running on http://localhost:3000`)