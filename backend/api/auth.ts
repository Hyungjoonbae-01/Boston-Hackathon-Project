import { Elysia, t } from 'elysia'
import jwt from 'jsonwebtoken'
import { pool } from '../utils/db'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export const authPlugin = new Elysia()
  .post(
    '/api/login',
    async ({ body, set, cookie }) => {
      const { email, password } = body

      try {
        const [rows]: any = await pool.execute(
          'SELECT * FROM users WHERE email = ?',
          [email]
        )
        const user = rows[0]

        if (!user || user.password !== password) {
          set.status = 401
          return { success: false, message: 'Invalid credentials' }
        }

        const token = jwt.sign(
          { userId: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: '1h' }
        )

        cookie.accessToken.set({
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          sameSite: 'lax',
          maxAge: 60 * 60, // 1 hour
          path: '/',
        })

        return { success: true, user: { id: user.id, email: user.email } }
      } catch (error) {
        console.error('Login error:', error)
        set.status = 500
        return { success: false, message: 'An unexpected error occurred.' }
      }
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .get('/api/me', ({ cookie, set }) => {
    const token = cookie.accessToken?.value
    if (!token) {
      set.status = 401
      return { success: false, message: 'Not authenticated' }
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string }
      return { success: true, user: decoded }
    } catch (error) {
      set.status = 401
      return { success: false, message: 'Invalid or expired token' }
    }
  })
  .post('/api/logout', ({ cookie, set }) => {
    cookie.accessToken.remove()
    return { success: true, message: 'Logged out successfully' }
  })
