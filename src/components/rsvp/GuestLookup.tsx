"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import type { RsvpGroupData } from "./types";

export function GuestLookup({
  onGroupFound,
}: {
  onGroupFound: (data: RsvpGroupData) => void;
}) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"name" | "code">("name");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<RsvpGroupData[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const param = mode === "code" ? `code=${encodeURIComponent(query.trim())}` : `q=${encodeURIComponent(query.trim())}`;
      const res = await fetch(`/api/rsvp/lookup?${param}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      if (data.groups.length === 1) {
        onGroupFound(data.groups[0]);
      } else {
        setResults(data.groups);
      }
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedSection>
      <Card className="bg-white border-border">
        <CardContent className="pt-6 space-y-6">
          {/* Toggle between name and code */}
          <div className="flex gap-2 justify-center">
            <Button
              variant={mode === "name" ? "default" : "outline"}
              size="sm"
              onClick={() => { setMode("name"); setError(""); setResults([]); }}
              className={mode === "name" ? "bg-charcoal text-cream" : ""}
            >
              Search by Name
            </Button>
            <Button
              variant={mode === "code" ? "default" : "outline"}
              size="sm"
              onClick={() => { setMode("code"); setError(""); setResults([]); }}
              className={mode === "code" ? "bg-charcoal text-cream" : ""}
            >
              Invitation Code
            </Button>
          </div>

          {/* Search input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-gray" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder={
                  mode === "name"
                    ? "Enter your first or last name"
                    : "Enter your invitation code (e.g., SMITH2026)"
                }
                className="pl-10"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className="bg-gold hover:bg-gold/90 text-white"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Find"}
            </Button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-center text-destructive">{error}</p>
          )}

          {/* Multiple results */}
          {results.length > 1 && (
            <div className="space-y-3">
              <p className="text-sm text-warm-gray text-center">
                We found multiple matches. Please select your party:
              </p>
              {results.map((group) => (
                <button
                  key={group.id}
                  onClick={() => onGroupFound(group)}
                  className="w-full text-left p-4 rounded-lg border border-border hover:border-gold hover:bg-gold/5 transition-colors"
                >
                  <p className="font-medium text-charcoal">{group.name}</p>
                  <p className="text-sm text-warm-gray">
                    {group.guests.map((g) => `${g.firstName} ${g.lastName}`).join(", ")}
                  </p>
                </button>
              ))}
            </div>
          )}

          {/* Help text */}
          <p className="text-xs text-center text-warm-gray-light">
            Can&apos;t find your name? Try using your invitation code, or{" "}
            <a href="mailto:rachel@example.com" className="text-gold underline">
              contact us
            </a>{" "}
            for help.
          </p>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
