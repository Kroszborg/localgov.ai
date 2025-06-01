import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DemoSearch from "@/components/demo-search";
import FeatureSection from "@/components/feature-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/5 to-background pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Understand Your Local Laws in Plain English
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    LocalGov.AI uses artificial intelligence to translate complex legal language into clear, actionable information you can understand.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard" className="inline-flex">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about" className="inline-flex">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <DemoSearch />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeatureSection />

        {/* Testimonial Section */}
        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Empowering Citizens
                </h2>
                <p className="mx-auto max-w-[36rem] text-muted-foreground md:text-xl">
                  Join thousands of people using LocalGov.AI to navigate local regulations with confidence.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground italic">
                      "LocalGov.AI helped me understand my city's zoning regulations when I wanted to build a home extension."
                    </p>
                    <p className="font-medium">— Sarah T., Homeowner</p>
                  </div>
                </div>
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground italic">
                      "As a small business owner, navigating local permits was confusing until I found this tool."
                    </p>
                    <p className="font-medium">— Miguel R., Entrepreneur</p>
                  </div>
                </div>
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground italic">
                      "I finally understand my rights as a tenant thanks to the clear explanations from LocalGov.AI."
                    </p>
                    <p className="font-medium">— Jamie L., Renter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-background py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to demystify local laws?
                </h2>
                <p className="mx-auto max-w-[36rem] text-muted-foreground md:text-xl">
                  Create your free account today and start asking questions about your local government regulations.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard" className="inline-flex">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}