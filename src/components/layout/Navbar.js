"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Avatar from "@/components/ui/Avatar";
import ThemeToggle from "@/components/layout/ThemeToggle";
import UserMenu from "@/components/layout/UserMenu";
import { useAuth } from "@/hooks/useAuth";
import { useSignOut } from "@/hooks/useSignOut";
import { NAV_LINKS } from "@/data/nav-links";
import { USER_MENU_LINKS } from "@/data/user-menu";
import { cn } from "@/lib/utils";


function isActive(pathname, href) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
}

function AuthButtons({ stacked = false, onNavigate }) {
    const size = stacked ? "md" : "sm";

    return (
        <div
            className={cn(
                "flex items-center gap-2",
                stacked && "flex-col items-stretch"
            )}
        >
            <Button href="/sign-in" variant="ghost" size={size} onClick={onNavigate}>
                Sign in
            </Button>
            <Button href="/sign-up" size={size} onClick={onNavigate}>
                Sign up
            </Button>
        </div>
    );
}


function AuthActions() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <span className="block h-9 w-36 animate-pulse rounded-full bg-surface-2" />;
    }
    return isAuthenticated ? <UserMenu /> : <AuthButtons />;
}


function MobileAuthSection({ onNavigate }) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const signOut = useSignOut();

    if (isLoading) {
        return <span className="block h-11 animate-pulse rounded-control bg-surface-2" />;
    }

    if (!isAuthenticated) {
        return <AuthButtons stacked onNavigate={onNavigate} />;
    }


    return (
        <div className="space-y-1">
            <div className="flex items-center gap-3 px-1 pb-3">
                <Avatar user={user} className="size-11 text-sm" />

                <div className="min-w-0">
                    <p className="truncate font-semibold text-ink">{user.name}</p>
                    <p className="truncate text-xs text-muted">{user.email}</p>
                </div>
            </div>

            {USER_MENU_LINKS.map(({ label, href, icon: Icon }) => (
                <Link
                    key={href}
                    href={href}
                    onClick={onNavigate}
                    className="flex items-center gap-3 rounded-control px-4 py-3 text-base font-semibold text-ink transition-colors hover:bg-surface-2"
                >
                    <Icon className="size-5 text-muted" aria-hidden="true" />
                    {label}
                </Link>
            ))}

            <button
                type="button"
                onClick={() => {
                    onNavigate();
                    signOut();
                }}
                className="flex w-full items-center gap-3 rounded-control px-4 py-3 text-base font-semibold text-danger transition-colors hover:bg-danger-soft"
            >
                <LogOut className="size-5" aria-hidden="true" />
                Sign out
            </button>
        </div>
    );
}


export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const closeMenu = () => setOpen(false);

    return (
        <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
            <Container className="flex h-[4.5rem] items-center justify-between gap-6">
                <Logo />

                <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
                    {NAV_LINKS.map(({ label, href }) => {
                        const active = isActive(pathname, href);

                        return (
                            <Link
                                key={href}
                                href={href}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                                    active
                                        ? "bg-primary-soft text-link"
                                        : "text-muted hover:bg-surface-2 hover:text-ink"
                                )}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>


                <div className="hidden items-center gap-3 lg:flex">
                    <ThemeToggle />
                    <span className="h-6 w-px bg-line" aria-hidden="true" />
                    <AuthActions />
                </div>

                <div className="flex items-center gap-1 lg:hidden">
                    <ThemeToggle />

                    <button
                        type="button"
                        onClick={() => setOpen((value) => !value)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        className="inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-2"
                    >
                        {open ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>
            </Container>


            {open && (
                <div
                    id="mobile-menu"
                    className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-bg lg:hidden"
                >
                    <Container className="flex flex-col gap-1 py-4">

                        {NAV_LINKS.map(({ label, href }) => {
                            const active = isActive(pathname, href);
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={closeMenu}
                                    aria-current={active ? "page" : undefined}
                                    className={cn(
                                        "rounded-control px-4 py-3 text-base font-semibold transition-colors",
                                        active
                                            ? "bg-primary-soft text-link"
                                            : "text-ink hover:bg-surface-2"
                                    )}
                                >
                                    {label}
                                </Link>
                            );
                        })}

                        <div className="mt-3 border-t border-line pt-4">
                            <MobileAuthSection onNavigate={closeMenu} />
                        </div>

                    </Container>
                </div>
            )}

        </header>
    );
}