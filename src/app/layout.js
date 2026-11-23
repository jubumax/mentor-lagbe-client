import "./globals.css";
import { fontBody, fontDisplay } from "@/lib/fonts";
import { themeInitScript } from "@/lib/theme-script";
import { SITE } from "@/lib/constants";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import ToastProvider from "@/providers/ToastProvider";
import { BookmarkProvider } from "@/providers/BookmarkProvider";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Mentor Lagbe",
    template: "%s | Mentor Lagbe",
  },
  description:
    "Find verified tutors by subject, class level and mode. Join tuition batches or book 1-on-1 mentorship on MentorLagbe.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontBody.variable}`}
    >

      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>

      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>

          <AuthProvider>
            <BookmarkProvider>
              {children}
              <ToastProvider />
            </BookmarkProvider>
          </AuthProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}