import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight, Atom, Code, FlaskConical, Languages, Sigma } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CountUp from "@/components/home/CountUp";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

const SUBJECTS = [
    {
        name: "Mathematics",
        icon: Sigma,
        note: "From SSC algebra to university calculus",
        featured: true,
    },
    { name: "Physics", icon: Atom, note: "Concepts, numericals and exam practice" },
    { name: "Programming", icon: Code, note: "Web, Python and problem solving" },
    { name: "IELTS", icon: Languages, note: "Preparation for all four skills" },
    { name: "Chemistry", icon: FlaskConical, note: "Organic, inorganic and lab work" },
];


function SubjectTile({ name, icon: Icon, note, featured }) {
    return (
        <Link
            href={`/tuitions?subject=${encodeURIComponent(name)}`}
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-card border p-6 transition-all duration-300 hover:-translate-y-1",
                featured
                    ? "min-h-64 border-transparent bg-linear-to-br from-primary to-footer-from text-white sm:col-span-2 lg:row-span-2"
                    : "border-line bg-surface shadow-card hover:border-primary/40"
            )}
        >
            {featured && (
                <Icon
                    className="pointer-events-none absolute -bottom-6 -right-6 size-44 text-white/10"
                    aria-hidden="true"
                />
            )}

            <div className="flex items-start justify-between">
                <span
                    className={cn(
                        "inline-flex size-12 items-center justify-center rounded-2xl",
                        featured ? "bg-white/15 text-white" : "bg-primary-soft text-link"
                    )}
                >
                    <Icon className="size-6" aria-hidden="true" />
                </span>

                <ArrowUpRight
                    className={cn(
                        "size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                        featured ? "text-white/80" : "text-muted"
                    )}
                    aria-hidden="true"
                />
            </div>

            <div className="mt-8">
                <h3 className={cn("text-xl", featured && "text-2xl text-white")}>{name}</h3>

                <p
                    className={cn(
                        "mt-1.5 text-sm leading-relaxed",
                        featured ? "max-w-xs text-white/80" : "text-muted"
                    )}
                >
                    {note}
                </p>
            </div>
        </Link>
    );
}


async function PlatformStats() {
    let stats = null;

    try {
        const data = await api.get("/stats/public", {
            auth: false,
            next: { revalidate: 300 },
        });
        stats = data?.stats ?? null;

    } catch {
        // No numbers is better than wrong numbers!
    }

    if (!stats) return null;

    const items = [
        { label: "Tutors", value: stats.tutors },
        { label: "Students", value: stats.students },
        { label: "Live tuitions", value: stats.tuitions },
        { label: "Applications sent", value: stats.applications },
    ];

    return (
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-4">
            {items.map(({ label, value }) => (
                <div key={label} className="flex flex-col-reverse bg-surface px-6 py-8 text-center">
                    <dt className="mt-1 text-sm font-medium text-muted">{label}</dt>
                    <dd className="font-display text-4xl font-extrabold text-ink">
                        <CountUp value={value} />
                    </dd>
                </div>
            ))}
        </dl>
    );
}


export default function TopSubjects() {
    return (
        <section className="py-16 sm:py-24">
            <Container>
                <SectionHeading
                    title="Start with the subject you are studying"
                    description="Pick a subject to see approved tutors and batches for it."
                />

                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
                    {SUBJECTS.map((subject) => (
                        <SubjectTile key={subject.name} {...subject} />
                    ))}
                </div>

                <Suspense fallback={null}>
                    <PlatformStats />
                </Suspense>
            </Container>
        </section>
    );
}