"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, MapPin, BookOpen, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="relative flex-1">
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
          <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32 min-h-[calc(100vh-8rem)] flex items-center">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Understand Your Local Laws
                <br />
                <span className="text-primary">in Plain English</span>
              </h1>
              <p className="mx-auto max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                Get clear, AI-powered explanations of local government laws and
                policies. No legal jargon, just straightforward answers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="min-w-[200px] h-12">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="min-w-[200px] h-12"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            {/* Quick Demo */}
            <div className="mt-12 p-1 bg-background/20 backdrop-blur-sm rounded-lg border">
              <div className="bg-background/90 rounded-md p-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    Try asking: &quot; What are the noise ordinance rules in my
                    city?&quot;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              How LocalGov.AI Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Simple, powerful tools to understand local laws and regulations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-0 shadow-sm bg-background/50">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Choose Your Location</CardTitle>
                <CardDescription>
                  Select your city or state to get location-specific legal
                  information
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 shadow-sm bg-background/50">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Ask Your Question</CardTitle>
                <CardDescription>
                  Ask about any local law, ordinance, or policy in natural
                  language
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 shadow-sm bg-background/50">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Get Clear Answers</CardTitle>
                <CardDescription>
                  Receive AI-powered explanations in plain English with proper
                  citations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Start Understanding Your Local Laws Today
              </h2>
              <p className="text-muted-foreground text-lg">
                Join thousands of citizens who use LocalGov.AI to navigate local
                regulations with confidence.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Free to use • No legal advice disclaimer applies</span>
            </div>

            <Button asChild size="lg" className="min-w-[250px] h-12">
              <Link href="/auth">
                Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
