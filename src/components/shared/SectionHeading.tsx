import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  subtitle,
  className,
  alignment = "center",
}: {
  title: string;
  subtitle?: string;
  className?: string;
  alignment?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        alignment === "center" && "text-center",
        className
      )}
    >
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-6 h-px w-16 bg-gold",
          alignment === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
