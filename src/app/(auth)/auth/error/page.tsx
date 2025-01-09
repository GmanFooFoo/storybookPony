import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Error | Storybook Pony',
  description: 'Authentication error',
}

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600">Authentication Error</h2>
          <p className="mt-2 text-gray-600">There was a problem signing you in.</p>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/auth/login"
            className="text-blue-500 hover:text-blue-600"
          >
            Try again
          </Link>
        </div>
      </div>
    </div>
  )
} 