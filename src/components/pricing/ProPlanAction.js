import Button from "@/components/ui/Button";


export default function ProPlanAction() {
    return (
        <Button href="/pricing" variant="accent" size="lg" className="w-full">
            Subscribe with Stripe
        </Button>
    );
}