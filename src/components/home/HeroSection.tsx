"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { weddingConfig } from "@/config/wedding";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay (placeholder until real photo) */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/70" />
      <div className="absolute inset-0 bg-[url('/images/hero/main.jpg')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-charcoal/40" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase text-white/80 mb-4"
        >
          Together with their families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6"
        >
          {weddingConfig.couple.person1.name}
          <span className="block text-gold text-3xl sm:text-4xl md:text-5xl my-2 md:my-4">
            &
          </span>
          {weddingConfig.couple.person2.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-2"
        >
          <p className="text-lg md:text-xl tracking-widest uppercase text-white/90">
            {weddingConfig.displayDate}
          </p>
          <p className="text-base md:text-lg text-white/70">
            {weddingConfig.venue.city}
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
