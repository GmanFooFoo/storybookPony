import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="p-8 space-y-8">
      {/* User Welcome */}
      <div className="pb-8 border-b">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="space-y-2">
          <p>Welcome, {session.user?.name}!</p>
          <p className="text-muted-foreground">You are signed in with {session.user?.email}</p>
        </div>
      </div>

      {/* Project Overview */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Project Overview</h2>
          <p className="text-muted-foreground">
            Storybook Pony is a tool that automatically generates and manages design system documentation
            by analyzing codebases. This helps development teams maintain visual consistency across
            projects and improve collaboration between designers and developers.
          </p>
        </div>

        {/* MVP Features */}
        <div>
          <h3 className="text-lg font-medium mb-3">Core Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Repository Access</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Connect to GitHub repositories</li>
                <li>GitHub OAuth integration</li>
                <li>Single branch analysis</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Code Analysis</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Extract colors and typography</li>
                <li>Analyze Tailwind configurations</li>
                <li>Identify React components</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Design System Definition</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Modern web interface</li>
                <li>Manual system definition</li>
                <li>JSON/TypeScript import</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Comparison & Reporting</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Color palette comparisons</li>
                <li>Typography differences</li>
                <li>Component inconsistencies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-lg font-medium mb-3">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h4 className="font-medium">Frontend</h4>
              <ul className="text-sm text-muted-foreground">
                <li>Next.js 14</li>
                <li>TypeScript</li>
                <li>React 18</li>
                <li>Tailwind CSS</li>
                <li>Shadcn UI</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Backend</h4>
              <ul className="text-sm text-muted-foreground">
                <li>Next.js API Routes</li>
                <li>Prisma ORM</li>
                <li>Supabase</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Authentication</h4>
              <ul className="text-sm text-muted-foreground">
                <li>NextAuth.js</li>
                <li>GitHub OAuth</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Tools</h4>
              <ul className="text-sm text-muted-foreground">
                <li>ESLint</li>
                <li>Prettier</li>
                <li>Jest</li>
                <li>Zod</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 