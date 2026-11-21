"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogoMark } from "@/components/ui/Logo";
import Spinner from "@/components/ui/Spinner";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { useAuth } from "@/hooks/useAuth";
import { authFlags } from "@/lib/auth-flags";
import { DASHBOARD_NAV, SHARED_NAV } from "@/data/dashboard-nav";


function FullScreenLoader() {
    return (
        <div className="flex min-h-dvh flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-4" role="status" aria-label="Loading">
                <LogoMark className="size-12 text-primary" />
                <Spinner className="size-6 text-primary" />
            </div>
        </div>
    );
}

// The private area -- waits for the session, sends visitors to sign in, then draws the sidebar, top bar and the page.
export default function DashboardShell({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, isLoading, role } = useAuth();

    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);


    useEffect(() => {
        if (isLoading || isAuthenticated || authFlags.signingOut) return;
        router.replace(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
    }, [isLoading, isAuthenticated, pathname, router]);

    useEffect(() => {
        if (!mobileOpen) return;

        function handleKeyDown(event) {
            if (event.key === "Escape") setMobileOpen(false);
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [mobileOpen]);

    if (isLoading || !isAuthenticated) return <FullScreenLoader />;

    const items = DASHBOARD_NAV[role] ?? [];
    const allItems = [...items, ...SHARED_NAV];
    const current = allItems
        .filter(({ href }) => pathname === href || pathname.startsWith(`${href}/`))
        .sort((a, b) => b.href.length - a.href.length)[0];


    return (
        <div className="flex flex-1">
            <Sidebar
                items={items}
                collapsed={collapsed}
                mobileOpen={mobileOpen}
                onNavigate={() => setMobileOpen(false)}
            />

            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileOpen(false)}
                    aria-hidden="true"
                />
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    title={current?.label ?? "Dashboard"}
                    collapsed={collapsed}
                    onToggleCollapse={() => setCollapsed((value) => !value)}
                    onOpenMobile={() => setMobileOpen(true)}
                />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-6xl">{children}</div>
                </main>
            </div>
        </div>
    );
}