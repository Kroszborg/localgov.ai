"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row h-auto md:h-16 items-center justify-between py-4 md:py-0 gap-4 md:gap-0">
          {/* Left Side - Copyright and Links */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm text-muted-foreground">
            <span className="font-medium">
              © {currentYear} LocalGov.AI. All rights reserved.
            </span>
            <div className="flex items-center gap-4 md:gap-6">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors duration-200 relative group"
                >
                  Privacy Policy
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors duration-200 relative group"
                >
                  Terms of Service
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Branding and Status */}
          <div className="flex items-center gap-4">
            {/* Status Indicator */}
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span>All systems operational</span>
            </div>

            {/* Powered by section with improved styling */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground hidden md:inline">
                Powered by
              </span>
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/black_circle_360x360.png"
                  alt="Powered by Bolt"
                  width={24}
                  height={24}
                  className="dark:hidden transition-opacity duration-200"
                />
                <Image
                  src="/white_circle_360x360.png"
                  alt="Powered by Bolt"
                  width={24}
                  height={24}
                  className="hidden dark:block transition-opacity duration-200"
                />
                <span className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-200">
                  Bolt
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Additional Footer Info removed for simplicity */}

        {/* Mobile-only additional links */}
        <div className="lg:hidden flex flex-wrap items-center justify-center gap-4 py-3 border-t border-border/50 text-xs text-muted-foreground">
          <Link
            href="/sitemap"
            className="hover:text-primary transition-colors duration-200"
          >
            Sitemap
          </Link>
          <span>•</span>
          <Link
            href="/accessibility"
            className="hover:text-primary transition-colors duration-200"
          >
            Accessibility
          </Link>
          <span>•</span>
          <Link
            href="/help"
            className="hover:text-primary transition-colors duration-200"
          >
            Help Center
          </Link>
          <span>•</span>
          <Link
            href="/status"
            className="hover:text-primary transition-colors duration-200"
          >
            Status
          </Link>
        </div>
      </div>
    </footer>
  );
}
