import Logo from "@/components/ui/Logo";
import NotFoundState from "@/components/layout/NotFoundState";


export default function NotFound() {
    return (
        <div className="flex flex-1 flex-col">
            <header className="px-4 py-6 sm:px-8">
                <Logo />
            </header>

            <NotFoundState />
        </div>
    );
}