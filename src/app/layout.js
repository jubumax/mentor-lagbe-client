import "./globals.css";
import { fontBody, fontDisplay } from "@/lib/fonts";
import { SITE } from "@/lib/constants";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "MentorLagbe",
    template: "%s | MentorLagbe",
  },
  description:
    "Find verified tutors by subject, class level and mode. Join tuition batches or book 1-on-1 mentorship on MentorLagbe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}