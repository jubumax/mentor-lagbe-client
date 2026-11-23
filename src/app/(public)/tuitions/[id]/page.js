import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    BookOpen,
    CalendarDays,
    GraduationCap,
    Laptop,
    MapPin,
    Tag,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import TutorSummary from "@/components/tuition/TutorSummary";
import ApplyPanel from "@/components/tuition/ApplyPanel";
import { api, ApiError } from "@/lib/api";
import { formatDate, formatFee } from "@/lib/utils";
import BookmarkButton from "@/components/tuition/BookmarkButton";


async function getTuition(id) {
    try {
        return await api.get(`/tuitions/${encodeURIComponent(id)}`, {
            auth: false,
            next: { revalidate: 30 },
        });

    } catch (error) {
        if (error instanceof ApiError && error.status === 404) return null;
        throw error;
    }
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    try {
        const data = await getTuition(id);
        if (!data) return { title: "Tuition not found" };

        const { title, description } = data.tuition;
        return { title, description: description.slice(0, 155) };

    } catch {
        return { title: "Tuition details" };
    }
}

export default async function TuitionDetailsPage({ params }) {
    const { id } = await params;
    const data = await getTuition(id);
    if (!data) notFound();

    const { tuition, tutor } = data;
    const isOnline = tuition.mode === "Online";
    const ModeIcon = isOnline ? Laptop : MapPin;

    const facts = [
        { icon: Tag, label: "Subject", value: tuition.subject },
        { icon: GraduationCap, label: "Class level", value: tuition.classLevel },
        { icon: ModeIcon, label: "Mode", value: tuition.mode },
        { icon: MapPin, label: "Location", value: tuition.location },
        {
            icon: CalendarDays,
            label: "Schedule",
            value: `${tuition.daysPerWeek} ${tuition.daysPerWeek === 1 ? "day" : "days"} / week`,
        },
    ];

    return (
        <Container className="py-10 sm:py-14">
            <Link
                href="/tuitions"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-link"
            >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back to all tuitions
            </Link>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
                <div className="space-y-8">
                    <div className="overflow-hidden rounded-card border border-line bg-primary-soft shadow-card">
                        <div className="aspect-[16/8]">

                            {tuition.bannerImage ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={tuition.bannerImage}
                                    alt={`Banner for ${tuition.title}`}
                                    className="size-full object-cover"
                                />
                            ) : (
                                <div className="flex size-full items-center justify-center text-link">
                                    <BookOpen className="size-16" aria-hidden="true" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge tone="primary">{tuition.subject}</Badge>

                            <Badge tone="neutral">{tuition.classLevel}</Badge>

                            <Badge tone="success" icon={ModeIcon}>
                                {tuition.mode}
                            </Badge>
                        </div>

                        <h1 className="mt-4 text-3xl sm:text-4xl">{tuition.title}</h1>

                        <p className="mt-3 text-sm text-muted">
                            Posted by{" "}
                            <span className="font-semibold text-ink">{tuition.tutorName}</span>

                            {tuition.createdAt && <> on {formatDate(tuition.createdAt)}</>}
                        </p>
                    </div>

                    <section aria-labelledby="about-heading">
                        <h2 id="about-heading" className="text-xl">
                            About this tuition
                        </h2>

                        <p className="mt-3 whitespace-pre-line leading-relaxed text-muted">
                            {tuition.description}
                        </p>
                    </section>

                    <TutorSummary tutor={tutor} fallbackName={tuition.tutorName} />
                </div>

                <aside className="rounded-card border border-line bg-surface p-6 shadow-card lg:sticky lg:top-24">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                        Monthly tuition fee
                    </p>

                    <p className="mt-1 font-display text-4xl font-extrabold text-ink">
                        {formatFee(tuition.monthlyFee)}

                        <span className="text-base font-medium text-muted"> /month</span>
                    </p>

                    <dl className="mt-5 divide-y divide-line border-y border-line">
                        {facts.map(({ icon: Icon, label, value }) => (
                            <div key={label} className="flex items-center justify-between gap-4 py-3 text-sm">
                                <dt className="flex items-center gap-2 text-muted">
                                    <Icon className="size-4" aria-hidden="true" />
                                    {label}
                                </dt>

                                <dd className="text-right font-semibold text-ink">{value}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-6">
                        <ApplyPanel tuitionId={tuition._id} title={tuition.title} />
                    </div>

                    <div className="mt-3">
                        <BookmarkButton tuitionId={tuition._id} variant="full" />
                    </div>
                </aside>
            </div>
        </Container>
    );
}