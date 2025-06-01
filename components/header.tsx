"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const pathname = usePathname()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">LocalGov.AI</span>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link href="/about" className={pathname === "/about" ? "font-bold" : ""}>
            About
          </Link>
          <Link href="/dashboard" className={pathname === "/dashboard" ? "font-bold" : ""}>
            Dashboard
          </Link>
          <Button asChild variant="default">
            <Link href="/auth">Sign In</Link>
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}