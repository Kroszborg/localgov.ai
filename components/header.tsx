"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { supabase } from "@/lib/supabase";
import { Menu, X, User, LogOut, Settings, Crown, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        // Silently handle auth errors
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setMobileMenuOpen(false);
      router.push("/");
    } catch (error) {
      // Silently handle sign out errors
    }
  };

  const isAuthPage = pathname.startsWith("/auth/");

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-lg border-border/50"
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo with enhanced styling */}
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              LocalGov.AI
            </span>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/80 rounded-full"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                pathname === "/about" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                About
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: pathname === "/about" ? "100%" : 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {user && !isAuthPage && (
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                  pathname === "/dashboard"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Dashboard
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: pathname === "/dashboard" ? "100%" : 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          )}

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {!loading &&
              (user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3" />
                        </div>
                        <span className="hidden lg:inline-block max-w-[120px] truncate">
                          {user.email?.split("@")[0]}
                        </span>
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 w-full"
                      >
                        <BookOpen className="w-4 h-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 w-full"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                      className="shadow-lg"
                    >
                      <Link href="/auth/signup">Get Started</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              ))}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden border-t bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="container mx-auto px-4 py-6 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Link
                  href="/about"
                  className={`flex items-center gap-3 text-base font-medium transition-colors hover:text-primary py-2 ${
                    pathname === "/about"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="w-5 h-5" />
                  About
                </Link>
              </motion.div>

              {user && !isAuthPage && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <Link
                    href="/dashboard"
                    className={`flex items-center gap-3 text-base font-medium transition-colors hover:text-primary py-2 ${
                      pathname === "/dashboard"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    Dashboard
                  </Link>
                </motion.div>
              )}

              <div className="pt-4 border-t space-y-3">
                {!loading &&
                  (user ? (
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {user.email?.split("@")[0]}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={handleSignOut}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Link
                          href="/auth/signin"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="default"
                        size="sm"
                        className="w-full"
                      >
                        <Link
                          href="/auth/signup"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Get Started
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
