'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import Autoplay from 'embla-carousel-autoplay';
import BannerGrid from './BannerGrid';


export interface SlideData {
    topText: string;
    hd1: string;
    hd2: string;
    des: string;
    img: string;
}

const sliders: SlideData[] = [
    {
        topText: "YOUR NEXT CHAPTER STARTS HERE",
        hd1: "Good books.",
        hd2: "Better shared.",
        des: "A small online library for your next great read. Find a book, borrow it for a few days, and let the story unfold.",
        img: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=1600&auto=format&fit=crop"
    },
    {
        topText: "CURATED FOR READERS",
        hd1: "Endless pages.",
        hd2: "Countless worlds.",
        des: "Explore our handpicked collection across literature, science, and poetry available to reserve instantly.",
        img: "https://images.unsplash.com/photo-1758726535099-5b7ff51bcc55?q=80&w=1173&auto=format&fit=crop"
    },
    {
        topText: "COMMUNITY BOOK EXCHANGE",
        hd1: "Read today.",
        hd2: "Return tomorrow.",
        des: "Pass the journey forward. Borrow, return, and review with fellow book lovers across the community.",
        img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop"
    }
];

export default function Banner() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <section className="w-full bg-muted-foreground/20 py-12 ">
            <div className="mx-auto max-w-7xl">
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 5000,
                            stopOnInteraction: false,
                        }),
                    ]}
                    className="w-full"
                >
                    {/* Slides */}
                    <CarouselContent>
                        {sliders.map((slider, index) => (
                            <CarouselItem key={index}>
                                <BannerGrid data={slider} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* slider number */}
                    <div className="mt-12 flex items-center justify-between border-t border-border/40 pt-6">
                        <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                            <span className="font-mono">
                                {String(current).padStart(2, '0')} / {String(count || sliders.length).padStart(2, '0')}
                            </span>
                            <div className="relative h-1 w-20 overflow-hidden rounded-full bg-border">
                                <div
                                    className="h-full bg-primary transition-all duration-300 ease-out"
                                    style={{
                                        width: `${count ? (current / count) * 100 : 33}%`
                                    }}
                                />
                            </div>
                        </div>

                        {/* Slogan */}
                        <p className="hidden text-xs text-muted-foreground md:block">
                            Turn the page. Take your time.
                        </p>

                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => api?.scrollPrev()}
                                aria-label="Previous slide"
                                className="h-10 w-10 rounded-full border-border bg-background text-foreground hover:bg-muted"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => api?.scrollNext()}
                                aria-label="Next slide"
                                className="h-10 w-10 rounded-full border-border bg-background text-foreground hover:bg-muted"
                            >
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Carousel>
            </div>
        </section>
    );
}