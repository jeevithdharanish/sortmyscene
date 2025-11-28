"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Featured events for slideshow
const featuredEvents = [
  {
    id: "housewerk-dec-27-2025",
    title: "HOUSEWERK",
    subtitle: "BY DAY",
    artists: "ARJUN VAGALE B2B ANYASA",
    time: "5PM TO CLOSE",
    date: "27.12.25 SATURDAY",
    venue: "BAY VIEW LAWNS MUMBAI",
    bgColor: "from-sky-400 to-sky-500",
  },
  {
    id: "cassian-dec-04-2025",
    title: "CASSIAN",
    subtitle: "AFTERLIFE",
    artists: "CASSIAN",
    time: "9 PM ONWARDS",
    date: "THURSDAY 4TH DEC",
    venue: "MUMBAI",
    bgColor: "from-red-900 to-red-950",
  },
  {
    id: "transitions-nov-27-2025",
    title: "TRANSITIONS",
    subtitle: "SALUD GOA",
    artists: "CHIKKI • COCO • KNIGHTMARE • TECHOE • VARANUS",
    time: "9 PM ONWARDS",
    date: "27.11 THURSDAY",
    venue: "SALUD, GOA",
    bgColor: "from-purple-600 to-pink-600",
  },
];

export function FeaturedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Carousel */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {featuredEvents.map((event) => (
            <div key={event.id} className="flex-none w-full min-w-0">
              <Link href={`/events/${event.id}`} className="block">
                <div className="relative aspect-video cursor-pointer group">
                  {/* Background */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${event.bgColor}`}
                  >
                    {/* Decorative elements based on event */}
                    {event.id === "housewerk-dec-27-2025" && (
                      <>
                        {/* Sun */}
                        <div className="absolute top-12 left-16 w-12 h-12 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
                        <div className="absolute top-10 left-14 w-4 h-4 bg-yellow-300 rounded-full blur-sm"></div>
                        
                        {/* Clouds */}
                        <div className="absolute top-8 right-20 w-20 h-8 bg-white/80 rounded-full blur-sm"></div>
                        <div className="absolute top-6 right-24 w-12 h-6 bg-white/60 rounded-full blur-sm"></div>
                        <div className="absolute top-20 left-1/3 w-16 h-6 bg-white/70 rounded-full blur-sm"></div>
                        
                        {/* Bridge silhouette */}
                        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-white/30"></div>
                        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/4 w-1 h-32 bg-white/40 -rotate-12 origin-bottom"></div>
                        <div className="absolute bottom-1/4 left-1/2 translate-x-0 w-1 h-40 bg-white/40 origin-bottom"></div>
                        <div className="absolute bottom-1/4 left-1/2 translate-x-1/4 w-1 h-32 bg-white/40 rotate-12 origin-bottom"></div>
                        
                        {/* Water */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-sky-600/50"></div>
                      </>
                    )}

                    {event.id === "cassian-dec-04-2025" && (
                      <>
                        {/* Stage lights */}
                        <div className="absolute top-0 left-1/4 w-32 h-48 bg-linear-to-b from-white/20 to-transparent blur-xl -rotate-12"></div>
                        <div className="absolute top-0 right-1/4 w-32 h-48 bg-linear-to-b from-white/20 to-transparent blur-xl rotate-12"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-red-500/30 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-black/60 to-transparent"></div>
                      </>
                    )}

                    {event.id === "transitions-nov-27-2025" && (
                      <>
                        {/* Abstract shapes */}
                        <div className="absolute top-10 right-10 w-24 h-24 border-4 border-pink-300/30 rounded-full"></div>
                        <div className="absolute bottom-20 left-10 w-16 h-16 bg-purple-400/20 rounded-full blur-xl"></div>
                        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl"></div>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                    {/* Top section */}
                    <div className="text-center">
                      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider drop-shadow-lg">
                        {event.title}
                      </h2>
                      <p className="text-white/80 text-sm md:text-base tracking-widest mt-1">
                        {event.subtitle}
                      </p>
                    </div>

                    {/* Bottom section */}
                    <div className="flex items-end justify-between">
                      <div className="text-left">
                        <p className="text-white/90 text-xs md:text-sm font-medium">
                          {event.date}
                        </p>
                      </div>
                      <div className="text-center flex-1">
                        <p className="text-white font-bold text-sm md:text-xl tracking-wide">
                          {event.artists}
                        </p>
                        <p className="text-white/80 text-xs md:text-sm">
                          {event.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/90 text-xs md:text-sm font-medium">
                          {event.venue}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {featuredEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === selectedIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
