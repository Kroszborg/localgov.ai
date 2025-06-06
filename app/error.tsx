"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto min-h-[calc(100vh-12rem)] flex items-center">
        <Alert variant="destructive" className="w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-4">
              We apologize for the inconvenience. Please try refreshing the page
              or contact support if the problem persists.
            </p>
            <Button
              onClick={() => reset()}
              variant="outline"
              className="w-full"
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
