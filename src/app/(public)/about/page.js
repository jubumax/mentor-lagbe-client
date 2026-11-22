import { Search, ShieldCheck, Wallet } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import HowItWorks from "@/components/home/HowItWorks";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata = {
    title: "How it works",
    description:
        "Learn how MentorLagbe connects students with admin-approved tutors, and how tutors publish their batches.",
};

const VALUES = [
    {
        icon: ShieldCheck,
        title: "Reviewed before it goes live",
        text: "An admin approves every tuition post, so students browse real, vetted listings.",
    },
    {
        icon: Search,
        title: "Search that saves time",
        text: "Filter by subject, class level, mode and fee, and see the schedule before you apply.",
    },
    {
        icon: Wallet,
        title: "Simple, fair pricing",
        text: "Start free. Pro is one payment through Stripe, with nothing recurring.",
    },
];

export default function AboutPage() {
    return (
        <>
            <section className="py-14 sm:py-20">
                <Container className="max-w-3xl text-center">
                    <h1 className="text-4xl sm:text-5xl">
                        Learning gets easier when the right people find each other.
                    </h1>

                    <p className="mt-5 text-lg leading-relaxed text-muted">
                        MentorLagbe connects students with admin-approved tutors across Bangladesh.
                        Students search, compare and apply in minutes. Tutors publish their batches
                        and manage every applicant in one place.
                    </p>
                </Container>
            </section>

            <HowItWorks />

            <section className="py-16 sm:py-24">
                <Container>
                    <SectionHeading
                        title="Why people use MentorLagbe"
                        description="A few simple ideas shape how the platform works."
                    />
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {VALUES.map(({ icon: Icon, title, text }) => (
                            <div
                                key={title}
                                className="rounded-card border border-line bg-surface p-7 shadow-card"
                            >
                                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-link">
                                    <Icon className="size-6" aria-hidden="true" />
                                </span>

                                <h3 className="mt-5 text-lg">{title}</h3>

                                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <CtaBanner />
        </>
    );
}