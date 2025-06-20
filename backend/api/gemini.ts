import { Elysia, t } from 'elysia'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(Bun.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' })

export const geminiPlugin = new Elysia().post(
  '/api/gemini',
  async ({ body }) => {
    const result = await model.generateContent(body.prompt)
    return { text: result.response.text() }
  },
  {
    body: t.Object({
      prompt: t.String({ minLength: 1 })
    })
  }
)
