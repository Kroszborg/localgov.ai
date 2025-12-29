import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { Analytics } from "@vercel/analytics/next";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <PageTransition>
                {children}
                <Analytics />
              </PageTransition>
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
