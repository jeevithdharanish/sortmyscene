import { Header } from "@/components/layout/Header";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Sample event data - in real app this would come from API/database
const eventData: Record<string, {
  id: string;
  title: string;
  dateTime: string;
  venue: string;
  genres: string[];
  price: number;
  description?: string;
  attendeesCount: number;
  organizer: {
    name: string;
    followers: number;
  };
}> = {
  "1": {
    id: "1",
    title: "Backstage Siblings Ft Saahil",
    dateTime: "Sat Dec 06, 08:00 PM To 01:00 AM",
    venue: "Phoenix Marketcity, Mumbai",
    genres: ["House", "Techno", "Afro House"],
    price: 799,
    attendeesCount: 45,
    organizer: { name: "Backstage Productions", followers: 234 },
  },
  "2": {
    id: "2",
    title: "Dance Week",
    dateTime: "Thu Nov 27 - Sat Nov 29, 08:00 PM To 01:00 AM",
    venue: "Edm Hostel, Dharmshala",
    genres: ["House", "Techno", "Afro House", "Hard Techno"],
    price: 2000,
    attendeesCount: 117,
    organizer: { name: "Edm Hostel", followers: 117 },
  },
  "3": {
    id: "3",
    title: "Holipurim Festival 2026",
    dateTime: "Tue Mar 03 - Thu Mar 05, 12:00 PM Onwards",
    venue: "Viraya X Holi Purim Village, Pushkar",
    genres: ["Festival", "Electronic", "House"],
    price: 4999,
    attendeesCount: 320,
    organizer: { name: "Viraya Events", followers: 1520 },
  },
};

// Placeholder attendee avatars
const attendeeColors = [
  "bg-purple-500",
  "bg-pink-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
];

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Get event data or use default
  const event = eventData[id] || {
    id,
    title: "Event Details",
    dateTime: "Date & Time TBA",
    venue: "Venue TBA",
    genres: ["Music", "Entertainment"],
    price: 999,
    attendeesCount: 50,
    organizer: { name: "Event Organizer", followers: 100 },
  };

  return (
    <main className="min-h-screen bg-black">
      <Header />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Event Header Section */}
          <div className="bg-zinc-900/50 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Event Image */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-linear-to-br from-red-900 via-orange-800 to-red-950">
                {/* Placeholder event poster */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="text-center">
                    <p className="text-white/60 text-sm tracking-widest mb-2">EDM HOSTEL</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide mb-2">
                      DANCE WEEK
                    </h2>
                    <p className="text-orange-300 text-lg">27, 28, 29, 30 NOV</p>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-black/60 to-transparent"></div>
                  
                  {/* Bottom info */}
                  <div className="absolute bottom-4 left-4 right-4 text-xs text-white/60">
                    <p>UPPER DHARAMKOT DHARAMSHALA HP</p>
                  </div>
                </div>
                
                {/* Swipe indicator */}
                <div className="absolute bottom-4 right-4 text-white/60 text-xs flex items-center gap-1">
                  SWIPE FOR MORE DETAILS
                  <span>→</span>
                </div>
              </div>

              {/* Event Details */}
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {event.title}
                </h1>

                {/* Date & Time */}
                <div className="flex items-start gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                  <p className="text-pink-500 font-medium">{event.dateTime}</p>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-3 mb-6">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <p className="text-white">{event.venue}</p>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {event.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-4 py-2 bg-zinc-800 text-gray-300 rounded-lg text-sm border border-zinc-700"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center gap-6">
                  <div className="text-white">
                    <span className="text-gray-400">From </span>
                    <span className="text-xl font-bold">₹{event.price.toLocaleString()}</span>
                  </div>
                  <Link href={`/events/${id}/tickets`}>
                    <Button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-6 rounded-lg">
                      Get Tickets
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Lowest Price Guarantee Banner */}
          <div className="bg-zinc-900/50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-8">
              {/* 100% Badge */}
              <div className="hidden md:block">
                <div className="w-20 h-20 border-4 border-pink-600 rounded-full flex items-center justify-center rotate-[-15deg]">
                  <div className="text-center">
                    <span className="text-pink-600 font-bold text-xl">100%</span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold">
                  <span className="text-pink-500">LOWEST PRICE </span>
                  <span className="text-white">GUARANTEE</span>
                </h3>
                <p className="text-gray-400 mt-1">
                  If you find a lower price online, we&apos;ll match it
                </p>
              </div>

              {/* Icon */}
              <div className="hidden md:block">
                <div className="text-cyan-400 text-4xl">✳</div>
                <p className="text-gray-500 text-xs mt-1">*T&C Apply</p>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Attendees Section */}
              <div className="bg-zinc-900/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Attendees</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* Avatar stack */}
                    <div className="flex -space-x-3">
                      {attendeeColors.slice(0, 5).map((color, i) => (
                        <div
                          key={i}
                          className={`w-10 h-10 rounded-full ${color} border-2 border-zinc-900 flex items-center justify-center`}
                        >
                          <span className="text-white text-xs">👤</span>
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full bg-purple-600 border-2 border-zinc-900 flex items-center justify-center">
                        <span className="text-white text-xs font-medium">+More</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black rounded-full"
                  >
                    View on App
                  </Button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="bg-zinc-900/50 rounded-2xl p-6">
                <button className="w-full flex items-center justify-between text-left">
                  <h3 className="text-xl font-semibold text-white">Terms & Conditions</h3>
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Venue Section */}
              <div className="bg-zinc-900/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Venue</h3>
                <p className="text-gray-400 mb-4">{event.venue}</p>
                
                {/* Venue Image Placeholder */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-linear-to-br from-green-800 via-emerald-700 to-teal-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white/60">
                      <p className="text-lg">Venue Image</p>
                      <p className="text-sm">Placeholder</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* In Collaboration With */}
              <div className="bg-zinc-900/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">In Collaboration With</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Organizer Logo */}
                    <div className="w-14 h-14 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
                      <span className="text-white text-xs text-center leading-tight font-medium">
                        {event.organizer.name.split(" ").map(w => w[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{event.organizer.name}</h4>
                      <p className="text-gray-400 text-sm">{event.organizer.followers} Followers</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black rounded-full"
                  >
                    Follow
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
