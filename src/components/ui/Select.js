import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import FormField, { controlClass } from "@/components/forms/FormField";

export default function Select({
    label,
    error,
    hint,
    id,
    name,
    required,
    className,
    children,
    ...props
}) {
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
                <select
                    id={fieldId}
                    name={name}
                    required={required}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${fieldId}-error` : undefined}
                    className={cn(controlClass(error), "h-11 appearance-none pr-10")}
                    {...props}
                >
                    {children}
                </select>
                <ChevronDown
                    className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                />
            </div>
        </FormField>
    );
}