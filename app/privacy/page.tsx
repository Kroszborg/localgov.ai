"use client";

import { motion } from "framer-motion";
import {
  Shield,
  FileText,
  Clock,
  Mail,
  Lock,
  Eye,
  Globe,
  Users,
  Database,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPage() {
  const lastUpdated = "January 2025";

  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal information you provide when signing up (such as email address)",
        "Usage data, such as pages visited and actions taken on the site",
        "Search queries and location data you provide for legal information",
        "Technical information like IP address, browser type, and device information",
        "Cookies and similar tracking technologies to enhance your experience",
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To provide and improve our AI-powered legal information services",
        "To communicate with you about updates, features, or support",
        "To analyze usage patterns and trends to improve user experience",
        "To ensure the security and integrity of our platform",
        "To comply with legal obligations and protect our rights",
      ],
    },
    {
      icon: Lock,
      title: "How We Protect Your Information",
      content: [
        "We implement industry-standard encryption for data transmission and storage",
        "Regular security audits and vulnerability assessments",
        "Access controls and authentication measures for our systems",
        "Employee training on data protection and privacy practices",
        "However, no method of transmission over the Internet is 100% secure",
      ],
    },
    {
      icon: Globe,
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "We may share anonymized, aggregated data for research purposes",
        "Service providers who assist us in operating our platform (with strict confidentiality agreements)",
        "When required by law or to protect our rights and safety",
        "In the event of a business transfer, with appropriate notice",
      ],
    },
    {
      icon: Users,
      title: "Your Rights and Choices",
      content: [
        "Access: You can request access to your personal information",
        "Correction: You can update or correct your account information at any time",
        "Deletion: You can request deletion of your account and associated data",
        "Portability: You can request a copy of your data in a portable format",
        "Communication preferences: You can opt out of certain communications",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="outline" className="px-3 py-1">
                <FileText className="w-4 h-4 mr-2" />
                Legal Document
              </Badge>
            </div>

            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This Privacy Policy explains how
              LocalGov.AI collects, uses, and protects your information when you
              use our service.
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card className="border-primary/10">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  At LocalGov.AI, we are committed to protecting your privacy
                  and ensuring the security of your personal information. This
                  policy describes our practices regarding the collection, use,
                  and disclosure of information when you use our AI-powered
                  legal information service. By using LocalGov.AI, you agree to
                  the collection and use of information in accordance with this
                  policy.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Sections */}
          <div className="grid gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <Card className="border-primary/10 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-primary" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-2" />
                          <span className="text-muted-foreground leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Important Information */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  International Users
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  LocalGov.AI is operated from the United States. If you are
                  accessing our service from outside the US, please be aware
                  that your information may be transferred to, stored, and
                  processed in the United States.
                </p>
                <p className="text-sm text-muted-foreground">
                  We comply with applicable international privacy laws and
                  regulations, including GDPR for European users.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Data Retention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  We retain your personal information only as long as necessary
                  to provide our services and fulfill the purposes outlined in
                  this policy.
                </p>
                <p className="text-sm text-muted-foreground">
                  You can request deletion of your account and associated data
                  at any time through your account settings.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/*  Updates */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4 pt-6 border-t border-border/50">
              <Button asChild variant="outline" size="sm">
                <Link href="/terms">Terms of Service</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/settings">Account Settings</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/about">About LocalGov.AI</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
