import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-12 text-center">
        <div className="space-y-6">
          <h1 className="text-6xl font-bold tracking-tighter">Storybook Pony</h1>
          <p className="text-xl text-muted-foreground mx-auto max-w-lg">
            Transform your design system documentation. Automate, collaborate, and maintain with ease.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/auth/signin">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </main>
  )
} 