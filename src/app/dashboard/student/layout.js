import RoleGuard from "@/components/dashboard/RoleGuard";
import { ROLES } from "@/lib/constants";

export default function StudentLayout({ children }) {
    return <RoleGuard allow={ROLES.STUDENT}>{children}</RoleGuard>;
}