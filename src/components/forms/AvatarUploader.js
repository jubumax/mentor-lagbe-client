"use client";

import { useEffect, useMemo, useRef } from "react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";


export default function AvatarUploader({ name, file, url, onFileChange, onRemove, error }) {
    const inputRef = useRef(null);

    const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const shown = preview ?? url;


    return (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Avatar user={{ name, image: shown }} className="size-24 text-2xl" />
            <div>
                <p className="font-semibold text-ink">Profile photo</p>
                <p className="mt-1 text-sm text-muted">JPG, PNG, WebP or GIF, up to 5 MB.</p>

                <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => inputRef.current?.click()}>
                        Upload new photo
                    </Button>

                    {shown && (
                        <Button size="sm" variant="ghost" onClick={onRemove}>
                            Remove
                        </Button>
                    )}
                </div>

                {error && (
                    <p role="alert" className="mt-2 text-xs font-medium text-danger">
                        {error}
                    </p>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={(event) => {
                    const selected = event.target.files?.[0];
                    if (selected) onFileChange(selected);
                    event.target.value = "";
                }}
            />
        </div>
    );
}