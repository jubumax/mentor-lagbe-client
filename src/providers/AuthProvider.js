"use client";

import { createContext, useCallback, useEffect, useMemo } from "react";
import { authClient } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const { data, isPending, refetch } = authClient.useSession();
    const user = data?.user ?? null;
    const userId = user?.id ?? null;

    useEffect(() => {
        clearToken();
    }, [userId]);

    const signOut = useCallback(() => authClient.signOut(), []);

    const value = useMemo(
        () => ({
            user,
            role: user?.role ?? null,
            plan: user?.plan ?? "free",
            isAuthenticated: Boolean(user),
            isLoading: isPending,
            refetch,
            signOut,
        }),
        [user, isPending, refetch, signOut]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}