import { SearchX } from "lucide-react";
import Button from "@/components/ui/Button";


export default function NotFoundState({
    title = "We couldn't find that page",
    description = "The link may be broken, or the page may have been moved or removed.",
}) {

    return (
        <section className="flex flex-1 items-center justify-center px-4 py-20">
            <div className="max-w-lg text-center">
                <p
                    className="font-display text-[8rem] font-extrabold leading-none text-primary/10 sm:text-[11rem]"
                    aria-hidden="true"
                >
                    404
                </p>

                <div className="-mt-10 sm:-mt-16">
                    <span className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-on-primary">
                        <SearchX className="size-7" aria-hidden="true" />
                    </span>

                    <h1 className="text-3xl sm:text-4xl">{title}</h1>
                    <p className="mt-3 text-muted">{description}</p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button href="/" size="lg">
                            Back to home
                        </Button>

                        {/* <Button href="/tuitions" variant="outline" size="lg">
                            Browse tuitions
                        </Button> */}
                    </div>
                </div>
            </div>
        </section>
    );
}