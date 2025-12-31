"use client";

import { StackProvider } from "@stackframe/stack";
import { stackClientApp } from "@/lib/stack-client";

export function StackAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <StackProvider app={stackClientApp}>
      {children}
    </StackProvider>
  );
}
