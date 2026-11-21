"use client";

import { useState } from "react";
import { Banknote, Laptop, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import ImageUploader from "@/components/forms/ImageUploader";
import { api, ApiError } from "@/lib/api";
import { uploadToImgbb, validateImageFile } from "@/lib/imgbb";
import { CLASS_LEVELS, SUBJECTS } from "@/lib/tuition-options";
import { DESCRIPTION_MIN, validateTuition } from "@/lib/validators";


const MODES = [
    { value: "Online", label: "Online", note: "Zoom or Meet", icon: Laptop },
    { value: "Offline", label: "Offline", note: "In person or at home", icon: MapPin },
];

const DAY_OPTIONS = [1, 2, 3, 4, 5, 6, 7];


export default function TuitionForm({ tuition, submitLabel = "Submit for review", onSaved }) {
    const isEdit = Boolean(tuition);

    const [values, setValues] = useState({
        title: tuition?.title ?? "",
        subject: tuition?.subject ?? "",
        classLevel: tuition?.classLevel ?? "",
        mode: tuition?.mode ?? "Online",
        location: tuition?.mode === "Offline" ? (tuition?.location ?? "") : "",
        monthlyFee: tuition ? String(tuition.monthlyFee) : "",
        daysPerWeek: tuition ? String(tuition.daysPerWeek) : "3",
        description: tuition?.description ?? "",
    });
    const [bannerFile, setBannerFile] = useState(null);
    const [bannerUrl, setBannerUrl] = useState(tuition?.bannerImage ?? "");
    const [errors, setErrors] = useState({});
    const [stage, setStage] = useState("idle");             // idle | uploading | saving

    const busy = stage !== "idle";

    function handleChange(event) {
        const { name, value } = event.target;
        setValues((previous) => ({ ...previous, [name]: value }));

        if (errors[name]) {
            setErrors((previous) => ({ ...previous, [name]: undefined }));
        }
    }

    function handleFileChange(file) {
        const problem = validateImageFile(file);

        if (problem) {
            setErrors((previous) => ({ ...previous, bannerImage: problem }));
            return;
        }

        setBannerFile(file);
        setErrors((previous) => ({ ...previous, bannerImage: undefined }));
    }

    function handleRemoveBanner() {
        setBannerFile(null);
        setBannerUrl("");
    }


    async function handleSubmit(event) {
        event.preventDefault();

        const nextErrors = validateTuition(values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            toast.error("Please fix the highlighted fields.");
            return;
        }

        try {
            let bannerImage = bannerUrl;
            if (bannerFile) {
                setStage("uploading");
                bannerImage = await uploadToImgbb(bannerFile);
            }

            setStage("saving");
            const payload = {
                title: values.title.trim(),
                subject: values.subject,
                classLevel: values.classLevel,
                mode: values.mode,
                location: values.mode === "Offline" ? values.location.trim() : "",
                monthlyFee: Number(values.monthlyFee),
                daysPerWeek: Number(values.daysPerWeek),
                description: values.description.trim(),
                bannerImage,
            };

            const data = isEdit
                ? await api.put(`/tuitions/${tuition._id}`, payload)
                : await api.post("/tuitions", payload);

            toast.success(data?.message ?? "Saved.");
            onSaved?.(data?.tuition);

        } catch (error) {
            if (error instanceof ApiError && error.errors) setErrors(error.errors);
            toast.error(error.message || "Something went wrong. Please try again.");

        } finally {
            setStage("idle");
        }
    }

    const buttonLabel =
        stage === "uploading" ? "Uploading image..." : stage === "saving" ? "Saving..." : submitLabel;


    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6 rounded-card border border-line bg-surface p-5 shadow-card sm:p-8"
        >
            <Input
                label="Tuition title"
                name="title"
                required
                placeholder="e.g. HSC Physics: Mechanics and Waves"
                value={values.title}
                onChange={handleChange}
                error={errors.title}
            />

            <div className="grid gap-5 sm:grid-cols-2">
                <Select
                    label="Subject"
                    name="subject"
                    required
                    value={values.subject}
                    onChange={handleChange}
                    error={errors.subject}
                >
                    <option value="">Select a subject</option>
                    {SUBJECTS.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </Select>

                <Select
                    label="Class level"
                    name="classLevel"
                    required
                    value={values.classLevel}
                    onChange={handleChange}
                    error={errors.classLevel}
                >
                    <option value="">Select a level</option>
                    {CLASS_LEVELS.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </Select>
            </div>

            <fieldset>
                <legend className="mb-1.5 text-sm font-semibold text-ink">
                    Tuition mode<span className="text-danger"> *</span>
                </legend>

                <div className="grid grid-cols-2 gap-3">
                    {MODES.map(({ value, label, note, icon: Icon }) => (
                        <label
                            key={value}
                            className="flex cursor-pointer items-center gap-3 rounded-control border border-line bg-surface p-3.5 transition-colors hover:border-primary/50 has-checked:border-primary has-checked:bg-primary-soft has-focus-visible:ring-4 has-focus-visible:ring-primary/15"
                        >
                            <input
                                type="radio"
                                name="mode"
                                value={value}
                                checked={values.mode === value}
                                onChange={handleChange}
                                className="sr-only"
                            />

                            <Icon className="size-5 shrink-0 text-link" aria-hidden="true" />

                            <span>
                                <span className="block text-sm font-semibold text-ink">{label}</span>
                                <span className="block text-xs text-muted">{note}</span>
                            </span>
                        </label>
                    ))}
                </div>

                {errors.mode && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-danger">
                        {errors.mode}
                    </p>
                )}
            </fieldset>

            {values.mode === "Offline" && (
                <Input
                    label="Location"
                    name="location"
                    icon={MapPin}
                    required
                    placeholder="e.g. Mirpur 10, Dhaka"
                    value={values.location}
                    onChange={handleChange}
                    error={errors.location}
                />
            )}

            <div className="grid gap-5 sm:grid-cols-2">
                <Input
                    label="Monthly fee (৳)"
                    name="monthlyFee"
                    type="number"
                    min="1"
                    inputMode="numeric"
                    icon={Banknote}
                    required
                    placeholder="e.g. 2500"
                    value={values.monthlyFee}
                    onChange={handleChange}
                    error={errors.monthlyFee}
                />

                <Select
                    label="Days per week"
                    name="daysPerWeek"
                    required
                    value={values.daysPerWeek}
                    onChange={handleChange}
                    error={errors.daysPerWeek}
                >
                    {DAY_OPTIONS.map((day) => (
                        <option key={day} value={day}>
                            {day} {day === 1 ? "day" : "days"} / week
                        </option>
                    ))}
                </Select>
            </div>

            <ImageUploader
                label="Banner image (optional)"
                file={bannerFile}
                url={bannerUrl}
                onFileChange={handleFileChange}
                onRemove={handleRemoveBanner}
                error={errors.bannerImage}
                hint="A clear image helps your tuition stand out in the listing."
            />

            <Textarea
                label="Description"
                name="description"
                rows={6}
                required
                placeholder="Describe what students will learn, how you teach and what they should know beforehand."
                value={values.description}
                onChange={handleChange}
                error={errors.description}
                hint={`${values.description.trim().length} characters (minimum ${DESCRIPTION_MIN})`}
            />

            <div className="flex justify-end">
                <Button type="submit" size="lg" loading={busy} className="w-full sm:w-auto">
                    {!busy && <Send className="size-4" aria-hidden="true" />}
                    {buttonLabel}
                </Button>
            </div>
        </form>
    );
}