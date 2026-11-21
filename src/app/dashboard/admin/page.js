import PageHeader from "@/components/dashboard/PageHeader";

export const metadata = { title: "Admin overview" };


export default function AdminOverviewPage() {
    return (
        <PageHeader
            title="System administration"
            description="Platform metrics and moderation tools will appear here."
        />
    );
}