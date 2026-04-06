"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { galleryPhotos } from "@/config/gallery";

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryPhotos.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length
      );
    }
  };

  return (
    <section className="pt-28 md:pt-32 pb-20 md:pb-28">
      <Container>
        <SectionHeading
          title="Gallery"
          subtitle="A glimpse into our journey together"
        />

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
          {galleryPhotos.map((photo, index) => (
            <AnimatedSection key={photo.src} delay={index * 0.05}>
              <button
                onClick={() => openLightbox(index)}
                className="mb-3 md:mb-4 block w-full overflow-hidden rounded-lg group cursor-pointer break-inside-avoid"
              >
                <div
                  className="relative bg-sage/10"
                  style={{
                    aspectRatio: `${photo.width}/${photo.height}`,
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {photo.caption && (
                  <p className="mt-1.5 text-xs text-warm-gray text-left">
                    {photo.caption}
                  </p>
                )}
              </button>
            </AnimatedSection>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={(e) => {
              if (e.key === "Escape") closeLightbox();
              if (e.key === "ArrowRight") goNext();
              if (e.key === "ArrowLeft") goPrev();
            }}
            tabIndex={0}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10 p-2"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-2 md:left-4 text-white/80 hover:text-white z-10 p-2"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "90vw",
                  maxHeight: "85vh",
                  aspectRatio: `${galleryPhotos[lightboxIndex].width}/${galleryPhotos[lightboxIndex].height}`,
                }}
              >
                <Image
                  src={galleryPhotos[lightboxIndex].src}
                  alt={galleryPhotos[lightboxIndex].alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>
              {galleryPhotos[lightboxIndex].caption && (
                <p className="text-center text-white/70 text-sm mt-3">
                  {galleryPhotos[lightboxIndex].caption}
                </p>
              )}
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-2 md:right-4 text-white/80 hover:text-white z-10 p-2"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Counter */}
            <p className="absolute bottom-4 text-white/50 text-sm">
              {lightboxIndex + 1} / {galleryPhotos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
