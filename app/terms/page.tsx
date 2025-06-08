"use client";

import { motion } from "framer-motion";
import { Scale, FileText, Clock, Mail, AlertTriangle, Users, Shield, Gavel, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function TermsPage() {
  const lastUpdated = "January 2025";

  const sections = [
    {
      icon: Users,
      title: "Acceptance and Use of Service",
      content: [
        "You must be at least 13 years old to use this service",
        "By using LocalGov.AI, you agree to these terms and conditions",
        "You agree not to misuse the service or attempt to access it using unauthorized methods",
        "You are responsible for maintaining the confidentiality of your account credentials",
        "You agree to use the service only for lawful purposes and in accordance with these terms"
      ]
    },
    {
      icon: BookOpen,
      title: "Service Description and Content",
      content: [
        "LocalGov.AI provides AI-powered explanations of local government laws and policies",
        "Content is for informational purposes only and does not constitute legal advice",
        "We strive for accuracy but cannot guarantee the completeness or current status of all information",
        "You should always verify information with official local government sources",
        "We reserve the right to modify, update, or discontinue the service at any time"
      ]
    },
    {
      icon: Shield,
      title: "User Responsibilities and Account Security",
      content: [
        "You are responsible for maintaining the security of your account and password",
        "You must provide accurate and complete information when creating your account",
        "You agree not to share your account credentials with others",
        "You are responsible for all activities that occur under your account",
        "You must notify us immediately of any unauthorized use of your account"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Uses and Conduct",
      content: [
        "Using the service for any illegal or unauthorized purpose",
        "Attempting to gain unauthorized access to our systems or other users' accounts",
        "Transmitting viruses, malware, or any other malicious code",
        "Harassing, abusing, or harming other users or our team members",
        "Using automated tools to access the service without permission"
      ]
    },
    {
      icon: Gavel,
      title: "Intellectual Property and Content",
      content: [
        "LocalGov.AI and its content are protected by copyright and other intellectual property laws",
        "You may not copy, distribute, or create derivative works from our content without permission",
        "You retain ownership of any content you submit to the service",
        "By submitting content, you grant us a license to use it to provide and improve our service",
        "We respect the intellectual property rights of others and expect users to do the same"
      ]
    }
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
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="outline" className="px-3 py-1">
                <FileText className="w-4 h-4 mr-2" />
                Legal Agreement
              </Badge>
            </div>
            
            <h1 className="text-4xl font-bold">Terms of Service</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              By using LocalGov.AI, you agree to the following terms and conditions. 
              Please read them carefully before using our service.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </motion.div>

          {/* Important Legal Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                <strong>Important Legal Notice:</strong> LocalGov.AI provides general information about 
                local laws and regulations for educational purposes only. This service does not provide 
                legal advice and should not be used as a substitute for consultation with a qualified attorney.
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="border-primary/10">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service (&quot;Terms&quot;) govern your use of the LocalGov.AI website and service 
                  (&quot;Service&quot;) operated by LocalGov.AI (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;). Your access to and use of 
                  the Service is conditioned on your acceptance of and compliance with these Terms. 
                  If you disagree with any part of these terms, then you may not access the Service.
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
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
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
                          <span className="text-muted-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Legal Information */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  LocalGov.AI is provided &quot;as is&quot; without warranties of any kind, either express or implied. 
                  We are not liable for any damages resulting from your use of the service.
                </p>
                <p className="text-sm text-muted-foreground">
                  In no event shall LocalGov.AI, its directors, employees, or agents be liable for any 
                  indirect, incidental, special, consequential, or punitive damages.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-primary" />
                  Governing Law
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  These Terms shall be interpreted and governed by the laws of the United States, 
                  without regard to its conflict of law provisions.
                </p>
                <p className="text-sm text-muted-foreground">
                  Any disputes arising from these Terms or your use of the Service shall be resolved 
                  through binding arbitration in accordance with applicable laws.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Termination and Changes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle>Termination and Modifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Account Termination</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• We may suspend or terminate your account if you violate these terms</li>
                      <li>• You may terminate your account at any time through your account settings</li>
                      <li>• Upon termination, your right to use the service will cease immediately</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Terms Modifications</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• We reserve the right to modify these terms at any time</li>
                      <li>• Changes will be posted on this page with updated effective date</li>
                      <li>• Continued use after changes constitutes acceptance of new terms</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 pt-6 border-t border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <Button asChild variant="outline" size="sm">
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/settings">Account Settings</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/about">About LocalGov.AI</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}