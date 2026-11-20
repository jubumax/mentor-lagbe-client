import { LayoutDashboard, UserRound } from "lucide-react";

export const USER_MENU_LINKS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Update profile", href: "/dashboard/profile", icon: UserRound },
];

export const ROLE_BADGES = {
    student: { label: "Student", tone: "primary" },
    tutor: { label: "Tutor", tone: "accent" },
    admin: { label: "Admin", tone: "success" },
};