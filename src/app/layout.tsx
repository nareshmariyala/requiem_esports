
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Requiem Esports | Gaming Community",
  description:
    "Requiem Esports — a gaming community built on teamwork, competition, and ambition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-violet-500/15 bg-[#08060e]/95">
          <div className="container flex min-h-[76px] flex-wrap items-center justify-between gap-4 py-3">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 font-black text-white">
                R
              </span>

              <span className="font-black tracking-[0.15em]">
                REQUIEM
                <span className="text-violet-400"> ESPORTS</span>
              </span>
            </Link>

            {/* NAVIGATION */}
            <nav
              aria-label="Main navigation"
              className="flex flex-wrap items-center gap-4 text-sm text-slate-300"
            >
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>

              <Link href="/about" className="transition hover:text-white">
                About
              </Link>

              <Link href="/games" className="transition hover:text-white">
                Games
              </Link>

              <Link
                href="/leaderboard"
                className="transition hover:text-white"
              >
                Leaderboard
              </Link>

              <Link href="/join" className="transition hover:text-white">
                Join Clan
              </Link>

              <Link href="/login" className="btn btn-secondary">
                Member Login
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="mt-20 border-t border-violet-500/15 py-8">
          <div className="container flex flex-wrap justify-between gap-3 text-sm text-slate-400">
            <span>
              © {new Date().getFullYear()} Requiem Esports.
              All rights reserved.
            </span>

            <span>One Identity. Multiple Battlefields.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
