import { GraduationCap, Presentation } from "lucide-react";
import { ROLES } from "@/lib/constants";

const OPTIONS = [
    {
        value: ROLES.STUDENT,
        label: "Student",
        description: "Find tutors and apply",
        icon: GraduationCap,
    },
    {
        value: ROLES.TUTOR,
        label: "Tutor",
        description: "Post tuitions and teach",
        icon: Presentation,
    },
];


export default function RoleSelector({ value, onChange, name = "role" }) {

    return (
        <fieldset>
            <legend className="mb-1.5 text-sm font-semibold text-ink hover:tracking-widest transition-all duration-300 cursor-pointer">
                I want to join as
            </legend>

            <div className="grid grid-cols-2 gap-3">
                {OPTIONS.map(({ value: optionValue, label, description, icon: Icon }) => (

                    <label
                        key={optionValue}
                        className="flex cursor-pointer items-start gap-3 rounded-control border border-line bg-surface p-3.5 transition-colors hover:border-primary/50 has-checked:border-primary has-checked:bg-primary-soft has-focus-visible:ring-4 has-focus-visible:ring-primary/15"
                    >

                        <input
                            type="radio"
                            name={name}
                            value={optionValue}
                            checked={value === optionValue}
                            onChange={onChange}
                            className="sr-only"
                        />

                        <Icon className="mt-0.5 size-5 shrink-0 text-link" aria-hidden="true" />

                        <span>
                            <span className="block text-sm font-semibold text-ink">{label}</span>
                            <span className="block text-xs text-muted">{description}</span>
                        </span>
                        
                    </label>
                ))}
            </div>
        </fieldset>
    );
}