import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";
import {
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    XIcon,
} from "@/components/ui/icons";
import { FOOTER_LINKS } from "@/data/nav-links";
import { SITE } from "@/lib/constants";


const SOCIAL_LINKS = [
    { label: "X", href: "https://x.com", icon: XIcon },
    { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
    { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
    { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
];


export default function Footer() {

    return (
        <footer className="mt-24 px-3 pb-3 sm:px-4 sm:pb-4">
            <div className="rounded-[2rem] bg-linear-to-br from-footer-from to-footer-to text-white">

                <Container className="py-14">
                    <div className="grid gap-12 md:grid-cols-12">

                        <div className="md:col-span-5">
                            <Logo light />

                            <p className="mt-5 max-w-sm leading-relaxed text-white/75">
                                {SITE.tagline}
                            </p>

                            <ul className="mt-6 flex items-center gap-2">
                                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-accent-on"
                                        >
                                            <Icon className="size-[18px]" />
                                        </a>
                                    </li>
                                ))}
                            </ul>

                        </div>

                        <nav aria-label="Footer" className="md:col-span-3">
                            <h3 className="text-base text-white">Quick links</h3>

                            <ul className="mt-5 space-y-3">
                                {FOOTER_LINKS.map(({ label, href }) => (
                                    <li key={label}>
                                        <Link
                                            href={href}
                                            className="text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="md:col-span-4">
                            <h3 className="text-base text-white">Contact</h3>

                            <ul className="mt-5 space-y-4 text-white/75">
                                <li>
                                    <a
                                        href={`mailto:${SITE.email}`}
                                        className="flex items-start gap-3 transition-colors hover:text-white"
                                    >
                                        <Mail className="mt-0.5 size-[18px] shrink-0 text-accent" aria-hidden="true" />
                                        {SITE.email}
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href={`tel:${SITE.phoneHref}`}
                                        className="flex items-start gap-3 transition-colors hover:text-white"
                                    >
                                        <Phone className="mt-0.5 size-[18px] shrink-0 text-accent" aria-hidden="true" />
                                        {SITE.phone}
                                    </a>
                                </li>

                                <li className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 size-[18px] shrink-0 text-accent" aria-hidden="true" />
                                    {SITE.location}
                                </li>
                            </ul>

                        </div>
                    </div>

                    <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
                        </p>
                        <p>Built for learners and tutors across Bangladesh.</p>
                    </div>

                </Container>
            </div>
        </footer>
    );
}