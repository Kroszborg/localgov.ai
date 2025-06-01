import Link from "next/link";
import { auth } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth.config";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookmarkPlus, Share2, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ResultsPageProps {
  searchParams: {
    id?: string;
  };
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  // This would come from an API in a real application
  const resultData = {
    query: "What are the noise ordinance rules in my area?",
    location: "New York City, NY",
    response: `In New York City, the noise ordinance (NYC Noise Code) is primarily governed by Local Law 113 of 2005. Here's a plain English explanation:

1. General Rule: You cannot make "unreasonable noise," which is defined as any excessive sound that disturbs the peace or comfort of a reasonable person with normal sensitivities.

2. Specific Time Restrictions:
   - Between 10 PM and 7 AM: Stricter noise limits apply
   - Construction noise is generally prohibited between 6 PM and 7 AM on weekdays, and all day on weekends except with special permits

3. Residential Areas:
   - Music/Sound equipment should not be audible from 150 feet away
   - Air conditioners and other mechanical equipment must not exceed 42 decibels as measured from inside nearby residences
   - Barking dogs can be considered a violation if they bark unreasonably for extended periods

4. Commercial Establishments:
   - Bars, clubs, and restaurants must ensure that music and patron noise do not disturb nearby residents
   - Commercial music should not be plainly audible from 15 feet away from the source

5. Enforcement:
   - The Department of Environmental Protection (DEP) enforces most noise complaints
   - NYPD can respond to acute noise disturbances
   - Fines range from $50 to $8,000 depending on the violation and number of offenses

6. Making a Complaint:
   - Call 311 to file a noise complaint
   - Provide specific information about the source, time, and duration of the noise
   - For ongoing issues, keeping a log of disturbances can help with enforcement`,
    sources: [
      {
        title: "NYC Administrative Code, Title 24, Chapter 2",
        url: "https://www.nyc.gov/site/dep/environment/noise-code.page",
      },
      {
        title: "Local Law 113 of 2005",
        url: "https://www1.nyc.gov/assets/dep/downloads/pdf/air/noise/noise-code.pdf",
      },
    ],
    timestamp: new Date().toISOString(),
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{resultData.query}</h1>
          <p className="text-sm text-muted-foreground">
            Location: {resultData.location}
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold mb-4">
                Legal Interpretation
              </h2>
              <div className="whitespace-pre-line">{resultData.response}</div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-sm font-medium mb-2">Sources:</h3>
              <ul className="space-y-1">
                {resultData.sources.map((source, index) => (
                  <li key={index} className="text-sm">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <p className="font-medium">Disclaimer</p>
              <p className="text-muted-foreground">
                This information is provided for general guidance only and
                should not be relied upon as legal advice. Laws and regulations
                may change over time. For specific legal issues, please consult
                with a qualified attorney.
              </p>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-xs text-muted-foreground">
                Generated on {new Date(resultData.timestamp).toLocaleString()}
              </p>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button size="sm" variant="outline">
                  <BookmarkPlus className="mr-2 h-4 w-4" /> Bookmark
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
