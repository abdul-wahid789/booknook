import Banner from "@/components/home/Banner";
import { HowItWorks } from "@/components/home/HowWorks";
import NewArrival from "@/components/home/NewArrival";
import { ShareBookCTA } from "@/components/home/ShareBookCTA";
import { StatsSection } from "@/components/home/StatsSection";

export default function Home() {
  return (
    <main>
      <Banner />
      <NewArrival />
      <HowItWorks />
      <ShareBookCTA />
    </main>
  );
}
