import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { API_URL } from "@/lib/constants";


export const authClient = createAuthClient({
    baseURL: API_URL,
    fetchOptions: { credentials: "include" },
    plugins: [
        inferAdditionalFields({
            user: {
                role: { type: "string" },
                plan: { type: "string" },
                phone: { type: "string" },
                bio: { type: "string" },
            },
        }),
    ],
});