import PageHeader from "@/components/dashboard/PageHeader";

export const metadata = { title: "Tutor overview" };


export default function TutorOverviewPage() {
    return (
        <PageHeader
            title="Tutor dashboard"
            description="Users tuitions and applicants will appear here."
        />
    );
}