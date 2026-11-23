import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PricingPlans from "@/components/pricing/PricingPlans";
import FaqAccordion from "@/components/pricing/FaqAccordion";

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

                    <FaqAccordion items={FAQ} />
                </Container>
            </section>
        </>
    );
}