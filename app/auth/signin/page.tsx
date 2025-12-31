"use client";

import { CredentialSignIn } from "@stackframe/stack";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
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
              <CredentialSignIn />
              <div className="mt-4 text-center space-y-2">
                <div>
                  <a
                    href="/auth/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                  </span>
                  <a
                    href="/auth/signup"
                    className="text-sm text-primary hover:underline"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
