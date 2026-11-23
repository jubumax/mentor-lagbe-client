"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";


export default function FaqAccordion({ items }) {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="mt-8 space-y-3">
            {items.map(({ question, answer }, index) => {
                const isOpen = openIndex === index;
                const panelId = `faq-panel-${index}`;

                return (
                    <div
                        key={question}
                        className={cn(
                            "overflow-hidden rounded-card border bg-surface shadow-card transition-colors duration-300 hover:border-primary/40",
                            isOpen ? "border-primary/40" : "border-line"
                        )}
                    >
                        <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-semibold text-ink"
                        >
                            {question}
                            <ChevronDown
                                className={cn(
                                    "size-5 shrink-0 text-muted transition-transform duration-300 ease-out motion-reduce:transition-none",
                                    isOpen && "rotate-180"
                                )}
                                aria-hidden="true"
                            />
                        </button>

                        <div
                            id={panelId}
                            role="region"
                            className={cn(
                                "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                                isOpen
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0"
                            )}
                        >
                            <div className="overflow-hidden">
                                <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                                    {answer}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}