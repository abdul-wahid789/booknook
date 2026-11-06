import { BooksListSkeleton } from "@/components/all-books/BooksListSkeleton";
import Banner from "@/components/home/Banner";
import { HowItWorks } from "@/components/home/HowWorks";
import NewArrival from "@/components/home/NewArrival";
import { NewArrivalSkeleton } from "@/components/home/NewArrivalSkeleton";
import { ShareBookCTA } from "@/components/home/ShareBookCTA";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Banner />
      <Suspense fallback={<NewArrivalSkeleton count={6} />}>
        <NewArrival />
      </Suspense>
      <HowItWorks />
      <ShareBookCTA />
    </main>
  );
}
