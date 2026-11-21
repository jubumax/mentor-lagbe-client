import RoleGuard from "@/components/dashboard/RoleGuard";
import { ROLES } from "@/lib/constants";

export default function AdminLayout({ children }) {
    return <RoleGuard allow={ROLES.ADMIN}>{children}</RoleGuard>;
}