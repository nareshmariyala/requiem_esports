
import Link from "next/link";
import CinematicIntro from "@/components/CinematicIntro";
import CinematicBackground from "@/components/CinematicBackground";

const games = [
  {
    name: "Call of Duty: Mobile",
    platform: "MOBILE",
    type: "Competitive FPS",
    number: "01",
  },
  {
    name: "Delta Force",
    platform: "MOBILE / PC",
    type: "Tactical Warfare",
    number: "02",
  },
  {
    name: "Counter-Strike 2",
    platform: "PC",
    type: "Competitive FPS",
    number: "03",
  },
  {
    name: "VALORANT",
    platform: "PC",
    type: "Tactical FPS",
    number: "04",
  },
];

export default function Home() {
  return (
    <>
      <CinematicIntro />

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-violet-500/10">
        <CinematicBackground />

        <div className="container relative z-10 flex min-h-[560px] flex-col justify-center py-14 sm:min-h-[680px] sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-violet-400">
            Requiem Esports · Mobile & PC Gaming
          </p>

          <h1 className="mt-7 max-w-5xl text-[clamp(2rem,8.5vw,3.5rem)] font-black uppercase leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Forged in
            <br />
            <span className="text-violet-400">
              Darkness.
            </span>
            <br />
            United by
            <br />
            Competition.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            One clan. Multiple battlegrounds. From mobile
            combat to competitive PC gaming, Requiem brings
            players together to compete, improve, and build
            a lasting gaming community.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/join" className="btn btn-primary">
              Join Requiem ↗
            </Link>

            <Link href="/games" className="btn btn-secondary">
              Explore Games
            </Link>
          </div>
        </div>
      </section>

      {/* CLAN INTRODUCTION */}
      <section className="container py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
              Who We Are
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase leading-tight md:text-5xl">
              More Than
              <br />
              Just a Clan.
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-300">
              Requiem Esports is a gaming community built
              around teamwork, dedication, and the thrill
              of competition.
            </p>

            <p className="mt-5 leading-8 text-slate-400">
              Whether you're pushing ranks, preparing for
              tournaments, or simply looking for people
              to game with, there's a place for you here.
            </p>

            <Link
              href="/about"
              className="mt-7 inline-block font-semibold text-violet-300 hover:text-white"
            >
              Discover Requiem ↗
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED GAMES */}
      <section className="border-y border-violet-500/10 bg-[#0c0915] py-20">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
                Our Battlegrounds
              </p>

              <h2 className="mt-4 text-4xl font-black uppercase md:text-5xl">
                Choose Your Game.
              </h2>
            </div>

            <Link
              href="/games"
              className="font-semibold text-violet-300 hover:text-white"
            >
              View All Games ↗
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {games.map((game) => (
              <article
                key={game.name}
                className="group relative overflow-hidden rounded-2xl border border-violet-500/15 bg-gradient-to-br from-[#211536] via-[#141020] to-[#0b0913] p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-400/50 md:p-9"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full border border-violet-400/30 px-3 py-1 text-xs font-bold tracking-widest text-violet-300">
                    {game.platform}
                  </span>

                  <span className="text-4xl font-black text-violet-400/20">
                    {game.number}
                  </span>
                </div>

                <div className="mt-16">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    {game.type}
                  </p>

                  <h3 className="mt-3 text-2xl font-black uppercase text-white md:text-3xl">
                    {game.name}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STEAM COMMUNITY */}
      <section className="container py-20 md:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-[#211238] via-[#130e22] to-[#090711] p-8 md:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
              PC Gaming Community
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase leading-tight md:text-5xl">
              Your Games.
              <br />
              Your Community.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Play on Steam? You're welcome at Requiem.
              You don't need to compete professionally
              or play only our featured games.
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              Connect with other PC gamers, discover
              multiplayer experiences, and find people
              who share your passion for gaming.
            </p>

            <Link
              href="/join"
              className="btn btn-primary mt-8 inline-flex"
            >
              Join the Community ↗
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="border-t border-violet-500/10 bg-[#0c0915]">
        <div className="container py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
            Your Story Starts Here
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black uppercase leading-tight md:text-6xl">
            Become Part of
            <span className="text-violet-400"> Requiem.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-8 text-slate-400">
            Competitive player or casual gamer,
            every journey begins with a community.
          </p>

          <Link
            href="/join"
            className="btn btn-primary mt-9 inline-flex"
          >
            Request Membership ↗
          </Link>
        </div>
      </section>
    </>
  );
}
