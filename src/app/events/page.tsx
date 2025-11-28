"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar, ChevronDown } from "lucide-react";
import { FeaturedCarousel } from "@/components/sections/FeaturedCarousel";

// Sample events data
const popularEvents = [
  {
    id: 1,
    title: "Backstage Siblings Ft Saahil...",
    venue: "Phoenix Marketcity, Mumbai",
    date: "Sat Dec 06",
    price: 799,
    city: "MUMBAI",
  },
  {
    id: 2,
    title: "Backstage Siblings Ft Saahil...",
    venue: "The Legacy, Kolkata",
    date: "Sun Dec 21",
    price: 799,
    city: "KOLKATA",
  },
  {
    id: 3,
    title: "Holipurim Festival 2026",
    venue: "Viraya X Holi Purim Village, Pushkar",
    date: "Tue Mar 03 - Thu Mar 05",
    price: 4999,
    city: "PUSHKAR",
  },
  {
    id: 4,
    title: "Backstage Siblings Ft Saahil...",
    venue: "Phoenix Marketcity Pune, Pune",
    date: "Sun Nov 30",
    price: 799,
    city: "PUNE",
  },
  {
    id: 5,
    title: "Rodolphe Manoukian Live At...",
    venue: "Bombay Cocktail Bar, Mumbai",
    date: "Thu Dec 04",
    price: 1425,
    city: "MUMBAI",
  },
  {
    id: 6,
    title: "Ocha Music Festival - Volume...",
    venue: "The Grounds @ Chakola Mill, Kochi",
    date: "Sat Dec 06 - Sun Dec 07",
    price: 959,
    city: "KOCHI",
  },
  {
    id: 7,
    title: "Tura Winter Carnival",
    venue: "Serenity Grove, Tura",
    date: "Fri Dec 12",
    price: 499,
    city: "TURA",
  },
  {
    id: 8,
    title: "Raeeth Experience Presente...",
    venue: "Raeeth, Goa",
    date: "Thu Dec 25 - Wed Dec 31",
    price: 1190,
    city: "GOA",
  },
];

const trendingVenues = [
  {
    id: 1,
    title: "Phoenix Marketcity",
    venue: "Mumbai, Maharashtra",
    date: "Multiple Events",
    price: 500,
    city: "MUMBAI",
  },
  {
    id: 2,
    title: "The Legacy",
    venue: "Alipore, Kolkata",
    date: "Multiple Events",
    price: 750,
    city: "KOLKATA",
  },
  {
    id: 3,
    title: "Serenity Grove",
    venue: "Tura, Meghalaya",
    date: "Multiple Events",
    price: 499,
    city: "TURA",
  },
  {
    id: 4,
    title: "Bombay Cocktail Bar",
    venue: "Mumbai, Maharashtra",
    date: "Multiple Events",
    price: 1000,
    city: "MUMBAI",
  },
];

const cardGradients = [
  "from-amber-400 via-orange-300 to-yellow-200",
  "from-blue-900 via-indigo-800 to-purple-900",
  "from-pink-500 via-purple-500 to-violet-600",
  "from-amber-300 via-yellow-200 to-orange-300",
  "from-amber-700 via-yellow-600 to-amber-500",
  "from-red-600 via-orange-500 to-red-700",
  "from-orange-400 via-amber-300 to-yellow-400",
  "from-slate-800 via-gray-700 to-slate-900",
];

