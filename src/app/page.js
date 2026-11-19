import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <h1 className="text-4xl sm:text-5xl">MentorLagbe</h1>
        <p className="max-w-md text-muted">
          Navbar preview: resize the window, toggle the theme and open the
          mobile menu.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button>Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge tone="primary">Primary</Badge>
          <Badge tone="accent">Pending</Badge>
          <Badge tone="success">Accepted</Badge>
          <Badge tone="danger">Rejected</Badge>
        </div>
      </main>
    </>
  );
}