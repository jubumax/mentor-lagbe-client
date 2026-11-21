import { Quote, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Avatar from "@/components/ui/Avatar";
import { TESTIMONIALS } from "@/data/testimonials";
import { cn } from "@/lib/utils";


export default function Testimonials() {
    return (
        <section className="bg-surface-2/60 py-16 sm:py-24">
            <Container>
                <SectionHeading
                    title="What learners and tutors say"
                    description="Feedback from people who use MentorLagbe to teach and to learn."
                />

                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {TESTIMONIALS.map(({ quote, name, role }, index) => (
                        <figure
                            key={name}
                            className={cn(
                                "flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card",
                                index === 1 && "lg:mt-10"
                            )}
                        >
                            <Quote className="size-8 text-primary/30" aria-hidden="true" />

                            <div className="mt-4 flex gap-1 text-accent" aria-label="5 out of 5 stars">
                                {Array.from({ length: 5 }, (_, star) => (
                                    <Star key={star} className="size-4 fill-current" aria-hidden="true" />
                                ))}
                            </div>

                            <blockquote className="mt-4 flex-1 leading-relaxed text-ink">
                                {quote}
                            </blockquote>

                            <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                                <Avatar user={{ name }} className="size-10 text-sm" />

                                <div>
                                    <p className="text-sm font-semibold text-ink">{name}</p>
                                    <p className="text-xs text-muted">{role}</p>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </Container>
        </section>
    );
}