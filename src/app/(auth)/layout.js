import { Check } from "lucide-react";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/layout/ThemeToggle";

const HIGHLIGHTS = [
    "Verified tutors approved by our admins",
    "Filter by subject, class level and mode",
    "Apply in a minute and track every request",
];


export default function AuthLayout({ children }) {

    return (
        <div className="grid flex-1 lg:grid-cols-[1.05fr_1fr]">
            <aside className="relative hidden overflow-hidden bg-linear-to-br from-footer-from to-footer-to p-12 text-white lg:flex lg:flex-col lg:justify-between">
                
                <div
                    className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-accent/25 blur-3xl"
                    aria-hidden="true"
                />

                <div
                    className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full border border-white/15"
                    aria-hidden="true"
                />

                <Logo light className="relative" />

                <div className="relative max-w-md">
                    <h2 className="text-4xl leading-tight text-white">
                        The right mentor makes learning feel lighter.
                    </h2>

                    <ul className="mt-8 space-y-4">
                        {HIGHLIGHTS.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-white/85">
                                
                                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-on">
                                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                                </span>

                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative text-sm text-white/60">
                    Tuition and mentorship across Bangladesh
                </p>
            </aside>

            <main className="relative flex items-center justify-center px-4 py-12 sm:px-8">
                <ThemeToggle className="absolute right-4 top-4" />

                <div className="w-full max-w-md">
                    <div className="mb-6 flex justify-center lg:hidden">
                        <Logo />
                    </div>

                    <div className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
                        {children}
                    </div>
                </div>

            </main>
        </div>
    );
}