import { ROLES } from "@/lib/constants";

// Every role has its own home inside the dashboard.
export function getDashboardPath(role) {

    switch (role) {
        case ROLES.STUDENT:
            return "/dashboard/student";

        case ROLES.TUTOR:
            return "/dashboard/tutor";

        case ROLES.ADMIN:
            return "/dashboard/admin";

        default:
            return "/";
    }
}