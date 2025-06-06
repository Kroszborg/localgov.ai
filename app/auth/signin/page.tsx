"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Clear any existing sessions first
    const clearAndCheck = async () => {
      try {
        // Clear any existing session
        await supabase.auth.signOut();

        // Wait a moment for cleanup
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check if there's actually a valid session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user && session.access_token) {
          console.log("Valid session found, redirecting to dashboard");
          // Use window.location for immediate redirect
          window.location.replace("/dashboard");
          return;
        }

        console.log("No valid session, showing sign in form");
      } catch (error) {
        console.error("Error during auth check:", error);
      } finally {
        setCheckingAuth(false);
      }
    };

    clearAndCheck();
  }, []);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("🔐 Starting sign in process...");

      // Clear any existing session first
      await supabase.auth.signOut();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        console.error("❌ Sign in error:", error);
        if (error.message.includes("Invalid login credentials")) {
          setError(
            "Invalid email or password. Please check your credentials and try again."
          );
        } else if (error.message.includes("Email not confirmed")) {
          setError(
            "Please check your email and click the confirmation link before signing in."
          );
        } else {
          setError(error.message);
        }
        return;
      }

      if (data.session?.user && data.session.access_token) {
        console.log("✅ Sign in successful!");
        console.log("User:", data.user.email);
        console.log(
          "Session:",
          data.session.access_token ? "Valid" : "Invalid"
        );

        // Store session info for debugging
        console.log("Session data:", {
          userId: data.user.id,
          email: data.user.email,
          tokenExpiry: new Date(data.session.expires_at! * 1000),
        });

        // Force immediate redirect - no delays
        console.log("🚀 Redirecting to dashboard...");
        window.location.replace("/dashboard");
      } else {
        console.error("❌ No session created");
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Manual redirect function for testing
  const forceRedirect = () => {
    console.log("🔄 Force redirecting to dashboard...");
    window.location.replace("/dashboard");
  };

  if (checkingAuth) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="text-muted-foreground">Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-md mx-auto min-h-[calc(100vh-12rem)] flex items-center">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your LocalGov.AI account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10"
                      disabled={loading}
                    />
                  </div>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>

              {/* Debug tools */}
              <div className="space-y-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={forceRedirect}
                >
                  🚀 Force Redirect to Dashboard
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={async () => {
                    const { data } = await supabase.auth.getSession();
                    console.log("Current session:", data.session);
                    alert(
                      data.session ? "Session exists!" : "No session found"
                    );
                  }}
                >
                  🔍 Check Current Session
                </Button>
              </div>

              <div className="text-center space-y-2">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Forgot your password?
                </Link>

                <div className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
