"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Nova_20-_2004.jpeg"
          alt="Dark theme background"
          className="object-cover w-full h-full dark:block hidden"
          width={1920}
          height={1080}
          priority
        />
        <Image
          src="/Francium_20-_2016.jpeg"
          alt="Light theme background"
          className="object-cover w-full h-full dark:hidden block"
          width={1920}
          height={1080}
          priority
        />
      </div>
      
      <main className="relative z-10 flex-1 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="container px-4 md:px-6 py-24 md:py-32">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Understand Your Local Laws<br />in Plain English
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                Get clear, AI-powered explanations of local government laws and policies. 
                No legal jargon, just straightforward answers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="min-w-[200px]">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="min-w-[200px]">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}