import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PageTransition } from '@/components/page-transition'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LocalGov.AI - Understand Your Local Laws',
  description: 'AI-powered local government law interpreter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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
              </PageTransition>
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}