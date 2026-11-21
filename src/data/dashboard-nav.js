import {
    BookOpen,
    CirclePlus,
    ClipboardList,
    LayoutDashboard,
    Receipt,
    UserRound,
    Users,
} from "lucide-react";


export const DASHBOARD_NAV = {
    student: [
        { label: "Overview", href: "/dashboard/student", icon: LayoutDashboard, exact: true },
        { label: "My applications", href: "/dashboard/student/my-applications", icon: ClipboardList },
    ],
    tutor: [
        { label: "Overview", href: "/dashboard/tutor", icon: LayoutDashboard, exact: true },
        { label: "Post tuition", href: "/dashboard/tutor/post-tuition", icon: CirclePlus },
        { label: "My tuitions", href: "/dashboard/tutor/my-tuitions", icon: BookOpen },
        { label: "Applicants", href: "/dashboard/tutor/applicants", icon: Users },
    ],
    admin: [
        { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard, exact: true },
        { label: "Users", href: "/dashboard/admin/users", icon: Users },
        { label: "Tuitions", href: "/dashboard/admin/tuitions", icon: BookOpen },
        { label: "Transactions", href: "/dashboard/admin/transactions", icon: Receipt },
    ],
};


// Shown for every role

export const SHARED_NAV = [
    { label: "Update profile", href: "/dashboard/profile", icon: UserRound },
];