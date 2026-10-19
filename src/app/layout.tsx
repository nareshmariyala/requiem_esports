import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXUS | Gaming Clan",
  description: "A home for squads, competitive gaming, and clan events.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-[#202a3b] bg-[#080b12]/90">
          <div className="container flex min-h-[76px] items-center justify-between gap-5">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500 font-black">N</span>
              <span className="font-black tracking-[.18em]">NEXUS<span className="text-violet-400"> CLAN</span></span>
            </Link>
            <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <Link href="/games" className="hover:text-white">Games</Link>
              <Link href="/leaderboard" className="hover:text-white">Leaderboard</Link>
              <Link href="/join" className="hover:text-white">Join clan</Link>
              <Link href="/login" className="btn btn-secondary">Member login</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-20 border-t border-[#202a3b] py-8">
          <div className="container flex flex-wrap justify-between gap-3 text-sm muted">
            <span>© {new Date().getFullYear()} NEXUS Clan. Built for the squad.</span>
            <span>Play fair. Play together.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}