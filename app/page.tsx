"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  MapPin,
  BookOpen,
  Shield,
  Star,
  Users,
  Zap,
  CheckCircle,
  TrendingUp,
  Globe,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showCursor, setShowCursor] = useState(true);

  const stats = [
    { number: "10,000+", label: "Questions Answered", icon: BookOpen },
    { number: "500+", label: "Cities Covered", icon: Globe },
    { number: "98%", label: "User Satisfaction", icon: Star },
    { number: "24/7", label: "Available", icon: Clock },
  ];

  // Use static placeholders for demo
  const staticLocation = "Phoenix, AZ";
  const staticQuestion = "Are there parking restrictions downtown?";

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section with Fixed Background */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Background Images with proper scaling */}
        <div className="absolute inset-0 z-0">
          {/* Dark theme background */}
          <div className="absolute inset-0 dark:block hidden">
            <Image
              src="/dark1.jpeg"
              alt="Dark theme background"
              fill
              className="object-cover object-center"
              priority
              quality={100}
              sizes="100vw"
            />
          </div>
          {/* Light theme background */}
          <div className="absolute inset-0 dark:hidden block">
            <Image
              src="/light1.jpeg"
              alt="Light theme background"
              fill
              className="object-cover object-center"
              priority
              quality={100}
              sizes="100vw"
            />
          </div>

          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 py-16 w-full">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Main Heading */}
              <div className="space-y-6">
                <motion.h1
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="block">Understand Your Local Laws</span>
                  <span className="block bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                    in Plain English
                  </span>
                </motion.h1>

                <motion.p
                  className="mx-auto max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Get clear, AI-powered explanations of local government laws
                  and policies. No legal jargon, just straightforward answers.
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="min-w-[200px] h-12 group shadow-lg"
                  >
                    <Link href="/auth/signup">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="min-w-[200px] h-12 bg-background/60 backdrop-blur-sm border-primary/20"
                  >
                    <Link href="#demo">See How It Works</Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Demo Section */}
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                id="demo"
              >
                <div className="max-w-2xl mx-auto">
                  <div className="p-1 bg-background/20 backdrop-blur-sm rounded-xl border border-primary/20 shadow-2xl">
                    <div className="bg-background/90 backdrop-blur-sm rounded-lg p-6 space-y-6">
                      <div className="text-center">
                        <span className="text-sm font-medium text-muted-foreground">
                          Demo: Ask LocalGov.AI
                        </span>
                      </div>

                      {/* Mock Search Interface */}
                      <div className="space-y-4">
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            value={staticLocation}
                            className="pl-10 bg-muted/50 border-primary/20 h-12"
                            readOnly
                          />
                        </div>

                        <div className="flex gap-3">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              value={staticQuestion}
                              className="pl-10 bg-muted/50 border-primary/20 h-12"
                              placeholder="Ask about local laws..."
                              readOnly
                            />
                          </div>
                          <Button size="default" disabled className="px-6 h-12">
                            <Search className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Demo Response Preview */}
                      <motion.div
                        className="p-4 bg-primary/5 border border-primary/20 rounded-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.4 }}
                      >
                        <div className="space-y-2">
                          <p className="text-sm font-medium">
                            AI Response Preview:
                          </p>
                          <p className="text-sm text-muted-foreground">
                            &ldquo;Based on {staticLocation} regulations,
                            here&apos;s what you need to know...&rdquo;
                          </p>
                        </div>
                      </motion.div>

                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                          💡 <strong>Sign up free</strong> to ask real questions
                          and get detailed answers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-lg bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              How LocalGov.AI Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Simple, powerful tools to understand local laws and regulations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: MapPin,
                title: "Enter Your Location",
                description:
                  "Enter any city, state, or address to get location-specific legal information",
                delay: 0.1,
              },
              {
                icon: Search,
                title: "Ask Your Question",
                description:
                  "Ask about any local law, ordinance, or policy in natural language",
                delay: 0.2,
              },
              {
                icon: BookOpen,
                title: "Get Clear Answers",
                description:
                  "Receive AI-powered explanations in plain English with proper citations and disclaimers",
                delay: 0.3,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center border-0 shadow-lg bg-background group hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="pb-4">
                    <motion.div
                      className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <feature.icon className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl mb-3">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Understand Your Local Laws?
              </h2>
              <p className="text-muted-foreground text-lg">
                Join thousands of citizens who use LocalGov.AI to navigate local
                regulations with confidence.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span>Instant answers</span>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="min-w-[250px] h-12 group shadow-xl"
              >
                <Link href="/auth/signup">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
