import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LocalGov.AI - Understand Your Local Laws",
  description: "AI-powered local government law interpreter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>LocalGov - Understand Local Laws in Plain English</title>
        <meta
          name="description"
          content="Get clear, AI-powered explanations of local government laws and policies. No legal jargon, just straightforward answers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="LocalGov.AI - Understand Local Laws in Plain English"
        />
        <meta
          property="og:description"
          content="Get clear, AI-powered explanations of local government laws and policies. No legal jargon, just straightforward answers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://localgov.ai/" />
        <meta property="og:image" content="https://localgov.ai/og-image.png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="LocalGov.AI - Understand Local Laws in Plain English"
        />
        <meta
          name="twitter:description"
          content="Get clear, AI-powered explanations of local government laws and policies. No legal jargon, just straightforward answers."
        />
        <meta name="twitter:image" content="https://localgov.ai/og-image.png" />
        {/* Basic Content Security Policy */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'none';"
        />
      </Head>
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
