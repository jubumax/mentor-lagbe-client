"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, LogOut } from "lucide-react";
import Logo, { LogoMark } from "@/components/ui/Logo";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { useSignOut } from "@/hooks/useSignOut";
import { ROLE_BADGES } from "@/data/user-menu";
import { SHARED_NAV } from "@/data/dashboard-nav";
import { cn } from "@/lib/utils";


function isActive(pathname, { href, exact }) {
    return exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

function NavItem({ item, collapsed, pathname, onNavigate }) {
    const { label, href, icon: Icon } = item;
    const active = isActive(pathname, item);

    return (
        <Link
            href={href}
            title={label}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
                "relative flex h-11 items-center gap-3 rounded-control px-3 text-sm font-semibold transition-colors",
                active
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                collapsed && "lg:justify-center lg:px-0"
            )}
        >
            {active && (
                <span
                    className="absolute left-0 top-2.5 h-6 w-1 rounded-r-full bg-accent"
                    aria-hidden="true"
                />
            )}

            <Icon className="size-5 shrink-0" aria-hidden="true" />
            <span className={cn("truncate", collapsed && "lg:hidden")}>{label}</span>
        </Link>
    );
}


export default function Sidebar({ items, collapsed, mobileOpen, onNavigate }) {
    const pathname = usePathname();
    const { user, role } = useAuth();
    const signOut = useSignOut();
    const badge = ROLE_BADGES[role];

    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col bg-linear-to-b from-footer-from to-footer-to text-white transition-[transform,width] duration-300 lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0",
                mobileOpen ? "translate-x-0" : "-translate-x-full",
                collapsed && "lg:w-[4.75rem]"
            )}
        >
            <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-5">
                <Logo light className={cn(collapsed && "lg:hidden")} />

                <Link
                    href="/"
                    aria-label="MentorLagbe home"
                    className={cn("hidden", collapsed && "lg:mx-auto lg:inline-flex")}
                >
                    <LogoMark className="size-9 text-white [--logo-fg:#2d2896]" />
                </Link>
            </div>

            <nav aria-label="Dashboard" className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
                {items.map((item) => (
                    <NavItem
                        key={item.href}
                        item={item}
                        collapsed={collapsed}
                        pathname={pathname}
                        onNavigate={onNavigate}
                    />
                ))}

                <div className="my-3 border-t border-white/10" />

                {SHARED_NAV.map((item) => (
                    <NavItem
                        key={item.href}
                        item={item}
                        collapsed={collapsed}
                        pathname={pathname}
                        onNavigate={onNavigate}
                    />
                ))}
            </nav>

            <div className="shrink-0 space-y-1 border-t border-white/10 p-3">
                <div className={cn("flex items-center gap-3 px-2 py-2", collapsed && "lg:justify-center lg:px-0")}>
                    <Avatar user={user} className="size-9" />

                    <div className={cn("min-w-0", collapsed && "lg:hidden")}>
                        <p className="truncate text-sm font-semibold">{user?.name}</p>
                        <p className="text-xs text-white/60">{badge?.label ?? role}</p>
                    </div>
                </div>

                <Link
                    href="/"
                    title="Back to website"
                    onClick={onNavigate}
                    className={cn(
                        "flex h-10 items-center gap-3 rounded-control px-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white",
                        collapsed && "lg:justify-center lg:px-0"
                    )}
                >
                    <ArrowLeft className="size-[18px] shrink-0" aria-hidden="true" />
                    <span className={cn(collapsed && "lg:hidden")}>Back to website</span>
                </Link>


                <button
                    type="button"
                    title="Sign out"
                    onClick={() => {
                        onNavigate();
                        signOut();
                    }}
                    className={cn(
                        "flex h-10 w-full items-center gap-3 rounded-control px-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white",
                        collapsed && "lg:justify-center lg:px-0"
                    )}
                >
                    <LogOut className="size-[18px] shrink-0" aria-hidden="true" />
                    <span className={cn(collapsed && "lg:hidden")}>Sign out</span>
                </button>
            </div>
        </aside>
    );
}