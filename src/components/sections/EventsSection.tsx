"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Sample events data (placeholder)
const popularEvents = [
  {
    id: 1,
    title: "Backstage Siblings Ft Saahil...",
    venue: "Phoenix Marketcity, Mumbai",
    date: "Sat Dec 06",
    price: 799,
    image: null,
    city: "MUMBAI",
  },
  {
    id: 2,
    title: "Backstage Siblings Ft Saahil...",
    venue: "The Legacy, Kolkata",
    date: "Sun Dec 21",
    price: 799,
    image: null,
    city: "KOLKATA",
  },
  {
    id: 3,
    title: "Holipurim Festival 2026",
    venue: "Viraya X Holi Purim Village, Pushkar",
    date: "Tue Mar 03 - Thu Mar 05",
    price: 4999,
    image: null,
    city: "PUSHKAR",
  },
  {
    id: 4,
    title: "Backstage Siblings Ft Saahil...",
    venue: "Phoenix Marketcity Pune, Pune",
    date: "Sun Nov 30",
    price: 799,
    image: null,
    city: "PUNE",
  },
  {
    id: 5,
    title: "Rodolphe Manoukian Live At...",
    venue: "Bombay Cocktail Bar, Mumbai",
    date: "Thu Dec 04",
    price: 1425,
    image: null,
    city: "MUMBAI",
  },
  {
    id: 6,
    title: "Ocha Music Festival - Volume...",
    venue: "The Grounds @ Chakola Mill, Kochi",
    date: "Sat Dec 06 - Sun Dec 07",
    price: 959,
    image: null,
    city: "KOCHI",
  },
  {
    id: 7,
    title: "Tura Winter Carnival",
    venue: "Serenity Grove, Tura",
    date: "Fri Dec 12",
    price: 499,
    image: null,
    city: "TURA",
  },
  {
    id: 8,
    title: "Raeeth Experience Presente...",
    venue: "Raeeth, Goa",
    date: "Thu Dec 25 - Wed Dec 31",
    price: 1190,
    image: null,
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
    image: null,
    city: "MUMBAI",
  },
  {
    id: 2,
    title: "The Legacy",
    venue: "Alipore, Kolkata",
    date: "Multiple Events",
    price: 750,
    image: null,
    city: "KOLKATA",
  },
  {
    id: 3,
    title: "Serenity Grove",
    venue: "Tura, Meghalaya",
    date: "Multiple Events",
    price: 499,
    image: null,
    city: "TURA",
  },
  {
    id: 4,
    title: "Bombay Cocktail Bar",
    venue: "Mumbai, Maharashtra",
    date: "Multiple Events",
    price: 1000,
    image: null,
    city: "MUMBAI",
  },
];

// Placeholder gradients for event cards
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
    <div className="group cursor-pointer">
      {/* Card Image */}
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
        <div
          className={`absolute inset-0 bg-linear-to-br ${gradient} flex items-center justify-center`}
        >
          {/* City name overlay */}
          <div className="absolute top-4 left-0 right-0 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg tracking-wider">
              {event.city}
            </h3>
          </div>

          {/* Decorative elements */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-black/40 to-transparent"></div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/20 transition-colors duration-300"></div>
      </div>

      {/* Card Content */}
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
    </div>
  );
}

export function EventsSection() {
  const [activeTab, setActiveTab] = useState<"events" | "venues">("events");

  const displayedItems = activeTab === "events" ? popularEvents : trendingVenues;

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Experience </span>
            <span className="text-yellow-400">Exclusivity!</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Find the hottest events and venues in the town! Right here
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12">
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

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayedItems.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/events">
            <Button
              variant="outline"
              size="lg"
              className="!bg-white !text-black hover:!bg-gray-100 font-semibold px-8 py-6 rounded-full border-white"
            >
              View All
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
