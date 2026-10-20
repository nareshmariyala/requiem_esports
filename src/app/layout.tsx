
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Cinzel,
  Cinzel_Decorative,
  Inter,
} from "next/font/google";
import "./globals.css";
import CinematicSound from "@/components/CinematicSound";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel-decorative",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Requiem Esports | Gaming Community",
  description:
    "Requiem Esports — a gaming community built on teamwork, competition, and ambition.",
  icons: {
    icon: "/images/branding/requiem-logo.webp",
    apple: "/images/branding/requiem-logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cinzel.variable} ${cinzelDecorative.variable} bg-[#08060e] text-white antialiased`}
      >
        {/* HEADER */}
        <header className="relative z-50 border-b border-violet-500/20 bg-[#08060e]/95 shadow-[0_4px_30px_rgba(109,40,217,0.08)]">
          <div className="container flex min-h-[88px] flex-wrap items-center justify-between gap-4 py-3">
            {/* BRAND LOGO */}
            <Link
              href="/"
              className="group flex items-center gap-3"
              aria-label="Requiem Esports home"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-violet-500/40 bg-black shadow-[0_0_20px_rgba(139,92,246,0.25)] transition duration-300 group-hover:border-violet-400 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] sm:h-[76px] sm:w-[76px]">
                <Image
                  src="/images/branding/requiem-logo.webp"
                  alt="Requiem Esports logo"
                  fill
                  priority
                  sizes="72px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-gothic text-xl font-black tracking-tight text-white drop-shadow-[0_0_12px_rgba(167,139,250,0.2)] transition group-hover:text-violet-200 sm:text-2xl">
                  REQUIEM
                </span>

                <span className="font-cinzel text-[10px] font-bold tracking-[0.3em] text-violet-400 sm:text-xs">
                  ESPORTS
                </span>
              <CinematicSound />
              </div>
            </Link>


            {/* NAVIGATION + SOUND CONTROL */}
            <div className="flex flex-wrap items-center justify-end gap-3">
              <nav
                aria-label="Main navigation"
                className="font-cinzel flex flex-wrap items-center gap-4 text-xs font-semibold tracking-wide text-slate-300 sm:gap-5"
              >
                <Link href="/" className="transition hover:text-violet-300">
                  Home
                </Link>

                <Link href="/about" className="transition hover:text-violet-300">
                  About
                </Link>

                <Link href="/games" className="transition hover:text-violet-300">
                  Games
                </Link>

                <Link
                  href="/leaderboard"
                  className="transition hover:text-violet-300"
                >
                  Leaderboard
                </Link>

                <Link href="/join" className="transition hover:text-violet-300">
                  Join Clan
                </Link>

                <Link href="/login" className="btn btn-secondary">
                  Member Login
                </Link>
              </nav>

              <CinematicSound />
            </div>
          </div>
        </header>


        {/* PAGE CONTENT */}
        {children}

        {/* FOOTER */}
        <footer className="mt-20 border-t border-violet-500/20 bg-[#08060e] py-10">
          <div className="container flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-violet-500/40 bg-black shadow-[0_0_18px_rgba(139,92,246,0.2)]">
                <Image
                  src="/images/branding/requiem-logo.webp"
                  alt="Requiem Esports logo"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>

              <div>
                <p className="font-gothic text-base font-bold tracking-wider text-white">
                  REQUIEM
                </p>

                <p className="font-cinzel text-[10px] tracking-[0.25em] text-violet-400">
                  ESPORTS
                </p>
              </div>
            </Link>

            <div className="text-sm text-slate-400">
              <p>
                © {new Date().getFullYear()} Requiem Esports.
                All rights reserved.
              </p>

              <p className="font-cinzel mt-2 text-xs tracking-wider text-violet-400">
                Play • Fight • Conquer
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
