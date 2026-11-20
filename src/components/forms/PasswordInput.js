"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import FormField, { controlClass } from "@/components/forms/FormField";


export default function PasswordInput({
    label,
    error,
    hint,
    id,
    name,
    required,
    className,
    ...props
}) {
    const [visible, setVisible] = useState(false);
    const fieldId = id ?? name;

    return (
        <FormField
            id={fieldId}
            label={label}
            required={required}
            hint={hint}
            error={error}
            className={className}
        >
            <div className="relative">
                <Lock
                    className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted"
                    aria-hidden="true"
                />

                <input
                    id={fieldId}
                    name={name}
                    type={visible ? "text" : "password"}
                    required={required}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${fieldId}-error` : undefined}
                    className={cn(controlClass(error), "h-11 pl-10 pr-11")}
                    {...props}
                />

                <button
                    type="button"
                    onClick={() => setVisible((value) => !value)}
                    aria-label={visible ? "Hide password" : "Show password"}
                    className="absolute right-1.5 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                    {visible ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
                </button>
                
            </div>
        </FormField>
    );
}