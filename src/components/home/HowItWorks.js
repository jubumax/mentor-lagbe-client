"use client";

import { useState } from "react";
import {
    BadgeCheck,
    ClipboardCheck,
    FilePlus,
    ListChecks,
    Search,
    Send,
    UserPlus,
    Users,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const FLOWS = {
    student: {
        label: "For students",
        cta: { label: "Browse tuitions", href: "/tuitions" },
        steps: [
            {
                icon: Search,
                title: "Search and filter",
                text: "Browse approved tuitions by subject, class level and online or offline mode.",
            },
            {
                icon: ListChecks,
                title: "Compare your options",
                text: "Check the schedule, monthly fee and tutor profile before you decide.",
            },
            {
                icon: Send,
                title: "Apply in a minute",
                text: "Send your phone number, preferred schedule and a short note to the tutor.",
            },
            {
                icon: ClipboardCheck,
                title: "Track your status",
                text: "See every request as pending, accepted or rejected from your dashboard.",
            },
        ],
    },
    tutor: {
        label: "For tutors",
        cta: { label: "Start posting", href: "/sign-up?role=tutor" },
        steps: [
            {
                icon: UserPlus,
                title: "Create your account",
                text: "Sign up as a tutor and add your bio and profile photo.",
            },
            {
                icon: FilePlus,
                title: "Post your tuition",
                text: "Add the subject, class level, fee and a banner. The free plan includes two posts.",
            },
            {
                icon: BadgeCheck,
                title: "Get approved",
                text: "An admin reviews your post and publishes it on the Browse page.",
            },
            {
                icon: Users,
                title: "Manage applicants",
                text: "Accept or reject student requests from your tutor dashboard.",
            },
        ],
    },
};


export default function HowItWorks() {
    const [active, setActive] = useState("student");
    const flow = FLOWS[active];

    return (
        <section className="bg-surface-2/60 py-16 sm:py-24">
            <Container>
                <SectionHeading
                    title="How MentorLagbe works"
                    description="Four simple steps, whether you are looking for a tutor or offering your own batch."
                />

                <div
                    role="tablist"
                    aria-label="Choose your role"
                    className="mx-auto mt-8 flex w-fit rounded-full border border-line bg-surface p-1"
                >
                    {Object.entries(FLOWS).map(([key, { label }]) => (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            id={`flow-tab-${key}`}
                            aria-selected={active === key}
                            aria-controls="flow-panel"
                            onClick={() => setActive(key)}
                            className={cn(
                                "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                                active === key
                                    ? "bg-primary text-on-primary"
                                    : "text-muted hover:text-ink"
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div
                    id="flow-panel"
                    role="tabpanel"
                    aria-labelledby={`flow-tab-${active}`}
                    key={active}
                    className="animate-rise relative mt-12"
                >
                    <div
                        className="absolute left-[12%] right-[12%] top-12 hidden border-t-2 border-dashed border-line lg:block"
                        aria-hidden="true"
                    />
                    <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {flow.steps.map(({ icon: Icon, title, text }, index) => (
                            <li
                                key={title}
                                className="rounded-card border border-line bg-surface p-6 shadow-card"
                            >
                                <div className="flex items-start justify-between">
                                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary text-on-primary">
                                        <Icon className="size-6" aria-hidden="true" />
                                    </span>

                                    <span
                                        className="font-display text-4xl font-extrabold text-primary/15"
                                        aria-hidden="true"
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <h3 className="mt-5 text-lg">{title}</h3>

                                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="mt-10 text-center">
                    <Button href={flow.cta.href} size="lg">
                        {flow.cta.label}
                    </Button>
                </div>
            </Container>
        </section>
    );
}