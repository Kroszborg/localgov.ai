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
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm text-muted-foreground order-2 md:order-1">
            <span className="font-medium text-center md:text-left">
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
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 order-1 md:order-2">
            {/* Status Indicator - Show on mobile too but smaller */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span className="hidden sm:inline">All systems operational</span>
              <span className="sm:hidden">Online</span>
            </div>

            {/* Powered by section with improved mobile styling */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Powered by</span>
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <a
                  href="https://bolt.new/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Image
                    src="/black_circle_360x360.png"
                    alt="Powered by Bolt"
                    width={20}
                    height={20}
                    className="dark:hidden transition-opacity duration-200"
                  />
                  <Image
                    src="/white_circle_360x360.png"
                    alt="Powered by Bolt"
                    width={20}
                    height={20}
                    className="hidden dark:block transition-opacity duration-200"
                  />
                </a>
                <span className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-200">
                  Bolt
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
