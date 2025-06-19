import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { patientPlugin } from './api/patient'
import { geminiPlugin } from './api/gemini'

const app = new Elysia()
  .use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  }))
  .use(patientPlugin)
  .use(geminiPlugin)
  .listen(3000)

console.log(`🚀 Server running on http://localhost:3000`)