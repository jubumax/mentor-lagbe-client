import { Crown } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";


export default function TutorSummary({ tutor, fallbackName }) {
    const name = tutor?.name ?? fallbackName;
    const isPro = tutor?.plan === "pro";

    return (
        <div className="rounded-card border border-line bg-surface p-6 shadow-card">
            <h2 className="text-xl">About the tutor</h2>
            <div className="mt-5 flex items-start gap-4">
                <Avatar user={{ name, image: tutor?.image }} className="size-14 text-base" />

                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">

                        <p className="text-lg font-bold text-ink">{name}</p>

                        {isPro && (
                            <Badge tone="accent" icon={Crown}>
                                Verified Pro
                            </Badge>
                        )}
                    </div>

                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted">
                        {tutor?.bio || "This tutor hasn't added a bio yet."}
                    </p>
                </div>
            </div>
        </div>
    );
}