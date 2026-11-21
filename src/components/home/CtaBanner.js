import Container from "@/components/ui/Container";
import CtaActions from "@/components/home/CtaActions";

export default function CtaBanner() {
    return (
        <section className="pt-8 sm:pt-12">
            <Container>
                <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-primary to-footer-from px-6 py-14 text-center text-white sm:px-12 sm:py-20">
                    <div
                        className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-accent/30 blur-3xl"
                        aria-hidden="true"
                    />

                    <div
                        className="pointer-events-none absolute -bottom-28 -left-16 size-80 rounded-full border border-white/15"
                        aria-hidden="true"
                    />

                    <h2 className="relative mx-auto max-w-2xl text-3xl text-white sm:text-5xl">
                        Your next tutor is a few clicks away.
                    </h2>

                    <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/80">
                        Join as a student to find the right tutor, or as a tutor to reach
                        students across Bangladesh.
                    </p>

                    <CtaActions />
                </div>
            </Container>
        </section>
    );
}