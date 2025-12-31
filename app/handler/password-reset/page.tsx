"use client";

import { PasswordReset } from "@stackframe/stack";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useUser } from "@stackframe/stack";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PasswordResetHandlerPage() {
  const user = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (user) {
      // If user is already logged in, redirect to dashboard
      router.push("/dashboard");
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  // Convert searchParams to a plain object for PasswordReset component
  const searchParamsObj: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    searchParamsObj[key] = value;
  });

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
                <h2 className="text-2xl font-bold text-center">Set New Password</h2>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Enter your new password below
                </p>
              </div>
              <PasswordReset searchParams={searchParamsObj} />
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
