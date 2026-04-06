import { HeroSection } from "@/components/home/HeroSection";
import { WelcomeNote } from "@/components/home/WelcomeNote";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { RsvpCta } from "@/components/home/RsvpCta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WelcomeNote />
      <CountdownTimer />
      <RsvpCta />
    </>
  );
}
