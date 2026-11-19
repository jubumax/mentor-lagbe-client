import { cn } from "@/lib/utils";
import FormField, { controlClass } from "@/components/forms/FormField";

export default function Input({
    label,
    error,
    hint,
    icon: Icon,
    id,
    name,
    required,
    className,
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
                {Icon && (
                    <Icon
                        className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted"
                        aria-hidden="true"
                    />
                )}
                <input
                    id={fieldId}
                    name={name}
                    required={required}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${fieldId}-error` : undefined}
                    className={cn(controlClass(error), "h-11", Icon && "pl-10")}
                    {...props}
                />
            </div>
        </FormField>
    );
}