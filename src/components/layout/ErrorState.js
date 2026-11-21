"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import Button from "@/components/ui/Button";


export default function ErrorState({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section className="flex flex-1 items-center justify-center px-4 py-20">
            <div className="max-w-md text-center">
                <span className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-danger-soft text-danger">
                    <TriangleAlert className="size-7" aria-hidden="true" />
                </span>

                <h1 className="text-3xl sm:text-4xl">Something went wrong</h1>

                <p className="mt-3 text-muted">
                    An unexpected error happened while loading this page. You can try
                    again, or head back to the home page.
                </p>

                {error?.digest && (
                    <p className="mt-3 text-xs text-muted">Reference: {error.digest}</p>
                )}

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button size="lg" onClick={() => reset()}>
                        Try again
                    </Button>

                    <Button href="/" variant="outline" size="lg">
                        Back to home
                    </Button>
                </div>
            </div>
        </section>
    );
}