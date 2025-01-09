import { withAuth } from "next-auth/middleware"

export const middleware = withAuth({
  callbacks: {
    authorized: ({ req, token }) => !!token
  }
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/design-systems/:path*",
  ]
} 