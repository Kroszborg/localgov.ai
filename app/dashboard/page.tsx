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
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

      console.log("✅ Dashboard loaded for:", session.user.email);
      setUser(session.user);

      // Mock some recent data for better UX
      setSearchHistory([
        {
          id: "1",
          query: "noise ordinance rules",
          location: "New York, NY",
          created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
        {
          id: "2",
          query: "parking regulations downtown",
          location: "Los Angeles, CA",
          created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
      ]);

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
      console.error("❌ Dashboard error:", error);
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

        // Add to search history
        const newSearch = {
          id: Date.now().toString(),
          query: query.trim(),
          location: location.trim(),
          created_at: new Date().toISOString(),
        };
        setSearchHistory((prev) => [newSearch, ...prev].slice(0, 10));
      } else {
        const errorData = await response.json();
        setSearchResult(
          errorData.error ||
            "Sorry, there was an error processing your request. Please try again."
        );
      }
    } catch (error) {
      console.error("❌ Search error:", error);
      setSearchResult("An error occurred while processing your request.");
    } finally {
      setSearching(false);
    }
  }

  async function saveBookmark() {
    if (!searchResult || !user || !query) return;

    const newBookmark = {
      id: Date.now().toString(),
      title: query.slice(0, 100),
      content: searchResult.slice(0, 300) + "...",
      created_at: new Date().toISOString(),
    };

    setBookmarks((prev) => [newBookmark, ...prev].slice(0, 10));
    console.log("📌 Bookmark saved!");
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const removeFromHistory = (id: string) => {
    setSearchHistory((prev) => prev.filter((item) => item.id !== id));
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
        {/* Enhanced Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
            <div className="hidden md:flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                <Star className="w-3 h-3 mr-1" />
                Premium Features Coming Soon
              </Badge>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Main Search Area */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
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
                        <AnimatePresence>
                          {showLocationSuggestions && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg max-h-48 overflow-y-auto"
                            >
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
                            </motion.div>
                          )}
                        </AnimatePresence>
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

                {/* Enhanced Example Questions */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Popular questions:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {exampleQuestions.map((example, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                          onClick={() => setQuery(example)}
                        >
                          {example}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Search Results */}
            <AnimatePresence>
              {(searchResult || searching) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
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
                              information is for general guidance only and
                              should not be considered legal advice. Always
                              consult with a qualified legal professional for
                              specific legal matters.
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Enhanced Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Enhanced Recent Searches */}
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
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
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
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFromHistory(item.id);
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                        </motion.div>
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

            {/* Enhanced Bookmarks */}
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
                        <motion.div
                          key={bookmark.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 rounded-lg border bg-card hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="space-y-2">
                            <p className="font-medium text-sm leading-tight">
                              {bookmark.title}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-3">
                              {bookmark.content}
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
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(bookmark.content)
                                }
                                className="h-6 px-2 text-xs"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
