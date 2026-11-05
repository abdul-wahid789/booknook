import type { Metadata } from "next";
import { Inter, Newsreader, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// const newsreader = Newsreader({
//   subsets: ["latin"],
//   style: ["normal", "italic"],
//   variable: "--font-heading",
// });

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "BookNook",
  description: "Book rental website. Where people can rent books and also added their books in the website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", `${inter.variable} ${libreBaskerville.variable}`)}
    >
      <body className="min-h-full flex flex-col w-full">
        <Navbar />
        {children}
        <Footer />
         <Toaster />
      </body>
    </html>
  );
}
