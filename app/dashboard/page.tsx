"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import {
  Bookmark,
  History,
  Search,
  MapPin,
  Clock,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchHistory {
  id: string;
  query: string;
  location: string;
  created_at: string;
}

interface Bookmark {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<string>("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth");
      return;
    }
    setUser(user);
    await fetchUserData(user.id);
  }

  async function fetchUserData(userId: string) {
    try {
      // Fetch search history
      const { data: historyData } = await supabase
        .from("search_history")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (historyData) setSearchHistory(historyData);

      // Fetch bookmarks
      const { data: bookmarkData } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (bookmarkData) setBookmarks(bookmarkData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedLocation || !query || !user) return;

    setSearching(true);
    setSearchResult("");

    try {
      // Call your AI service here
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          location: selectedLocation,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResult(
          data.result ||
            "I apologize, but I couldn't process your request at this time. Please try again later."
        );
      } else {
        setSearchResult(
          "Sorry, there was an error processing your request. Please try again."
        );
      }

      // Save to search history
      await supabase.from("search_history").insert({
        user_id: user.id,
        query,
        location: selectedLocation,
      });

      await fetchUserData(user.id);
    } catch (error) {
      console.error("Error performing search:", error);
      setSearchResult("An error occurred while processing your request.");
    }

    setSearching(false);
  }

  async function saveBookmark() {
    if (!searchResult || !user || !query) return;

    try {
      await supabase.from("bookmarks").insert({
        user_id: user.id,
        title: query.slice(0, 100),
        content: searchResult.slice(0, 500),
      });

      await fetchUserData(user.id);
    } catch (error) {
      console.error("Error saving bookmark:", error);
    }
  }

  const locations = [
    { value: "new-york-ny", label: "New York, NY" },
    { value: "los-angeles-ca", label: "Los Angeles, CA" },
    { value: "chicago-il", label: "Chicago, IL" },
    { value: "houston-tx", label: "Houston, TX" },
    { value: "phoenix-az", label: "Phoenix, AZ" },
    { value: "philadelphia-pa", label: "Philadelphia, PA" },
    { value: "san-antonio-tx", label: "San Antonio, TX" },
    { value: "san-diego-ca", label: "San Diego, CA" },
    { value: "dallas-tx", label: "Dallas, TX" },
    { value: "san-jose-ca", label: "San Jose, CA" },
  ];

  const exampleQuestions = [
    "What are the noise ordinance rules?",
    "Can I build a fence on my property?",
    "What are the parking regulations downtown?",
    "Are there restrictions on home businesses?",
    "What permits do I need for a garage sale?",
  ];

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            Ask questions about local laws and get clear, AI-powered answers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Search Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Ask About Local Laws
                </CardTitle>
                <CardDescription>
                  Select your location and ask your question about local laws
                  and regulations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Select
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem
                            key={location.value}
                            value={location.value}
                          >
                            {location.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Question</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask about local laws..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        disabled={searching || !selectedLocation || !query}
                      >
                        {searching ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Search className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </form>

                {/* Example Questions */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Try these example questions:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {exampleQuestions.map((example, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => setQuery(example)}
                      >
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {(searchResult || searching) && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>AI Response</CardTitle>
                    {searchResult && !searching && (
                      <Button
                        onClick={saveBookmark}
                        variant="outline"
                        size="sm"
                      >
                        <Bookmark className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    )}
                  </div>
                  {selectedLocation && query && (
                    <CardDescription>
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {
                        locations.find((l) => l.value === selectedLocation)
                          ?.label
                      }{" "}
                      • &quot; {query}&quot;
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {searching ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analyzing local laws and regulations...</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="prose prose-sm max-w-none">
                        <p className="whitespace-pre-wrap">{searchResult}</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          <strong>Disclaimer:</strong> This information is for
                          general guidance only and should not be considered
                          legal advice. Always consult with a qualified legal
                          professional for specific legal matters.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Searches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <History className="w-5 h-5" />
                  Recent Searches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[250px]">
                  {searchHistory.length > 0 ? (
                    <div className="space-y-3">
                      {searchHistory.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-lg border bg-card hover:bg-accent cursor-pointer transition-colors"
                          onClick={() => {
                            setQuery(item.query);
                            setSelectedLocation(item.location);
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1 flex-1">
                              <p className="font-medium text-sm leading-tight">
                                {item.query}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>
                                  {locations.find(
                                    (l) => l.value === item.location
                                  )?.label || item.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {new Date(
                                    item.created_at
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No searches yet. Try asking a question above!
                    </p>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Bookmarks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bookmark className="w-5 h-5" />
                  Saved Bookmarks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[250px]">
                  {bookmarks.length > 0 ? (
                    <div className="space-y-3">
                      {bookmarks.map((bookmark) => (
                        <div
                          key={bookmark.id}
                          className="p-3 rounded-lg border bg-card"
                        >
                          <div className="space-y-2">
                            <p className="font-medium text-sm leading-tight">
                              {bookmark.title}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-3">
                              {bookmark.content}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>
                                {new Date(
                                  bookmark.created_at
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No bookmarks yet. Save helpful responses to reference
                      later!
                    </p>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
