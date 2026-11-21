"use client";

import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import UserMenu from "@/components/layout/UserMenu";


export default function Topbar({ title, collapsed, onToggleCollapse, onOpenMobile }) {
    const buttonClass =
        "size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-2";

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line/70 bg-bg/80 px-4 backdrop-blur-xl sm:px-6">
            <button
                type="button"
                onClick={onOpenMobile}
                aria-label="Open menu"
                className={`${buttonClass} inline-flex lg:hidden`}
            >
                <Menu className="size-5" />
            </button>

            <button
                type="button"
                onClick={onToggleCollapse}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className={`${buttonClass} hidden lg:inline-flex`}
            >
                {collapsed ? (
                    <PanelLeftOpen className="size-5" />
                ) : (
                    <PanelLeftClose className="size-5" />
                )}
            </button>

            <p className="font-display text-lg font-bold text-ink">{title}</p>

            <div className="ml-auto flex items-center gap-2">
                <ThemeToggle />
                <UserMenu />
            </div>
        </header>
    );
}