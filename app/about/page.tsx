"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Shield,
  Users,
  Target,
  Mail,
  CheckCircle,
  Star,
  Globe,
  Zap,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { number: "10,000+", label: "Questions Answered", icon: BookOpen },
    { number: "500+", label: "Cities Covered", icon: Globe },
    { number: "98%", label: "User Satisfaction", icon: Star },
    { number: "24/7", label: "Available", icon: Zap },
  ];

  const features = [
    {
      icon: Shield,
      title: "Accurate & Reliable",
      description: "Information sourced from official government databases",
    },
    {
      icon: Users,
      title: "Accessible to All",
      description: "Complex legal language made simple for everyone",
    },
    {
      icon: Zap,
      title: "Instant Answers",
      description: "Get immediate responses to your legal questions",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 w-full">
      <div className="container py-8 px-4 sm:px-6 md:px-8 w-full">
        <div className="max-w-3xl mx-auto space-y-8 w-full">
          {/* Hero Section */}
          <div className="space-y-4 w-full">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="px-3 py-1">
                <BookOpen className="w-4 h-4 mr-2" />
                About Us
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent break-words w-full">
              About LocalGov.AI
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed w-full">
              LocalGov.AI is your AI-powered guide to understanding local
              government laws and policies in plain English. We believe that
              access to clear legal information should be available to everyone.
            </p>
            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 w-full">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors w-full"
                >
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-xl sm:text-2xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Mission Section */}
          <div className="space-y-4 w-full">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed w-full">
              We aim to bridge the gap between complex legal language and
              everyday understanding, making local government policies
              accessible to all citizens through the power of AI technology.
            </p>
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 w-full">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="h-full hover:shadow-lg transition-all duration-300 w-full"
                >
                  <CardContent className="p-4 text-center w-full">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* What We Do Section */}
          <div className="space-y-4 w-full">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              How We Help
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="space-y-3 w-full">
                <h3 className="font-semibold text-primary">For Citizens</h3>
                <ul className="space-y-2">
                  {[
                    "Understand local ordinances in plain English",
                    "Get instant answers to legal questions",
                    "Access information 24/7 from anywhere",
                    "Save and reference important information",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground w-full"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3 w-full">
                <h3 className="font-semibold text-primary">Our Technology</h3>
                <ul className="space-y-2">
                  {[
                    "Advanced AI language processing",
                    "Real-time government data integration",
                    "Location-specific legal information",
                    "Continuously updated knowledge base",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground w-full"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Contact Section */}
          <div className="space-y-4 w-full">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Mail className="w-6 h-6 text-primary" />
              Contact Us
            </h2>
            <p className="text-muted-foreground w-full">
              Have questions or feedback? Reach out to us at
              <a
                href="mailto:support@localgov.ai"
                className="text-primary underline ml-1"
              >
                support@localgov.ai
              </a>
            </p>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
