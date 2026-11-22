import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    CalendarDays,
    GraduationCap,
    Laptop,
    MapPin,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { formatFee } from "@/lib/utils";


export default function TuitionCard({ tuition }) {
    const {
        _id,
        title,
        subject,
        classLevel,
        mode,
        location,
        monthlyFee,
        daysPerWeek,
        bannerImage,
        tutorName,
    } = tuition;

    const isOnline = mode === "Online";
    const ModeIcon = isOnline ? Laptop : MapPin;


    return (
        <article className="group flex h-full flex-col rounded-card border border-line bg-surface p-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-primary-soft">

                {bannerImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={bannerImage}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex size-full items-center justify-center text-link">
                        <BookOpen className="size-10" aria-hidden="true" />
                    </div>
                )}

                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-2.5 py-1 text-xs font-semibold text-ink backdrop-blur">
                    <ModeIcon className="size-3.5 text-link" aria-hidden="true" />
                    {mode}
                </span>
            </div>

            <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
                <div className="flex items-center justify-between gap-2">
                    <Badge tone="primary">{subject}</Badge>

                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                        <GraduationCap className="size-3.5" aria-hidden="true" />
                        {classLevel}
                    </span>
                </div>

                <h3 className="mt-3 line-clamp-2 min-h-[3.2rem] text-lg font-bold leading-snug">
                    <Link href={`/tuitions/${_id}`} className="hover:text-link">
                        {title}
                    </Link>
                </h3>

                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted">
                    <li className="flex min-w-0 items-center gap-1.5">
                        <ModeIcon className="size-4 shrink-0" aria-hidden="true" />
                        <span className="truncate">{location}</span>
                    </li>

                    <li className="flex items-center gap-1.5">
                        <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                        {daysPerWeek} {daysPerWeek === 1 ? "day" : "days"}/week
                    </li>
                </ul>

                <div className="mt-auto pt-4">
                    <div className="flex items-center gap-2.5 border-t border-line pt-4">
                        <Avatar user={{ name: tutorName }} className="size-8" />
                        <p className="truncate text-sm text-muted">
                            by <span className="font-semibold text-ink">{tutorName}</span>
                        </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                        <p className="text-xl font-extrabold text-ink">
                            {formatFee(monthlyFee)}
                            <span className="text-xs font-medium text-muted"> /month</span>
                        </p>

                        <Button href={`/tuitions/${_id}`} size="sm">
                            View details
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}