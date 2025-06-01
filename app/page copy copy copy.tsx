import { redirect } from "next/navigation";
import { auth } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth.config";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookmarkIcon, ClockIcon, Settings2 } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">
              {session.user?.name?.[0] || session.user?.email?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <p className="text-muted-foreground">{session.user?.email}</p>
          </div>
        </div>

        <Tabs defaultValue="history">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="history">
              <ClockIcon className="mr-2 h-4 w-4" /> History
            </TabsTrigger>
            <TabsTrigger value="bookmarks">
              <BookmarkIcon className="mr-2 h-4 w-4" /> Bookmarks
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings2 className="mr-2 h-4 w-4" /> Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Recent Searches</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="rounded-lg border p-4">
                      <h3 className="font-medium">
                        What are the noise ordinance rules in my area?
                      </h3>
                      <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                        <span>New York City, NY</span>
                        <span>
                          {i} day{i > 1 ? "s" : ""} ago
                        </span>
                      </div>
                      <div className="mt-4">
                        <Button size="sm" variant="outline">
                          View Result
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookmarks" className="mt-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Your Bookmarks</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-lg border p-4">
                      <h3 className="font-medium">
                        Tenant rights for apartment repairs
                      </h3>
                      <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                        <span>New York City, NY</span>
                        <span>
                          Saved {i * 2} day{i > 1 ? "s" : ""} ago
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View Result
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Account Settings</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-2 font-medium">Your Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email
                      </label>
                      <p className="text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Default Location
                      </label>
                      <p className="text-muted-foreground">New York City, NY</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-2 font-medium">Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about your searches and bookmarks
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <p className="font-medium">Search History</p>
                        <p className="text-sm text-muted-foreground">
                          Manage your search history settings
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-2 font-medium">Account Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
