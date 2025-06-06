"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import {
  Bookmark,
  History,
  Search,
  MapPin,
  Clock,
  ArrowRight,
  Loader2,
  Copy,
  Share,
  Trash2,
  Star,
  Eye,
  Calendar,
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
  query: string;
  location: string;
  created_at: string;
}

// Extended location suggestions for better autocomplete
const locationSuggestions = [
  // US Major Cities
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
  "Austin, TX",
  "Jacksonville, FL",
  "Fort Worth, TX",
  "Columbus, OH",
  "Charlotte, NC",
  "San Francisco, CA",
  "Indianapolis, IN",
  "Seattle, WA",
  "Denver, CO",
  "Boston, MA",
  "Nashville, TN",
  "Detroit, MI",
  "Portland, OR",
  "Las Vegas, NV",
  "Miami, FL",
  "Atlanta, GA",
  "Tampa, FL",
  "Orlando, FL",
  "Minneapolis, MN",
  "Cleveland, OH",

  // International Cities
  "London, UK",
  "Paris, France",
  "Berlin, Germany",
  "Tokyo, Japan",
  "Sydney, Australia",
  "Toronto, Canada",
  "Vancouver, Canada",
  "Melbourne, Australia",
  "Dublin, Ireland",

  // Indian Cities (since user searched Dehradun)
  "Mumbai, India",
  "Delhi, India",
  "Bangalore, India",
  "Hyderabad, India",
  "Chennai, India",
  "Kolkata, India",
  "Pune, India",
  "Ahmedabad, India",
  "Surat, India",
  "Jaipur, India",
  "Lucknow, India",
  "Kanpur, India",
  "Nagpur, India",
  "Dehradun, India",
  "Gurgaon, India",
  "Noida, India",
  "Chandigarh, India",
  "Kochi, India",
  "Coimbatore, India",
  "Indore, India",
];

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<string>("");
  const [searching, setSearching] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(
    null
  );
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);

  // Location autocomplete states
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const locationInputRef = useRef<HTMLInputElement>(null);

  // Prevent duplicate checks
  const authChecked = useRef(false);
  const authListener = useRef<any>(null);

  useEffect(() => {
    if (authChecked.current) return;
    authChecked.current = true;
    checkUserOnce();

    return () => {
      if (authListener.current) {
        authListener.current.unsubscribe();
      }
    };
  }, []);

  // Location autocomplete logic
  useEffect(() => {
    if (location.length >= 2) {
      const filtered = locationSuggestions
        .filter((loc) => loc.toLowerCase().includes(location.toLowerCase()))
        .slice(0, 8); // Show max 8 suggestions

      setFilteredLocations(filtered);
      setShowLocationSuggestions(filtered.length > 0);
    } else {
      setShowLocationSuggestions(false);
      setFilteredLocations([]);
    }
  }, [location]);

  async function checkUserOnce() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        window.location.replace("/auth/signin");
        return;
      }

      setUser(session.user);

      // Fetch from Supabase
      const { data: searches } = await supabase
        .from("search_history")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(10);
      setSearchHistory(searches || []);

      const { data: bookmarksData } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(10);
      setBookmarks(bookmarksData || []);

      setLoading(false);

      if (!authListener.current) {
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === "SIGNED_OUT" || !session) {
            window.location.replace("/auth/signin");
          }
        });
        authListener.current = subscription;
      }
    } catch (error) {
      window.location.replace("/auth/signin");
    }
  }

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setShowLocationSuggestions(false);
    locationInputRef.current?.blur();
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!location.trim() || !query.trim() || !user) return;

    setSearching(true);
    setSearchResult("");

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query.trim(),
          location: location.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResult(
          data.result ||
            "I apologize, but I couldn't process your request at this time. Please try again later."
        );

        // Add to search history in Supabase
        const newSearch = {
          user_id: user.id,
          query: query.trim(),
          location: location.trim(),
          created_at: new Date().toISOString(),
        };
        const { data: inserted, error } = await supabase
          .from("search_history")
          .insert([newSearch])
          .select();
        if (!error && inserted && inserted[0]) {
          setSearchHistory((prev) => [inserted[0], ...prev].slice(0, 10));
        }
      } else {
        const errorData = await response.json();
        setSearchResult(
          errorData.error ||
            "Sorry, there was an error processing your request. Please try again."
        );
      }
    } catch (error) {
      setSearchResult("An error occurred while processing your request.");
    } finally {
      setSearching(false);
    }
  }

  async function saveBookmark() {
    if (!searchResult || !user || !query) return;

    const newBookmark = {
      user_id: user.id,
      title: query.slice(0, 100),
      query: query,
      location: location,
      content: searchResult,
      created_at: new Date().toISOString(),
    };
    const { data: inserted, error } = await supabase
      .from("bookmarks")
      .insert([newBookmark])
      .select();
    if (!error && inserted && inserted[0]) {
      setBookmarks((prev) => [inserted[0], ...prev].slice(0, 10));
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      // Silently handle copy errors
    }
  };

  const removeFromHistory = async (id: string) => {
    await supabase.from("search_history").delete().eq("id", id);
    setSearchHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const removeBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    setBookmarks((prev) => prev.filter((item) => item.id !== id));
  };

  const openBookmarkModal = (bookmark: Bookmark) => {
    setSelectedBookmark(bookmark);
    setIsBookmarkModalOpen(true);
  };

  const exampleQuestions = [
    "What are the noise ordinance rules?",
    "Can I build a fence on my property?",
    "What are the parking regulations downtown?",
    "Are there restrictions on home businesses?",
    "What permits do I need for a garage sale?",
    "How to get a building permit?",
    "What are the zoning laws?",
    "Pet ownership regulations",
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">
              Loading dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    window.location.replace("/auth/signin");
    return null;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section (no animation) */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.email?.split("@")[0]}! 👋
              </h1>
              <p className="text-muted-foreground">
                Ask questions about local laws and get clear, AI-powered
                answers.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Search Area (no animation) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-primary/10 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Ask About Local Laws
                </CardTitle>
                <CardDescription>
                  Enter your location and ask your question about local laws and
                  regulations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Enhanced Location Input with Autocomplete */}
                    <div className="space-y-2 relative">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </label>
                      <div className="relative">
                        <Input
                          ref={locationInputRef}
                          placeholder="Type city, state or address..."
                          value={location}
                          onChange={handleLocationChange}
                          onFocus={() =>
                            location.length >= 2 &&
                            setShowLocationSuggestions(true)
                          }
                          onBlur={() =>
                            setTimeout(
                              () => setShowLocationSuggestions(false),
                              150
                            )
                          }
                          className="pl-4 pr-4"
                          required
                        />
                        {/* Location Suggestions Dropdown */}
                        {showLocationSuggestions && (
                          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg max-h-48 overflow-y-auto">
                            {filteredLocations.map((loc, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 hover:bg-accent cursor-pointer text-sm flex items-center gap-2"
                                onClick={() => handleLocationSelect(loc)}
                              >
                                <MapPin className="w-3 h-3 text-muted-foreground" />
                                {loc}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Enhanced Question Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Search className="w-4 h-4" />
                        Your Question
                      </label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Ask about local laws..."
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          className="flex-1"
                          required
                        />
                        <Button
                          type="submit"
                          disabled={
                            searching || !location.trim() || !query.trim()
                          }
                          className="px-6"
                        >
                          {searching ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Search className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
                {/* Example Questions */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Popular questions:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {exampleQuestions.map((example, index) => (
                      <div
                        key={index}
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-200 bg-secondary rounded px-2 py-1"
                        onClick={() => setQuery(example)}
                      >
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Search Results (no animation) */}
            {(searchResult || searching) && (
              <div>
                <Card className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        AI Response
                      </CardTitle>
                      {searchResult && !searching && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => copyToClipboard(searchResult)}
                            variant="outline"
                            size="sm"
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </Button>
                          <Button
                            onClick={saveBookmark}
                            variant="outline"
                            size="sm"
                          >
                            <Bookmark className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                        </div>
                      )}
                    </div>
                    {location && query && (
                      <CardDescription className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium">{location}</span>
                        <span>•</span>
                        <span>&quot;{query}&quot;</span>
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {searching ? (
                      <div className="flex items-center gap-3 text-muted-foreground p-4">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Analyzing local laws and regulations...</span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="prose prose-sm max-w-none bg-muted/30 p-4 rounded-lg">
                          <p className="whitespace-pre-wrap m-0">
                            {searchResult}
                          </p>
                        </div>
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                          <p className="text-xs text-amber-800 dark:text-amber-200">
                            <strong>⚠️ Legal Disclaimer:</strong> This
                            information is for general guidance only and should
                            not be considered legal advice. Always consult with
                            a qualified legal professional for specific legal
                            matters.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          {/* Sidebar (no animation) */}
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
                <ScrollArea className="h-[300px]">
                  {searchHistory.length > 0 ? (
                    <div className="space-y-3">
                      {searchHistory.map((item) => (
                        <div
                          key={item.id}
                          className="group p-3 rounded-lg border bg-card hover:bg-accent cursor-pointer transition-all duration-200"
                          onClick={() => {
                            setQuery(item.query);
                            setLocation(item.location);
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1 flex-1">
                              <p className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
                                {item.query}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{item.location}</span>
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
                            <div className="flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFromHistory(item.id);
                                }}
                                className="h-8 w-8 p-0 md:h-6 md:w-6"
                                aria-label="Delete search"
                              >
                                <Trash2 className="w-4 h-4 md:w-3 md:h-3" />
                              </Button>
                              <ArrowRight className="w-5 h-5 text-muted-foreground md:w-4 md:h-4" />
                            </div>
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
                <ScrollArea className="h-[300px]">
                  {bookmarks.length > 0 ? (
                    <div className="space-y-3">
                      {bookmarks.map((bookmark) => (
                        <div
                          key={bookmark.id}
                          className="group p-3 rounded-lg border bg-card hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="space-y-2">
                            <p className="font-medium text-sm leading-tight">
                              {bookmark.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <strong>Question:</strong> {bookmark.query}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <strong>Location:</strong> {bookmark.location}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-3">
                              {bookmark.content.slice(0, 100)}...
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {new Date(
                                    bookmark.created_at
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openBookmarkModal(bookmark)}
                                  className="h-8 px-3 text-xs md:h-6 md:px-2"
                                  aria-label="View bookmark"
                                >
                                  <Eye className="w-4 h-4 mr-1 md:w-3 md:h-3" />
                                  <span className="hidden sm:inline">View</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    copyToClipboard(bookmark.content)
                                  }
                                  className="h-8 px-3 text-xs md:h-6 md:px-2"
                                  aria-label="Copy bookmark"
                                >
                                  <Copy className="w-4 h-4 md:w-3 md:h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeBookmark(bookmark.id)}
                                  className="h-8 px-3 text-xs md:h-6 md:px-2"
                                  aria-label="Delete bookmark"
                                >
                                  <Trash2 className="w-4 h-4 md:w-3 md:h-3" />
                                </Button>
                              </div>
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
        {/* Bookmark Detail Modal */}
        <Dialog
          open={isBookmarkModalOpen}
          onOpenChange={setIsBookmarkModalOpen}
        >
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-primary" />
                Saved Response
              </DialogTitle>
            </DialogHeader>
            {selectedBookmark && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Saved on{" "}
                      {new Date(
                        selectedBookmark.created_at
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedBookmark.location}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Question</h3>
                    <p className="text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      {selectedBookmark.query}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">AI Response</h3>
                    <div className="prose prose-sm max-w-none bg-muted/30 p-4 rounded-lg">
                      <p className="whitespace-pre-wrap m-0">
                        {selectedBookmark.content}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() => copyToClipboard(selectedBookmark.content)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Response
                  </Button>
                  <Button
                    onClick={() => {
                      setQuery(selectedBookmark.query);
                      setLocation(selectedBookmark.location);
                      setIsBookmarkModalOpen(false);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search Again
                  </Button>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-xs text-amber-800 dark:text-amber-200">
                    <strong>⚠️ Legal Disclaimer:</strong> This information is
                    for general guidance only and should not be considered legal
                    advice.
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
