import Hero from "@/components/home/Hero";
import FeaturedTuitions from "@/components/home/FeaturedTuitions";
import HowItWorks from "@/components/home/HowItWorks";
import TopSubjects from "@/components/home/TopSubjects";

export default function HomePage() {
    return (
        <>
            <Hero />
            <FeaturedTuitions />
            <HowItWorks />
            <TopSubjects />
        </>
    );
}