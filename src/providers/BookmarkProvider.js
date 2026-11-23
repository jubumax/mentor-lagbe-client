"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { ROLES } from "@/lib/constants";

export const BookmarkContext = createContext(null);


export function BookmarkProvider({ children }) {
    const { user, role, isAuthenticated } = useAuth();
    const userId = user?.id ?? null;
    const isStudent = isAuthenticated && role === ROLES.STUDENT;

    const [saved, setSaved] = useState({ owner: null, ids: [] });

    useEffect(() => {
        if (!isStudent) return;

        let cancelled = false;
        api
            .get("/bookmarks/ids")
            .then((data) => {
                if (!cancelled) setSaved({ owner: userId, ids: data?.ids ?? [] });
            })
            .catch(() => {
                // The buttons simply start as "not saved" if this fails
            });

        return () => {
            cancelled = true;
        };
    }, [isStudent, userId]);


    const isReady = isStudent && saved.owner === userId;
    const ids = isReady ? saved.ids : [];

    const toggle = useCallback(
        async (tuitionId) => {
            const wasSaved = ids.includes(tuitionId);


            setSaved((previous) => ({
                owner: userId,
                ids: wasSaved
                    ? previous.ids.filter((id) => id !== tuitionId)
                    : [...previous.ids, tuitionId],
            }));

            try {
                if (wasSaved) await api.delete(`/bookmarks/${tuitionId}`);
                else await api.post(`/bookmarks/${tuitionId}`);
                toast.success(wasSaved ? "Removed from saved tuitions." : "Tuition saved.");
            } catch (error) {

                setSaved((previous) => ({
                    owner: userId,
                    ids: wasSaved
                        ? [...previous.ids, tuitionId]
                        : previous.ids.filter((id) => id !== tuitionId),
                }));
                toast.error(error.message || "Could not update your saved tuitions.");
            }
        },
        [ids, userId]
    );

    const value = useMemo(
        () => ({ ids, isReady, isSaved: (tuitionId) => ids.includes(tuitionId), toggle }),
        [ids, isReady, toggle]
    );

    return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
}