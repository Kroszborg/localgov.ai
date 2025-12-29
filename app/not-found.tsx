import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Large 404 */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-bold text-muted/20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-16 h-16 md:w-24 md:h-24 text-primary/30" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track!
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="min-w-[180px]">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[180px]">
            <Link href="/dashboard">
              <Search className="w-4 h-4 mr-2" />
              Search Laws
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="pt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Or try these popular pages:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/about"
              className="text-sm text-primary hover:underline"
            >
              About
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/privacy"
              className="text-sm text-primary hover:underline"
            >
              Privacy
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/terms"
              className="text-sm text-primary hover:underline"
            >
              Terms
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/auth/signin"
              className="text-sm text-primary hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
