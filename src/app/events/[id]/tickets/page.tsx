"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";

// Mock event data - in real app, fetch from API
const eventData = {
  id: "water-lemon-festival",
  title: "Water Lemon Festival",
  venue: "Dynamo, Goa",
  dateRange: "Fri Nov 28 - Sun Nov 30, 08:00 PM",
  image: "/events/water-lemon.jpg",
  dates: [
    { id: "28th-nov", label: "28th Nov" },
    { id: "29th-nov", label: "29th Nov" },
    { id: "30th-nov", label: "30th Nov" },
    { id: "festival-pass", label: "Festival Pass" },
  ],
  ticketTypes: {
    "28th-nov": [
      {
        id: "solo-day1",
        name: "Solo - Day 1 - 28th Nov",
        description: "Only Entry",
        originalPrice: 1999,
        price: 1899,
      },
      {
        id: "couple-day1",
        name: "Couple - Day 1 - 28th Nov",
        description: "Entry for 2",
        originalPrice: 3499,
        price: 3324,
      },
      {
        id: "group-day1",
        name: "Group of 4 - Day 1 - 28th Nov",
        description: "Entry for 4",
        originalPrice: 6499,
        price: 5999,
      },
    ],
    "29th-nov": [
      {
        id: "solo-day2",
        name: "Solo - Day 2 - 29th Nov",
        description: "Only Entry",
        originalPrice: 1999,
        price: 1899,
      },
      {
        id: "couple-day2",
        name: "Couple - Day 2 - 29th Nov",
        description: "Entry for 2",
        originalPrice: 3499,
        price: 3324,
      },
    ],
    "30th-nov": [
      {
        id: "solo-day3",
        name: "Solo - Day 3 - 30th Nov",
        description: "Only Entry",
        originalPrice: 1999,
        price: 1899,
      },
      {
        id: "couple-day3",
        name: "Couple - Day 3 - 30th Nov",
        description: "Entry for 2",
        originalPrice: 3499,
        price: 3324,
      },
    ],
    "festival-pass": [
      {
        id: "solo-pass",
        name: "Solo - Festival Pass",
        description: "All 3 days entry",
        originalPrice: 4999,
        price: 4499,
      },
      {
        id: "couple-pass",
        name: "Couple - Festival Pass",
        description: "All 3 days entry for 2",
        originalPrice: 8999,
        price: 7999,
      },
    ],
  },
};

type TicketSelection = {
  [ticketId: string]: number;
};

export default function TicketsPage() {
  const params = useParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("28th-nov");
  const [ticketSelections, setTicketSelections] = useState<TicketSelection>({});

  const steps = [
    { id: 1, label: "Tickets" },
    { id: 2, label: "Attendee Info" },
    { id: 3, label: "Payment" },
  ];

  const currentTickets = eventData.ticketTypes[selectedDate as keyof typeof eventData.ticketTypes] || [];

  const handleQuantityChange = (ticketId: string, quantity: number) => {
    setTicketSelections((prev) => ({
      ...prev,
      [ticketId]: quantity,
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    Object.entries(ticketSelections).forEach(([ticketId, quantity]) => {
      // Find the ticket in all date categories
      Object.values(eventData.ticketTypes).forEach((tickets) => {
        const ticket = tickets.find((t) => t.id === ticketId);
        if (ticket) {
          total += ticket.price * quantity;
        }
      });
    });
    return total;
  };

  const totalAmount = calculateTotal();

  const handleProceed = () => {
    if (totalAmount > 0) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full border-2 border-purple-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-purple-500"></div>
              </div>
              <span className="text-white font-bold text-lg tracking-wide">
                SORT<span className="text-purple-400">MY</span>SCENE
              </span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                Events
              </Link>
              <Link href="/list-event" className="text-gray-300 hover:text-white transition-colors">
                List Your Event
              </Link>
              <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Event Info Banner */}
      <div className="py-8 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-6">
          {/* Event Image */}
          <div className="w-32 h-40 bg-gradient-to-br from-blue-500 to-green-400 rounded-lg overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-xs p-2 text-center">
              Water Lemon Festival
            </div>
          </div>

          {/* Event Details */}
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{eventData.title}</h1>
            <p className="text-gray-400 mb-1">{eventData.venue}</p>
            <p className="text-gray-500 text-sm">{eventData.dateRange}</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="py-6 px-6">
        <div className="max-w-md mx-auto flex items-center justify-center gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    currentStep > step.id
                      ? "bg-pink-500 border-pink-500"
                      : currentStep === step.id
                      ? "border-gray-500 bg-transparent"
                      : "border-gray-600 bg-transparent"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <div
                      className={`w-2 h-2 rounded-full ${
                        currentStep === step.id ? "bg-gray-400" : "bg-transparent"
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    currentStep >= step.id ? "text-white" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-8 h-px bg-gray-600 mx-3" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Selection */}
      {currentStep === 1 && (
        <div className="py-6 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Select Tickets</h2>
                <button className="text-cyan-400 hover:text-cyan-300 text-sm">
                  Table Layout
                </button>
              </div>

              {/* Date Tabs */}
              <div className="flex gap-3 mb-8">
                {eventData.dates.map((date) => (
                  <button
                    key={date.id}
                    onClick={() => setSelectedDate(date.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDate === date.id
                        ? "bg-cyan-500 text-white"
                        : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                    }`}
                  >
                    {date.label}
                  </button>
                ))}
              </div>

              {/* Ticket List */}
              <div className="space-y-6">
                {currentTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between py-4 border-b border-zinc-800 last:border-0"
                  >
                    <div>
                      <h3 className="text-white font-medium text-lg">{ticket.name}</h3>
                      <p className="text-cyan-400 text-sm">{ticket.description}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-gray-500 line-through text-sm">
                          Rs. {ticket.originalPrice.toLocaleString()}
                        </p>
                        <p className="text-white font-semibold text-lg">
                          Rs. {ticket.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="relative">
                        <select
                          value={ticketSelections[ticket.id] || 0}
                          onChange={(e) =>
                            handleQuantityChange(ticket.id, parseInt(e.target.value))
                          }
                          className="appearance-none bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-zinc-600 min-w-[80px]"
                        >
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendee Info Step */}
      {currentStep === 2 && (
        <div className="py-6 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Attendee Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Step */}
      {currentStep === 3 && (
        <div className="py-6 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Payment</h2>
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Payment integration coming soon</p>
                <p className="text-2xl font-bold text-white">
                  Total: ₹{totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Ticket Total</p>
            <p className="text-white text-2xl font-bold">₹{totalAmount.toLocaleString()}</p>
          </div>
          <Button
            onClick={handleProceed}
            disabled={totalAmount === 0 && currentStep === 1}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === 3 ? "Pay Now" : "Proceed"}
          </Button>
        </div>
      </div>

      {/* Spacer for fixed bottom bar */}
      <div className="h-24" />
    </main>
  );
}
