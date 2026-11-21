import PageHeader from "@/components/dashboard/PageHeader";

export const metadata = { title: "Student overview" };


export default function StudentOverviewPage() {
    return (
        <PageHeader
            title="Student dashboard"
            description="Users overview and applications will appear here."
        />
    );
}