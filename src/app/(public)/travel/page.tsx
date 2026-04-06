import Link from "next/link";
import {
  Plane,
  Hotel,
  Car,
  MapPin,
  ExternalLink,
  Utensils,
  Compass,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  airportInfo,
  hotels,
  transportOptions,
  localRecommendations,
} from "@/config/travel";

export default function TravelPage() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <AnimatedSection>
          <SectionHeading
            title="Travel & Accommodations"
            subtitle="Everything you need for your visit"
          />
        </AnimatedSection>

        {/* Getting There */}
        <AnimatedSection delay={0.1}>
          <div className="mb-16 md:mb-20">
            <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-8 text-center">
              Getting There
            </h3>
            <Card className="mx-auto max-w-2xl border-sage-light/30 bg-cream/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-light/30">
                    <Plane className="h-5 w-5 text-sage" />
                  </div>
                  <div>
                    <CardTitle className="font-serif text-lg text-charcoal">
                      {airportInfo.name} ({airportInfo.code})
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 text-warm-gray">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-dusty-rose" />
                    <span>{airportInfo.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-dusty-rose" />
                    <span>{airportInfo.driveTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Where to Stay */}
        <AnimatedSection delay={0.2}>
          <div className="mb-16 md:mb-20">
            <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-8 text-center">
              Where to Stay
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <Card
                  key={hotel.name}
                  className="border-sage-light/30 bg-cream/50"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Hotel className="h-5 w-5 text-sage" />
                      <CardTitle className="font-serif text-lg text-charcoal">
                        {hotel.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <p className="text-warm-gray leading-relaxed">
                      {hotel.description}
                    </p>

                    {hotel.blockCode && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-charcoal font-medium">
                          Room Block:
                        </span>
                        <Badge className="bg-dusty-rose-light text-dusty-rose border-dusty-rose/20">
                          {hotel.blockCode}
                        </Badge>
                      </div>
                    )}

                    {hotel.priceRange && (
                      <p className="text-sm text-warm-gray">
                        <span className="font-medium text-charcoal">
                          Price:
                        </span>{" "}
                        {hotel.priceRange}
                      </p>
                    )}

                    {hotel.distanceToVenue && (
                      <div className="flex items-center gap-2 text-sm text-warm-gray">
                        <MapPin className="h-3.5 w-3.5 text-dusty-rose" />
                        <span>{hotel.distanceToVenue} from venue</span>
                      </div>
                    )}

                    {hotel.bookingUrl && (
                      <Link
                        href={hotel.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          className="mt-2 bg-sage hover:bg-sage/90 text-white font-medium tracking-wide"
                        >
                          Book Now
                          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Getting Around */}
        <AnimatedSection delay={0.3}>
          <div className="mb-16 md:mb-20">
            <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-8 text-center">
              Getting Around
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {transportOptions.map((option) => (
                <Card
                  key={option.name}
                  className="border-sage-light/30 bg-cream/50"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Car className="h-5 w-5 text-sage" />
                      <CardTitle className="font-serif text-lg text-charcoal">
                        {option.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-warm-gray leading-relaxed">
                      {option.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Local Recommendations */}
        <AnimatedSection delay={0.4}>
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-8 text-center">
              Local Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Restaurants */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Utensils className="h-5 w-5 text-dusty-rose" />
                  <h4 className="font-serif text-xl text-charcoal">
                    Restaurants
                  </h4>
                </div>
                <div className="flex flex-col gap-4">
                  {localRecommendations.restaurants.map((item) => (
                    <div key={item.name}>
                      <p className="font-medium text-charcoal">{item.name}</p>
                      <p className="text-sm text-warm-gray mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Things to Do */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Compass className="h-5 w-5 text-dusty-rose" />
                  <h4 className="font-serif text-xl text-charcoal">
                    Things to Do
                  </h4>
                </div>
                <div className="flex flex-col gap-4">
                  {localRecommendations.activities.map((item) => (
                    <div key={item.name}>
                      <p className="font-medium text-charcoal">{item.name}</p>
                      <p className="text-sm text-warm-gray mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
