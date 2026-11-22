import { cn, getInitials } from "@/lib/utils";


export default function Avatar({ user, className }) {
    const name = user?.name ?? "";

    if (user?.image) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={user.image}
                alt={name}
                referrerPolicy="no-referrer"
                className={cn("shrink-0 rounded-full bg-surface-2 object-cover", className)}
            />
        );
    }

    return (
        <span
            aria-hidden="true"
            className={cn(
                "inline-flex shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-link",
                className
            )}
        >
            {getInitials(name)}
        </span>
    );
}