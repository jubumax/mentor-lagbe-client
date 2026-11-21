import Badge from "@/components/ui/Badge";

const STATUS = {
    pending: { label: "Pending", tone: "accent" },
    accepted: { label: "Accepted", tone: "success" },
    rejected: { label: "Rejected", tone: "danger" },
    approved: { label: "Approved", tone: "success" },
    active: { label: "Active", tone: "success" },
    closed: { label: "Closed", tone: "neutral" },
};

export default function StatusBadge({ status }) {
    const config = STATUS[status] ?? { label: status, tone: "neutral" };

    return <Badge tone={config.tone}>{config.label}</Badge>;
}