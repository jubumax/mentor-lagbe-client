import Hero from "@/components/home/Hero";
import FeaturedTuitions from "@/components/home/FeaturedTuitions";
import HowItWorks from "@/components/home/HowItWorks";
import TopSubjects from "@/components/home/TopSubjects";
import Testimonials from "@/components/home/Testimonials";
import PricingSection from "@/components/home/PricingSection";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
    return (
        <>
            <Hero />
            <FeaturedTuitions />
            <HowItWorks />
            <TopSubjects />
            <Testimonials />
            <PricingSection />
            <CtaBanner />
        </>
    );
}