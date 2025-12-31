import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { Analytics } from "@vercel/analytics/next";
import { StackAuthProvider } from "@/components/stack-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LocalGov.AI - Understand Your Local Laws",
  description: "Get clear, AI-powered explanations of local government laws and policies. No legal jargon, just straightforward answers.",
  robots: "index, follow",
  openGraph: {
    title: "LocalGov.AI - Understand Local Laws in Plain English",
    description: "Get clear, AI-powered explanations of local government laws and policies. No legal jargon, just straightforward answers.",
    type: "website",
    url: "https://localgov.ai/",
    images: [
      {
        url: "https://localgov.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "LocalGov.AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LocalGov.AI - Understand Local Laws in Plain English",
    description: "Get clear, AI-powered explanations of local government laws and policies. No legal jargon, just straightforward answers.",
    images: ["https://localgov.ai/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StackAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <TooltipProvider>
              <div className="flex min-h-screen flex-col">
                <Suspense fallback={<div className="h-16 border-b" />}>
                  <Header />
                </Suspense>
                <main className="flex-1">
                  <PageTransition>
                    {children}
                    <Analytics />
                  </PageTransition>
                </main>
                <Footer />
              </div>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </ThemeProvider>
        </StackAuthProvider>
      </body>
    </html>
  );
}
