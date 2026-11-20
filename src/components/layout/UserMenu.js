"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Crown, LogOut } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { useAuth } from "@/hooks/useAuth";
import { useSignOut } from "@/hooks/useSignOut";
import { ROLE_BADGES, USER_MENU_LINKS } from "@/data/user-menu";
import { cn } from "@/lib/utils";


export default function UserMenu() {

    const { user, role, plan } = useAuth();
    const signOut = useSignOut();
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        function handlePointerDown(event) {
            if (!containerRef.current?.contains(event.target)) setOpen(false);
        }
        function handleKeyDown(event) {
            if (event.key === "Escape") setOpen(false);
        }

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    const badge = ROLE_BADGES[role] ?? ROLE_BADGES.student;


    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="flex items-center gap-2.5 rounded-full border border-line bg-surface py-1 pl-1 pr-3 transition-colors hover:border-primary/50"
            >
                <Avatar user={user} className="size-8" />

                <span className="hidden max-w-32 truncate text-sm font-semibold text-ink xl:block">
                    {user.name}
                </span>

                <ChevronDown
                    className={cn("size-4 text-muted transition-transform", open && "rotate-180")}
                    aria-hidden="true"
                />
            </button>

            {open && (
                <div
                    role="menu"
                    className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-72 overflow-hidden rounded-card border border-line bg-surface shadow-card"
                >
                    <div className="flex items-center gap-3 border-b border-line p-4">
                        <Avatar user={user} className="size-11 text-sm" />

                        <div className="min-w-0">
                            <p className="truncate font-semibold text-ink">{user.name}</p>

                            <p className="truncate text-xs text-muted">{user.email}</p>

                            <div className="mt-1.5 flex items-center gap-1.5">
                                <Badge tone={badge.tone}>{badge.label}</Badge>

                                {plan === "pro" && (
                                    <Badge tone="accent" icon={Crown}>
                                        Pro
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-2">
                        {USER_MENU_LINKS.map(({ label, href, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                role="menuitem"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
                            >
                                <Icon className="size-[18px] text-muted" aria-hidden="true" />
                                {label}
                            </Link>
                        ))}

                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                                setOpen(false);
                                signOut();
                            }}
                            className="flex w-full items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-danger-soft"
                        >
                            <LogOut className="size-[18px]" aria-hidden="true" />
                            Sign out
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}