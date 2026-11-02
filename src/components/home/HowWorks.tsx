import { Search, BookOpen, RotateCcw } from "lucide-react";

const steps = [
    {
        step: "Step 1",
        title: "Find a book",
        desc: "Browse the shelf and open any book you like.",
        icon: Search,
    },
    {
        step: "Step 2",
        title: "Borrow it",
        desc: "Confirm the borrow.",
        icon: BookOpen,
    },
    {
        step: "Step 3",
        title: "Return it",
        desc: "Done reading? Return it from My Borrows in one click.",
        icon: RotateCcw,
    },
];

export function HowItWorks() {
    return (
        <section className="w-full bg-background mt-20">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className='space-y-2 *:text-center'>
                    <h1 className='text-4xl font-heading text-primary'>How Borrowing Works</h1>
                    <p className='text-muted-foreground'>A transparent, hassle-free lending flow built for everyday book lovers.</p>
                </div>


                =        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-10 max-w-5xl mx-auto">
                    {steps.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.step}
                                className="group flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                            >
                                {/* Add group-hover to your icon container */}
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Icon className="h-5 w-5" />
                                </div>

                                <span className="text-xs font-semibold uppercase tracking-wider text-accent transition-colors duration-200">
                                    {item.step}
                                </span>

                                <h3 className="mt-1 font-heading text-lg font-semibold text-card-foreground transition-colors duration-200 group-hover:text-primary">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}