function EventCard({
  event,
  index,
}: {
  event: (typeof popularEvents)[0];
  index: number;
}) {
  const gradient = cardGradients[index % cardGradients.length];

  return (
    <Link href={`/events/${event.id}`} className="group cursor-pointer block">
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
        <div
          className={`absolute inset-0 bg-linear-to-br ${gradient} flex items-center justify-center`}
        >
          <div className="absolute top-4 left-0 right-0 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg tracking-wider">
              {event.city}
            </h3>
          </div>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-black/40 to-transparent"></div>
        </div>
        <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/20 transition-colors duration-300"></div>
      </div>
      <div className="space-y-1">
        <p className="text-purple-400 text-sm font-medium">{event.date}</p>
        <h4 className="text-white font-semibold truncate group-hover:text-purple-300 transition-colors">
          {event.title}
        </h4>
        <p className="text-gray-400 text-sm truncate">{event.venue}</p>
        <p className="text-gray-300 text-sm">
          From <span className="font-semibold">₹{event.price.toLocaleString()}</span>
        </p>
      </div>
    </Link>
  );
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"events" | "venues">("events");
  const [searchQuery, setSearchQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const genres = ["House", "Techno", "Afro House", "Festival", "Electronic", "Hard Techno"];

  // Filter events based on search criteria
  const filterItems = (items: typeof popularEvents) => {
    return items.filter((item) => {
      const matchesSearch = searchQuery === "" || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.venue.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCity = cityQuery === "" || 
        item.city.toLowerCase().includes(cityQuery.toLowerCase()) ||
        item.venue.toLowerCase().includes(cityQuery.toLowerCase());

      return matchesSearch && matchesCity;
    });
  };

  const baseItems = activeTab === "events" ? popularEvents : trendingVenues;
  const displayedItems = filterItems(baseItems);

  const handleSearch = () => {
    // The filtering is already reactive, but this can be used for API calls
    console.log("Searching:", { searchQuery, cityQuery, selectedGenre });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCityQuery("");
    setSelectedGenre("");
  };

  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Featured Events Slideshow */}
      <section className="pt-24 pb-8 px-6">
        <div className="container mx-auto">
          <FeaturedCarousel />
        </div>
      </section>

      {/* Tabs & Filters */}
      <section className="pb-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab("events")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "events"
                  ? "bg-white text-black"
                  : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
              }`}
            >
              Popular Events
            </button>
            <button
              onClick={() => setActiveTab("venues")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "venues"
                  ? "bg-white text-black"
                  : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
              }`}
            >
              Trending Venues
            </button>
          </div>

          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Search by Event Name or Venue */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Event Name or Venue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-full px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors pr-12"
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>

            {/* Search City */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search City"
                value={cityQuery}
                onChange={(e) => setCityQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-full px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors pr-12"
              />
              <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>

            {/* Date Range */}
            <div className="relative">
              <button className="w-full bg-zinc-950 border border-zinc-700 rounded-full px-5 py-3.5 text-gray-400 flex items-center justify-between cursor-pointer hover:border-zinc-600 transition-colors">
                <div className="flex items-center gap-3">
                  <span>Start Date</span>
                  <span className="text-gray-600">→</span>
                  <span>End Date</span>
                </div>
                <Calendar className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Search Genre */}
            <div className="relative">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-full px-5 py-3.5 text-gray-400 cursor-pointer hover:border-zinc-600 transition-colors appearance-none"
              >
                <option value="">Search Genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre} className="bg-zinc-900 text-white">
                    {genre}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={handleSearch}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-full"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Events
            </Button>
            {(searchQuery || cityQuery || selectedGenre) && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-zinc-700 text-gray-400 hover:text-white hover:border-zinc-500 px-6 py-3 rounded-full"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Results Count */}
          {(searchQuery || cityQuery) && (
            <p className="text-gray-400 mb-6">
              Found <span className="text-white font-semibold">{displayedItems.length}</span> {activeTab === "events" ? "events" : "venues"}
              {searchQuery && <span> matching &quot;{searchQuery}&quot;</span>}
              {cityQuery && <span> in &quot;{cityQuery}&quot;</span>}
            </p>
          )}

          {/* No Results */}
          {displayedItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No {activeTab === "events" ? "events" : "venues"} found matching your criteria.</p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-zinc-700 text-gray-400 hover:text-white hover:border-zinc-500"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Events Grid */}
          {displayedItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {displayedItems.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-6 rounded-full"
            >
              Load More
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
