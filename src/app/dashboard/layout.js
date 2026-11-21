import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: { default: "Dashboard", template: "%s | MentorLagbe" },
  robots: { index: false },
};

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}