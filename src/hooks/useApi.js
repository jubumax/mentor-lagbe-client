"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";


// Loads data from a protected API path. Call reload() to fetch it again.

export function useApi(path) {
    const [version, setVersion] = useState(0);
    const [result, setResult] = useState({ key: null, data: null, error: null });

    const key = `${path}#${version}`;

    useEffect(() => {
        let cancelled = false;

        api
            .get(path)
            .then((data) => {
                if (!cancelled) setResult({ key, data, error: null });
            })
            .catch((error) => {
                if (!cancelled) setResult({ key, data: null, error });
            });

        return () => {
            cancelled = true;
        };
    }, [path, key]);


    const reload = useCallback(() => setVersion((value) => value + 1), []);

    return {
        data: result.data,
        error: result.error,
        isLoading: result.key !== key,
        reload,
    };
}