"use client";

import { useState, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";

function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Redirect to the original page or home
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
      router.refresh();
    }
  };

  const redirectParam = searchParams.get("redirect");

  return (
    <div className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-gray-400">Join SortMyScene today</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Sign Up Form */}
      <form onSubmit={handleSignUp} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 rounded-lg"
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      {/* Login Link */}
      <p className="text-center text-gray-400 mt-6">
        Already have an account?{" "}
        <Link 
          href={redirectParam ? `/login?redirect=${encodeURIComponent(redirectParam)}` : "/login"} 
          className="text-purple-400 hover:text-purple-300 font-medium"
        >
          login
        </Link>
      </p>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="pt-12 pb-12 px-6 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/login" className="inline-flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-purple-500 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-purple-500"></div>
              </div>
              <span className="text-white font-bold text-xl tracking-wide">
                SORT<span className="text-purple-400">MY</span>SCENE
              </span>
            </Link>
          </div>

          <Suspense fallback={
            <div className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800 animate-pulse">
              <div className="h-8 bg-zinc-800 rounded w-48 mx-auto mb-8"></div>
              <div className="space-y-4">
                <div className="h-12 bg-zinc-800 rounded"></div>
                <div className="h-12 bg-zinc-800 rounded"></div>
                <div className="h-12 bg-zinc-800 rounded"></div>
                <div className="h-12 bg-zinc-800 rounded"></div>
                <div className="h-12 bg-zinc-800 rounded"></div>
              </div>
            </div>
          }>
            <SignUpForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
