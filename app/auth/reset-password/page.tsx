"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
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
            <CardContent className="p-6 text-center space-y-4">
              <h2 className="text-2xl font-bold">Password Reset</h2>
              <p className="text-muted-foreground">
                Please use the forgot password link on the sign-in page to reset your password.
              </p>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/auth/forgot-password">Forgot Password</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
