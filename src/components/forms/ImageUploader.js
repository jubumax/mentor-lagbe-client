"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";


export default function ImageUploader({
    label,
    file,
    url,
    onFileChange,
    onRemove,
    error,
    hint,
}) {
    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const shown = preview ?? url;

    function pick(selected) {
        if (selected) onFileChange(selected);
    }


    return (
        <div className="space-y-1.5">
            <p className="text-sm font-semibold text-ink">{label}</p>

            {shown ? (
                <div className="overflow-hidden rounded-control border border-line bg-surface-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={shown} alt="Banner preview" className="aspect-[16/7] w-full object-cover" />

                    <div className="flex items-center justify-between gap-3 border-t border-line bg-surface p-3">
                        <p className="min-w-0 truncate text-xs text-muted">
                            {file ? file.name : "Current banner image"}
                        </p>

                        <div className="flex shrink-0 gap-2">
                            <Button size="sm" variant="outline" onClick={() => inputRef.current?.click()}>
                                Change
                            </Button>

                            <Button size="sm" variant="ghost" onClick={onRemove}>
                                <Trash2 className="size-4" aria-hidden="true" />
                                Remove
                            </Button>
                        </div>
                    </div>

                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(event) => {
                        event.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(event) => {
                        event.preventDefault();
                        setDragging(false);
                        pick(event.dataTransfer.files?.[0]);
                    }}
                    className={cn(
                        "flex w-full flex-col items-center gap-2 rounded-control border border-dashed px-4 py-8 text-center transition-colors",
                        dragging ? "border-primary bg-primary-soft" : "border-line bg-surface hover:border-primary/50",
                        error && "border-danger"
                    )}
                >
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary-soft text-link">
                        <ImagePlus className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-ink">Click to upload or drag an image here</span>
                    <span className="text-xs text-muted">JPG, PNG, WebP or GIF, up to 5 MB</span>
                </button>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={(event) => {
                    pick(event.target.files?.[0]);
                    event.target.value = "";
                }}
            />

            {error ? (
                <p role="alert" className="text-xs font-medium text-danger">
                    {error}
                </p>
            ) : hint ? (
                <p className="text-xs text-muted">{hint}</p>
            ) : null}
        </div>
    );
}