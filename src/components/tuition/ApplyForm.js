"use client";

import { useState } from "react";
import { Phone, Send } from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { useAuth } from "@/hooks/useAuth";
import { api, ApiError } from "@/lib/api";
import { SCHEDULE_OPTIONS } from "@/lib/tuition-options";
import { NOTE_MAX_LENGTH, validateApplication } from "@/lib/validators";


export default function ApplyForm({ tuitionId, onApplied, onCancel }) {
    const { user } = useAuth();

    const [values, setValues] = useState({
        phone: user?.phone ?? "",
        preferredSchedule: SCHEDULE_OPTIONS[0],
        learningNote: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setValues((previous) => ({ ...previous, [name]: value }));
        if (errors[name]) {
            setErrors((previous) => ({ ...previous, [name]: undefined }));
        }
    }


    async function handleSubmit(event) {
        event.preventDefault();

        const nextErrors = validateApplication(values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        setLoading(true);
        try {
            const data = await api.post("/applications", {
                tuitionId,
                phone: values.phone.trim(),
                preferredSchedule: values.preferredSchedule,
                learningNote: values.learningNote.trim(),
            });
            toast.success(data?.message ?? "Application sent.");
            onApplied("pending");

        } catch (error) {
            if (error instanceof ApiError) {
                if (error.errors) setErrors(error.errors);
                toast.error(error.message);

                if (error.status === 409) onApplied("pending");
            } else {
                toast.error("Something went wrong. Please try again.");
            }

        } finally {
            setLoading(false);
        }
    }


    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Input
                label="Contact phone number"
                name="phone"
                type="tel"
                icon={Phone}
                placeholder="+880 1700-000000"
                autoComplete="tel"
                required
                value={values.phone}
                onChange={handleChange}
                error={errors.phone}
            />

            <Select
                label="Preferred schedule"
                name="preferredSchedule"
                required
                value={values.preferredSchedule}
                onChange={handleChange}
                error={errors.preferredSchedule}
            >
                {SCHEDULE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </Select>

            <Textarea
                label="Note for the tutor (optional)"
                name="learningNote"
                rows={4}
                placeholder="Share your current level, target exam or the chapters you need help with."
                value={values.learningNote}
                onChange={handleChange}
                error={errors.learningNote}
                hint={`${values.learningNote.length} / ${NOTE_MAX_LENGTH}`}
            />

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <Button variant="outline" onClick={onCancel} disabled={loading}>
                    Cancel
                </Button>

                <Button type="submit" loading={loading}>
                    <Send className="size-4" aria-hidden="true" />
                    Confirm application
                </Button>
            </div>
        </form>
    );
}