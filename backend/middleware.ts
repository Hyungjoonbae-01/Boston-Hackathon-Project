// backend/middleware/auth-redirect.ts
import { Elysia } from "elysia"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export const authRedirectMiddleware = new Elysia({
  name: "authRedirect",
}).onBeforeHandle(({ cookie, set, request }) => {
  const { pathname } = new URL(request.url)

  if (pathname === "/") {
    const token = cookie.accessToken?.value

    if (token) {
      try {
        jwt.verify(token, JWT_SECRET)
        set.redirect = "/patient-form" // this will only apply to Elysia API calls
      } catch {
        // Token invalid – continue
      }
    }
  }
})
