import { cn } from "@/lib/utils";
import FormField, { controlClass } from "@/components/forms/FormField";

export default function Textarea({
    label,
    error,
    hint,
    id,
    name,
    required,
    className,
    rows = 4,
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
            <textarea
                id={fieldId}
                name={name}
                rows={rows}
                required={required}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${fieldId}-error` : undefined}
                className={cn(controlClass(error), "resize-y py-3")}
                {...props}
            />
        </FormField>
    );
}