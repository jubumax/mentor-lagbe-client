import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PricingPlans from "@/components/pricing/PricingPlans";

export default function PricingSection() {
    return (
        <section className="py-16 sm:py-24">
            <Container>
                <SectionHeading
                    title="Start free, upgrade when you need more"
                    description="Tutors and students each get a free plan. Pro is a single payment through Stripe, with no recurring charges."
                />

                <div className="mt-10">
                    <PricingPlans />
                </div>
            </Container>
        </section>
    );
}