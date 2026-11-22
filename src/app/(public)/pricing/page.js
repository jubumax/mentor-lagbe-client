import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PricingPlans from "@/components/pricing/PricingPlans";

export const metadata = { title: "Pricing" };

const FAQ = [
    {
        question: "Is Pro a monthly subscription?",
        answer:
            "No. Pro is a single payment through Stripe. You are not charged again, and there is nothing to cancel.",
    },
    {
        question: "How is my payment handled?",
        answer:
            "You pay on Stripe's own secure checkout page. Your card details never reach MentorLagbe.",
    },
    {
        question: "When does Pro start?",
        answer:
            "As soon as the payment is confirmed. You come back to MentorLagbe and your account shows the Pro plan straight away.",
    },
    {
        question: "Which plan should I choose?",
        answer:
            "Each plan matches your account type. Tutors get unlimited tuition posts and a verified badge. Students get priority placement in tutors' applicant lists.",
    },
];


export default function PricingPage() {
    return (
        <>
            <section className="py-14 sm:py-20">
                <Container>

                    <SectionHeading
                        title="Simple plans for tutors and students"
                        description="Start free. Upgrade once through Stripe when you want more."
                    />

                    <div className="mt-10">
                        <PricingPlans />
                    </div>

                </Container>
            </section>

            <section className="pb-8">
                <Container className="max-w-3xl">
                    <h2 className="text-center text-2xl sm:text-3xl">Questions about Pro</h2>

                    <div className="mt-8 space-y-3">
                        {FAQ.map(({ question, answer }) => (
                            <details
                                key={question}
                                className="group rounded-card border border-line bg-surface p-5 shadow-card"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                                    {question}
                                    <ChevronDown
                                        className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180"
                                        aria-hidden="true"
                                    />
                                </summary>

                                <p className="mt-3 text-sm leading-relaxed text-muted">{answer}</p>
                            </details>
                        ))}
                    </div>
                </Container>
            </section>
        </>
    );
}