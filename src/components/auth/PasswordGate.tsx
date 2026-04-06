"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

const COOKIE_NAME = "site_access";
const SITE_PASSWORD = "rachelandloren"; // Change this to your desired password

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if already authorized via cookie
    const hasAccess = document.cookie
      .split("; ")
      .some((c) => c.startsWith(`${COOKIE_NAME}=`));
    setAuthorized(hasAccess);
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SITE_PASSWORD) {
      // Set cookie for 30 days
      document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
      setAuthorized(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  if (checking) {
    return null; // Avoid flash while checking cookie
  }

  if (authorized) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="mb-8">
          <p className="font-serif text-4xl md:text-5xl text-charcoal mb-2">
            R <span className="text-gold">&</span> L
          </p>
          <p className="text-sm tracking-widest uppercase text-warm-gray">
            You&apos;re invited
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-gray" />
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password"
              className="pl-10 text-center bg-white"
              autoFocus
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-gold hover:bg-gold/90 text-white font-medium tracking-wide"
          >
            Enter
          </Button>
        </form>

        <p className="mt-6 text-xs text-warm-gray-light">
          Password was included in your invitation
        </p>
      </div>
    </div>
  );
}
