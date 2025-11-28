"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, Ticket } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
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

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/events"
              className="text-white hover:text-purple-300 transition-colors font-medium"
            >
              Events
            </Link>
            <Link
              href="/list-event"
              className="text-white hover:text-purple-300 transition-colors font-medium"
            >
              List Your Event
            </Link>

            {/* Auth Section */}
            {loading ? (
              <div className="h-10 w-10 rounded-full border-2 border-white/20 animate-pulse bg-zinc-800"></div>
            ) : user ? (
              /* User Dropdown - Logged In */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full border-2 border-purple-500 hover:border-purple-400 transition-colors bg-purple-500/20"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-medium text-sm">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-zinc-900 border-zinc-800"
                  align="end"
                >
                  <div className="px-2 py-2 border-b border-zinc-800">
                    <p className="text-white font-medium truncate">
                      {user.user_metadata?.full_name || "User"}
                    </p>
                    <p className="text-gray-400 text-sm truncate">{user.email}</p>
                  </div>
                  <DropdownMenuItem className="text-white hover:bg-zinc-800 cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-zinc-800 cursor-pointer">
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>My Tickets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-zinc-800 cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem 
                    className="text-red-400 hover:bg-zinc-800 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Login/Signup Buttons - Not Logged In */
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-purple-300 hover:bg-transparent"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
