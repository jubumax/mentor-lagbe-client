"use client";

import { useState } from "react";
import { CloudOff, Crown, Mail, Phone, Save, User } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/dashboard/PageHeader";
import AvatarUploader from "@/components/forms/AvatarUploader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import Skeleton from "@/components/ui/Skeleton";
import Textarea from "@/components/ui/Textarea";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { api, ApiError } from "@/lib/api";
import { uploadToImgbb, validateImageFile } from "@/lib/imgbb";
import { BIO_MAX_LENGTH, validateProfile } from "@/lib/validators";
import { ROLE_BADGES } from "@/data/user-menu";
import { formatDate } from "@/lib/utils";


function ProfileEditor({ user }) {
    const { refetch } = useAuth();

    const [saved, setSaved] = useState({
        name: user.name ?? "",
        phone: user.phone ?? "",
        bio: user.bio ?? "",
        image: user.image ?? "",
    });
    const [values, setValues] = useState({
        name: saved.name,
        phone: saved.phone,
        bio: saved.bio,
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(saved.image);
    const [errors, setErrors] = useState({});
    const [stage, setStage] = useState("idle");                     // idle | uploading | saving

    const busy = stage !== "idle";
    const isDirty =
        values.name !== saved.name ||
        values.phone !== saved.phone ||
        values.bio !== saved.bio ||
        photoUrl !== saved.image ||
        Boolean(photoFile);

    const roleBadge = ROLE_BADGES[user.role] ?? ROLE_BADGES.student;


    function handleChange(event) {
        const { name, value } = event.target;
        setValues((previous) => ({ ...previous, [name]: value }));
        if (errors[name]) {
            setErrors((previous) => ({ ...previous, [name]: undefined }));
        }
    }

    function handlePhotoChange(file) {
        const problem = validateImageFile(file);
        if (problem) {
            setErrors((previous) => ({ ...previous, image: problem }));
            return;
        }
        setPhotoFile(file);
        setErrors((previous) => ({ ...previous, image: undefined }));
    }

    function handlePhotoRemove() {
        setPhotoFile(null);
        setPhotoUrl("");
    }


    async function handleSubmit(event) {
        event.preventDefault();

        const nextErrors = validateProfile(values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        try {
            let image = photoUrl;
            if (photoFile) {
                setStage("uploading");
                image = await uploadToImgbb(photoFile);
            }

            setStage("saving");
            const payload = {
                name: values.name.trim(),
                phone: values.phone.trim(),
                bio: values.bio.trim(),
                image,
            };
            const data = await api.patch("/users/profile", payload);

            toast.success(data?.message ?? "Profile updated.");
            setSaved({ ...payload });
            setValues({ name: payload.name, phone: payload.phone, bio: payload.bio });
            setPhotoFile(null);
            setPhotoUrl(image);
            refetch();

        } catch (error) {
            if (error instanceof ApiError && error.errors) setErrors(error.errors);
            toast.error(error.message || "Could not save your profile.");

        } finally {
            setStage("idle");
        }
    }

    const buttonLabel =
        stage === "uploading" ? "Uploading photo..." : stage === "saving" ? "Saving..." : "Save changes";


    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-8 rounded-card border border-line bg-surface p-5 shadow-card sm:p-8"
        >
            <AvatarUploader
                name={values.name || user.name}
                file={photoFile}
                url={photoUrl}
                onFileChange={handlePhotoChange}
                onRemove={handlePhotoRemove}
                error={errors.image}
            />

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-control bg-surface-2 p-4 text-sm">
                <div className="flex items-center gap-2">
                    <span className="text-muted">Account role</span>
                    <Badge tone={roleBadge.tone}>{roleBadge.label}</Badge>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-muted">Plan</span>
                    {user.plan === "pro" ? (
                        <Badge tone="accent" icon={Crown}>
                            Pro member
                        </Badge>
                    ) : (
                        <Badge tone="neutral">Free</Badge>
                    )}
                </div>

                {user.createdAt && (
                    <div className="flex items-center gap-2">
                        <span className="text-muted">Member since</span>
                        <span className="font-semibold text-ink">{formatDate(user.createdAt)}</span>
                    </div>
                )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <Input
                    label="Full name"
                    name="name"
                    icon={User}
                    required
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                />

                <Input
                    label="Email address"
                    name="email"
                    type="email"
                    icon={Mail}
                    value={user.email}
                    disabled
                    hint="Your email can't be changed."
                    readOnly
                />
            </div>

            <Input
                label="Phone number"
                name="phone"
                type="tel"
                icon={Phone}
                autoComplete="tel"
                placeholder="+880 1700-000000"
                value={values.phone}
                onChange={handleChange}
                error={errors.phone}
                hint="Used to pre-fill your applications."
            />

            <Textarea
                label="Bio and academic background"
                name="bio"
                rows={5}
                placeholder="Tell students or tutors a little about yourself."
                value={values.bio}
                onChange={handleChange}
                error={errors.bio}
                hint={`${values.bio.trim().length} / ${BIO_MAX_LENGTH}`}
            />

            <div className="flex items-center justify-end gap-3">
                {!isDirty && !busy && <p className="text-sm text-muted">No changes to save.</p>}
                <Button type="submit" size="lg" loading={busy} disabled={!isDirty}>
                    {!busy && <Save className="size-4" aria-hidden="true" />}
                    {buttonLabel}
                </Button>
            </div>
        </form>
    );
}


export default function ProfileForm() {
    const { data, error, isLoading, reload } = useApi("/users/me");

    return (
        <div className="mx-auto max-w-3xl">
            <PageHeader
                title="Account profile"
                description="Update your public details and profile photo."
            />

            {error ? (
                <EmptyState icon={CloudOff} title="We couldn't load your profile" description={error.message}>
                    <Button variant="outline" onClick={reload}>
                        Try again
                    </Button>
                </EmptyState>
            ) : isLoading && !data ? (
                <Skeleton className="h-[34rem] w-full rounded-card" />
            ) : (
                <ProfileEditor user={data.user} />
            )}
        </div>
    );
}