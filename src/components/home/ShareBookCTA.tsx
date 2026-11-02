import Link from "next/link";
import { PlusCircle, ArrowUpRight, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

export function ShareBookCTA() {
    return (
        <section className="w-full bg-background mt-20">
            <div className="mx-auto max-w-5xl">
                <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-8 md:p-12 shadow-sm">

                    {/* Subtle Decorative Background Book Graphic */}
                    <div className="pointer-events-none absolute -bottom-10 -right-10 text-muted/30">
                        <BookOpen className="h-64 w-64 -rotate-12 stroke" />
                    </div>

                    <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

                        {/* Copy Column */}
                        <div className="max-w-xl">

                            <Badge variant={"secondary"} className="px-5 py-3 ">
                                <Sparkles className="h-3.5 w-3.5 text-accent" />
                                <span>Keep the library alive</span>
                                </Badge>

                            <h2 className="font-heading text-3xl font-medium text-card-foreground sm:text-4xl mt-5">
                                Have a book sitting on your shelf?
                            </h2>

                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                List it in 30 seconds. Put your favorite story into circulation for other readers to enjoy and return safely.
                            </p>
                        </div>

                        {/* Actions Column */}
                        <div className="flex shrink-0 flex-col gap-3 sm:flex-row w-full sm:w-auto">
                            <Button
                                render={<Link href="/add-book" />}
                                className="h-11 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
                            >
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add a Book Now
                            </Button>

                            {/* <Button
                                render={<Link href="/how-it-works" />}
                                variant="outline"
                                className="h-11 rounded-lg border-border bg-card px-5 text-sm font-medium text-foreground hover:bg-muted transition-colors w-full sm:w-auto justify-center"
                            >
                                How It Works
                                <ArrowUpRight className="ml-2 h-4 w-4 text-muted-foreground" />
                            </Button> */}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}