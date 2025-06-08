"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Home, RefreshCw, Mail, ArrowLeft, Bug } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  const errorCode = error.digest || "UNKNOWN_ERROR";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Error Icon and Animation */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              duration: 0.8 
            }}
          >
            <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-destructive" />
            </div>
          </motion.div>

          {/* Main Error Content */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-foreground">
              Oops! Something went wrong
            </h1>
            <p className="text-xl text-muted-foreground">
              We apologize for the inconvenience. An unexpected error has occurred.
            </p>
          </motion.div>

          {/* Error Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Bug className="w-5 h-5" />
                  Error Details
                </CardTitle>
                <CardDescription>
                  Technical information for troubleshooting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error Code: {errorCode}</AlertTitle>
                  <AlertDescription className="mt-2">
                    {error.message || "An unexpected error occurred while processing your request."}
                  </AlertDescription>
                </Alert>
                
                {process.env.NODE_ENV === "development" && (
                  <details className="p-4 bg-muted rounded-lg">
                    <summary className="cursor-pointer font-medium text-sm">
                      Developer Information (Development Mode)
                    </summary>
                    <pre className="mt-2 text-xs overflow-auto whitespace-pre-wrap text-muted-foreground">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => reset()}
                className="min-w-[160px] h-11"
                size="lg"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                variant="outline"
                className="min-w-[160px] h-11"
                size="lg"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Additional Help */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">Need Additional Help?</CardTitle>
                <CardDescription>
                  If the problem persists, here are some options to get support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Quick Solutions</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Refresh the page</li>
                      <li>• Clear your browser cache</li>
                      <li>• Try a different browser</li>
                      <li>• Check your internet connection</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Get Support</h4>
                    <div className="space-y-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Link href="/about">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status and Apology */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                🚧 <strong>We&apos;re constantly improving:</strong> This error has been automatically 
                reported to our team. We apologize for any inconvenience and appreciate your patience 
                as we work to resolve issues quickly.
              </p>
            </div>
          </motion.div>

          {/* Back Navigation */}
          <motion.div
            className="pt-6 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Button
              onClick={() => window.history.back()}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}