"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email for a password reset link.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Link */}
            <motion.div
              className="mb-6"
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                href="/auth/signin"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to sign in
              </Link>
            </motion.div>

            <Card className="border-primary/10 shadow-xl">
              <CardHeader className="space-y-1 text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
                <motion.div
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Mail className="w-6 h-6 text-primary" />
                </motion.div>
                <CardTitle className="text-2xl font-bold">
                  Reset your password
                </CardTitle>
                <CardDescription className="text-base">
                  Enter your email address and we&apos;ll send you a link to reset
                  your password
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {message && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800 dark:text-green-200">
                        {message}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 h-11"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading || !email}
                      className="w-full h-11 text-base font-medium"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending Reset Link...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Reset Link
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Additional Help */}
                <div className="pt-4 border-t border-border/50">
                  <div className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Remember your password?{" "}
                      <Link
                        href="/auth/signin"
                        className="text-primary hover:underline font-medium"
                      >
                        Sign in
                      </Link>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/auth/signup"
                        className="text-primary hover:underline font-medium"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Help Note */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    💡 <strong>Tip:</strong> Check your spam folder if you don&apos;os;os;os;os;os;t
                    receive the email within a few minutes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
