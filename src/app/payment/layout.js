import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/layout/ThemeToggle";

export const metadata = { robots: { index: false } };

export default function PaymentLayout({ children }) {
    return (
        <div className="flex flex-1 flex-col">

            <header className="flex items-center justify-between px-4 py-5 sm:px-8">
                <Logo />
                <ThemeToggle />
            </header>

            <main className="flex flex-1 items-center justify-center px-4 pb-16">{children}</main>

        </div>
    );
}