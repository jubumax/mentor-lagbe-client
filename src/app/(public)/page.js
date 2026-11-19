import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function HomePage() {
    return (
        <Container className="py-24">
            <SectionHeading
                eyebrow="Layout preview"
                title="Find your ideal tutor or mentorship batch"
                description="Navbar, footer and theme are in place. The real home page comes next."
            />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button href="/tuitions" size="lg">
                    Browse tuitions
                </Button>
                <Button href="/sign-up" variant="outline" size="lg">
                    Join as a tutor
                </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <Badge tone="primary">Primary</Badge>
                <Badge tone="accent">Pending</Badge>
                <Badge tone="success">Accepted</Badge>
                <Badge tone="danger">Rejected</Badge>
            </div>
        </Container>
    );
}