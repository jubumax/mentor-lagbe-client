"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, Search } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import {
    CLASS_LEVELS,
    SORT_OPTIONS,
    SUBJECTS,
    TUITION_MODES,
} from "@/lib/tuition-options";

const SEARCH_DELAY = 400;


export default function SearchFilterBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") ?? "");
    const timer = useRef(null);

    const subject = searchParams.get("subject") ?? "";
    const classLevel = searchParams.get("classLevel") ?? "";
    const mode = searchParams.get("mode") ?? "";
    const sort = searchParams.get("sort") ?? "";
    const hasFilters = Boolean(search || subject || classLevel || mode || sort);

    useEffect(() => () => clearTimeout(timer.current), []);


    function update(changes) {
        const params = new URLSearchParams(window.location.search);
        Object.entries(changes).forEach(([key, value]) => {
            if (value) params.set(key, value);
            else params.delete(key);
        });
        params.delete("page");

        const query = params.toString();
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }

    function handleSearchChange(event) {
        const value = event.target.value;
        setSearch(value);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => update({ search: value.trim() }), SEARCH_DELAY);
    }

    function handleSearchSubmit(event) {
        event.preventDefault();
        clearTimeout(timer.current);
        update({ search: search.trim() });
    }

    function handleReset() {
        clearTimeout(timer.current);
        setSearch("");
        router.replace(pathname, { scroll: false });
    }


    return (
        <form
            onSubmit={handleSearchSubmit}
            role="search"
            className="rounded-card border border-line bg-surface p-4 shadow-card"
        >
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-12">
                <Input
                    name="search"
                    type="search"
                    icon={Search}
                    placeholder="Search by title or subject"
                    aria-label="Search tuitions"
                    autoComplete="off"
                    value={search}
                    onChange={handleSearchChange}
                    className="md:col-span-2 lg:col-span-4"
                />

                <Select
                    name="subject"
                    aria-label="Subject"
                    value={subject}
                    onChange={(event) => update({ subject: event.target.value })}
                    className="lg:col-span-2"
                >
                    <option value="">All subjects</option>
                    {SUBJECTS.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </Select>

                <Select
                    name="classLevel"
                    aria-label="Class level"
                    value={classLevel}
                    onChange={(event) => update({ classLevel: event.target.value })}
                    className="lg:col-span-2"
                >
                    <option value="">All levels</option>
                    {CLASS_LEVELS.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </Select>

                <Select
                    name="mode"
                    aria-label="Mode"
                    value={mode}
                    onChange={(event) => update({ mode: event.target.value })}
                    className="lg:col-span-2"
                >
                    <option value="">Any mode</option>
                    {TUITION_MODES.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </Select>

                <Select
                    name="sort"
                    aria-label="Sort by"
                    value={sort}
                    onChange={(event) => update({ sort: event.target.value })}
                    className="lg:col-span-2"
                >
                    {SORT_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </Select>
            </div>

            {hasFilters && (
                <div className="mt-3 flex justify-end">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-link hover:underline"
                    >
                        <RotateCcw className="size-4" aria-hidden="true" />

                        Reset filters
                    </button>
                </div>
            )}
        </form>
    );
}