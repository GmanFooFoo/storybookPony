"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-bold">Storybook Pony</h1>
          <Button 
            variant="ghost" 
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </div>
      </header>
      <main className="container mx-auto">
        {children}
      </main>
    </div>
  )
} 