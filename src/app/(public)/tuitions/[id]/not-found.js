import NotFoundState from "@/components/layout/NotFoundState";

export default function TuitionNotFound() {
    return (
        <NotFoundState
            title="This tuition isn't available"
            description="It may have been closed or removed, or it is still waiting for admin approval."
        />
    );
}