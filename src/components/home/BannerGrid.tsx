// components/home/BannerGrid.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SlideData } from './Banner';

interface BannerGridProps {
  data: SlideData;
}

export default function BannerGrid({ data }: BannerGridProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/70 bg-card p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm transition-all">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-10 lg:gap-14">

        {/* Left Column: Typography & CTAs (Stacks below image on small screens or clean text-first flow) */}
        <div className="order-2 flex flex-col justify-center space-y-4 sm:space-y-6 md:order-1 md:col-span-7">

          {/* Eyebrow / Kicker */}
          <div className="inline-flex items-center gap-1.5 self-start rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-semibold tracking-wider text-primary uppercase">
            <Sparkles className="h-3 w-3" />
            <span>{data.topText}</span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="font-heading text-3xl font-normal leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="block text-primary">{data.hd1}</span>
              <span className="block italic">{data.hd2}</span>
            </h1>
          </div>

          {/* Body Description */}
          <p className="max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
            {data.des}
          </p>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/all-books">
              <Button className="h-10 sm:h-11 rounded-lg bg-primary px-5 sm:px-6 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-transform active:scale-[0.98]">
                <span>Browse Books</span>
                <ArrowRight className="ml-2 h-4 w-4 stroke-[2]" />
              </Button>
            </Link>
            <Link href="/add-book">
              <Button variant="outline" className="h-10 sm:h-11 rounded-lg border-border bg-card px-5 sm:px-6 text-xs sm:text-sm font-medium text-foreground hover:bg-muted">
                Share a Book
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Stage Image */}
        <div className="order-1 flex justify-center md:order-2 md:col-span-5">
          <div className="group relative aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-xl sm:rounded-2xl border border-border/80 bg-muted/40 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.15)] md:aspect-[3/4] md:max-w-none">
            <Image
              src={data.img}
              alt={`${data.hd1} ${data.hd2}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle inner vignette highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
          </div>
        </div>

      </div>
    </div>
  );
}