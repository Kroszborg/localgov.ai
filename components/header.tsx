"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { supabase } from "@/lib/supabase"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setMobileMenuOpen(false)
    router.push('/')
  }

  const isAuthPage = pathname.startsWith('/auth/')
  
  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <motion.span 
            className="text-xl font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            LocalGov.AI
          </motion.span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/about" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/about" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            About
          </Link>
          {user && !isAuthPage && (
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
          )}
          
          <div className="flex items-center gap-2">
            {!loading && (
              user ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button onClick={handleSignOut} variant="outline" size="sm">
                    Sign Out
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                  <Button asChild variant="default" size="sm">
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </motion.div>
              )
            )}
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden border-t bg-background/95 backdrop-blur"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              href="/about" 
              className={`block text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/about" ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            {user && !isAuthPage && (
              <Link 
                href="/dashboard" 
                className={`block text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            
            <div className="pt-2 border-t space-y-2">
              {!loading && (
                user ? (
                  <Button onClick={handleSignOut} variant="outline" size="sm" className="w-full">
                    Sign Out
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button asChild variant="ghost" size="sm" className="w-full">
                      <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                    </Button>
                    <Button asChild variant="default" size="sm" className="w-full">
                      <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                    </Button>
                  </div>
                )
              )}
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}