"use client";

import { useEffect, useState, useCallback } from "react";
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
  const [currentExample, setCurrentExample] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [demoLocation, setDemoLocation] = useState("New York, NY");

  const examples = [
    "What are the noise ordinance rules in my city?",
    "Can I build a fence on my property boundary?",
    "What permits do I need for a home business?",
    "Are there parking restrictions downtown?",
    "How do I report a code violation?",
    "What are the zoning requirements for my area?",
    "Can I keep chickens in my backyard?",
    "What are the local recycling guidelines?",
  ];

  const locations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
  ];

  const stats = [
    { number: "10,000+", label: "Questions Answered", icon: BookOpen },
    { number: "500+", label: "Cities Covered", icon: Globe },
    { number: "98%", label: "User Satisfaction", icon: Star },
    { number: "24/7", label: "Available", icon: Clock },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Homeowner",
      content:
        "LocalGov.AI helped me understand my city's fence regulations in minutes!",
      rating: 5,
    },
    {
      name: "Mike Rodriguez",
      role: "Small Business Owner",
      content:
        "Finally found clear answers about business permits. Incredibly helpful.",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      role: "Property Manager",
      content:
        "This tool is invaluable for staying compliant with local regulations.",
      rating: 5,
    },
  ];

  // Remove typing animation and cycling logic
  // Use static placeholders for demo
  const staticLocation = "Phoenix, AZ";
  const staticQuestion = "Are there parking restrictions downtown?";

  useEffect(() => {
    // Remove typing animation and cycling logic
    // Use static placeholders for demo
    // setCurrentExample((prev) => (prev + 1) % examples.length);
  }, []);

  // Slower cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] w-full">
      {/* Hero Section */}
      <div className="relative flex-1 w-full">
        {/* Enhanced Background */}
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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-14 lg:py-20 min-h-[calc(100vh-8rem)] flex items-center w-full">
          <div className="max-w-4xl mx-auto text-center space-y-6 w-full">
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 w-full">
              {/* ... */}
            </div>
            <div className="space-y-4 w-full">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none break-words w-full">
                Understand Your Local Laws
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                  in Plain English
                </span>
              </h1>
              <p className="mx-auto max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed w-full">
                Get clear, AI-powered explanations of local government laws and
                policies. No legal jargon, just straightforward answers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
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
            </div>
            {/* Demo Section */}
            <div className="mt-6 w-full">
              <div className="p-1 bg-background/20 backdrop-blur-sm rounded-xl border border-primary/20 shadow-2xl w-full max-w-2xl mx-auto">
                <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 space-y-4 w-full">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        Live Demo - Try asking:
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Mock Search Interface */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={staticLocation}
                          className="pl-10 bg-muted/50 border-primary/20"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={staticQuestion}
                          className="pl-10 bg-muted/50 border-primary/20"
                          placeholder="Ask about local laws..."
                          readOnly
                        />
                      </div>
                      <Button size="default" disabled className="px-6">
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Demo Response Preview */}
                  <motion.div
                    className="p-4 bg-primary/5 border border-primary/20 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="flex items-start gap-2">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium">
                          AI Response Preview:
                        </p>
                        <p className="text-xs text-muted-foreground">
                          &ldquo;Based on {staticLocation} regulations,
                          here&apos;s what you need to know...&rdquo;
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      💡 <strong>Sign up free</strong> to ask real questions and
                      get detailed answers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
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
                className="text-center p-4 rounded-lg bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
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
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center space-y-4 mb-12"
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
                <Card className="text-center border-0 shadow-lg bg-background/60 backdrop-blur-sm group hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="pb-4">
                    <motion.div
                      className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <feature.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
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

      {/* Enhanced CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
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

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
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
