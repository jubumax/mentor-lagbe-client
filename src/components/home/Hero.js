import Link from "next/link";
import Form from "next/form";
import { Laptop, Search, ShieldCheck, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import HeroVisual from "@/components/home/HeroVisual";

const POPULAR_SUBJECTS = ["Mathematics", "Physics", "Programming", "IELTS"];

const TRUST_POINTS = [
    { icon: ShieldCheck, label: "Admin-approved tutors" },
    { icon: Laptop, label: "Online and home tuition" },
    { icon: Sparkles, label: "Free to get started" },
];


export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div
                className="pointer-events-none absolute -left-32 -top-32 size-[28rem] rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
            />

            <Container className="relative grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
                <div>
                    <h1 className="animate-rise text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                        Find the tutor who makes the subject click.
                    </h1>

                    <p
                        className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted"
                        style={{ animationDelay: "90ms" }}
                    >
                        Search verified tutors and mentorship batches by subject, class level
                        and budget. Apply in a minute and learn at home or online.
                    </p>

                    <Form
                        action="/tuitions"
                        role="search"
                        className="animate-rise mt-8 flex max-w-xl items-center gap-2 rounded-full border border-line bg-surface p-1.5 pl-5 shadow-card transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15"
                        style={{ animationDelay: "180ms" }}
                    >
                        <Search className="size-5 shrink-0 text-muted" aria-hidden="true" />
                        <label htmlFor="hero-search" className="sr-only">
                            Search tuitions
                        </label>

                        <input
                            id="hero-search"
                            name="search"
                            type="search"
                            placeholder="Subject, class level or keyword"
                            autoComplete="off"
                            className="h-11 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted/70"
                        />

                        <button
                            type="submit"
                            className="inline-flex h-11 shrink-0 items-center rounded-full bg-primary px-6 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
                        >
                            Search
                        </button>
                    </Form>

                    <ul
                        className="animate-rise mt-5 flex flex-wrap items-center gap-2"
                        style={{ animationDelay: "250ms" }}
                    >
                        <li className="mr-1 text-sm text-muted">Popular:</li>

                        {POPULAR_SUBJECTS.map((subject) => (
                            <li key={subject}>
                                <Link
                                    href={`/tuitions?subject=${encodeURIComponent(subject)}`}
                                    className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-link"
                                >
                                    {subject}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <ul
                        className="animate-rise mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-muted"
                        style={{ animationDelay: "320ms" }}
                    >
                        {TRUST_POINTS.map(({ icon: Icon, label }) => (
                            <li key={label} className="flex items-center gap-2">
                                <Icon className="size-[18px] text-link" aria-hidden="true" />
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="animate-rise" style={{ animationDelay: "160ms" }}>
                    <HeroVisual />
                </div>
            </Container>
        </section>
    );
}