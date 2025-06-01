"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createClient } from '@supabase/supabase-js'
import { Bookmark, History, Search } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface SearchHistory {
  id: string
  query: string
  location: string
  created_at: string
}

interface Bookmark {
  id: string
  title: string
  content: string
  created_at: string
}

export default function DashboardPage() {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUserData()
  }, [])

  async function fetchUserData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Fetch search history
        const { data: historyData } = await supabase
          .from('search_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
        
        if (historyData) setSearchHistory(historyData)

        // Fetch bookmarks
        const { data: bookmarkData } = await supabase
          .from('bookmarks')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
        
        if (bookmarkData) setBookmarks(bookmarkData)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedLocation || !query) return

    setLoading(true)
    try {
      // Here you would integrate with OpenAI for the legal interpretation
      // For now, we'll just save the search to history
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        await supabase.from('search_history').insert({
          user_id: user.id,
          query,
          location: selectedLocation
        })

        await fetchUserData()
      }
    } catch (error) {
      console.error('Error performing search:', error)
    }
    setLoading(false)
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Search Area */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ask About Local Laws</CardTitle>
              <CardDescription>
                Select your location and ask your question about local laws and regulations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ny">New York, NY</SelectItem>
                    <SelectItem value="la">Los Angeles, CA</SelectItem>
                    <SelectItem value="ch">Chicago, IL</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about local laws..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Button type="submit" disabled={loading}>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Search Results would go here */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Searches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Recent Searches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {searchHistory.map((item) => (
                  <div key={item.id} className="py-2 border-b last:border-0">
                    <p className="font-medium">{item.location}</p>
                    <p className="text-sm text-muted-foreground">{item.query}</p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Bookmarks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="w-5 h-5" />
                Bookmarks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {bookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="py-2 border-b last:border-0">
                    <p className="font-medium">{bookmark.title}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {bookmark.content}
                    </p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}