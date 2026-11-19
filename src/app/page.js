import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ThemeToggle from "@/components/layout/ThemeToggle";


export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
      <ThemeToggle className="border border-line bg-surface" />
      <h1 className="text-4xl sm:text-5xl">MentorLagbe</h1>
      <p className="max-w-md text-muted">
        Theme preview: switch between light and dark and check the colors.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>Primary</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="soft">Soft</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge tone="primary">Primary</Badge>
        <Badge tone="accent">Pending</Badge>
        <Badge tone="success">Accepted</Badge>
        <Badge tone="danger">Rejected</Badge>
      </div>
    </main>
  );
}