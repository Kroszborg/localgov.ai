"use client";

import { ForgotPassword } from "@stackframe/stack";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ForgotPasswordPage() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (user) {
    return null;
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
            <CardContent className="p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Enter your email address and we&apos;ll send you a password reset link
                </p>
              </div>
              <ForgotPassword />
              <div className="mt-4 text-center">
                <a
                  href="/auth/signin"
                  className="text-sm text-primary hover:underline"
                >
                  ← Back to Sign In
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
