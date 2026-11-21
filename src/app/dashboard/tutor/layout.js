import RoleGuard from "@/components/dashboard/RoleGuard";
import { ROLES } from "@/lib/constants";

export default function TutorLayout({ children }) {
    return <RoleGuard allow={ROLES.TUTOR}>{children}</RoleGuard>;
}