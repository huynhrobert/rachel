import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { PasswordGate } from "@/components/auth/PasswordGate";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PasswordGate>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </PasswordGate>
  );
}
