"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { navLinks } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "bg-cream/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "font-serif text-xl md:text-2xl tracking-tight transition-colors",
            scrolled || !isHome ? "text-charcoal" : "text-white"
          )}
        >
          R <span className="text-gold">&</span> L
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm tracking-wide transition-colors relative",
                scrolled || !isHome
                  ? "text-charcoal hover:text-gold"
                  : "text-white/90 hover:text-white",
                pathname === link.href && "font-medium"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0.5 left-3 right-3 h-px bg-gold" />
              )}
            </Link>
          ))}
          <Link href="/rsvp">
            <Button
              size="sm"
              className="ml-3 bg-gold hover:bg-gold/90 text-white font-medium tracking-wide"
            >
              RSVP
            </Button>
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(
              "md:hidden p-2 transition-colors cursor-pointer",
              scrolled || !isHome ? "text-charcoal" : "text-white"
            )}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-cream border-l-0">
            <SheetTitle className="font-serif text-2xl text-charcoal mb-8">
              R <span className="text-gold">&</span> L
            </SheetTitle>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base tracking-wide transition-colors rounded-md",
                    pathname === link.href
                      ? "text-gold font-medium bg-gold/5"
                      : "text-charcoal hover:text-gold hover:bg-gold/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/rsvp" onClick={() => setOpen(false)} className="mt-4">
                <Button className="w-full bg-gold hover:bg-gold/90 text-white font-medium tracking-wide">
                  RSVP
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
