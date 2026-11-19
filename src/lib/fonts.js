import { Bricolage_Grotesque, DM_Sans } from "next/font/google";

export const fontDisplay = Bricolage_Grotesque({
    subsets: ["latin"],
    variable: "--font-bricolage",
    display: "swap",
});

export const fontBody = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
    display: "swap",
});