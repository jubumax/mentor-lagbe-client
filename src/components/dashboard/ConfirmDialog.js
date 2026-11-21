"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";


export default function ConfirmDialog({
    open,
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Keep it",
    tone = "danger",
    loading = false,
    onConfirm,
    onClose,
}) {
    return (
        <Modal open={open} onClose={onClose} title={title} description={description}>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <Button variant="outline" onClick={onClose} disabled={loading}>
                    {cancelLabel}
                </Button>

                <Button
                    variant={tone === "danger" ? "danger" : "primary"}
                    onClick={onConfirm}
                    loading={loading}
                >
                    {confirmLabel}
                </Button>

            </div>
        </Modal>
    );
}