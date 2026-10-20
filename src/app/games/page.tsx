
import Link from "next/link";
import Image from "next/image";

const games = [
  {
    id: "valorant",
    number: "01",
    name: "VALORANT",
    platform: "PC",
    genre: "Tactical FPS",
    description:
      "Precision, strategy, and teamwork. Coordinate with your squad and compete in intense tactical matches.",
    accent: "from-red-500/20",
    image: "/images/games/valorant.webp",
  },
  {
    id: "codm",
    number: "02",
    name: "Call of Duty: Mobile",
    platform: "Mobile",
    genre: "Competitive FPS",
    description:
      "Fast-paced combat, coordinated squad play, and competitive multiplayer action.",
    accent: "from-orange-500/20",
    image: "/images/games/codm.webp",
  },
  {
    id: "delta-force",
    number: "03",
    name: "Delta Force",
    platform: "PC",
    genre: "Tactical Warfare",
    description:
      "Adapt to the battlefield, execute tactical operations, and work together to overcome every challenge.",
    accent: "from-emerald-500/20",
    image: "/images/games/delta-force.webp",
  },
  {
    id: "counter-strike-2",
    number: "04",
    name: "Counter-Strike 2",
    platform: "PC",
    genre: "Competitive FPS",
    description:
      "Master communication, positioning, and precision in one of competitive gaming's most iconic shooters.",
    accent: "from-amber-500/20",
    image: "/images/games/cs2.webp",
  },
];

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-[#08060e] text-white">
      {/* PAGE HERO */}
      <section className="relative overflow-hidden border-b border-violet-500/10 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.18),transparent_65%)]" />

        <div className="container relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-violet-400">
            The Requiem Arena
          </p>

          <h1 className="mt-5 text-5xl font-black uppercase leading-tight sm:text-6xl lg:text-7xl">
            Choose Your
            <br />
            <span className="text-violet-400">
              Battleground.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Every battlefield demands something different.
            Find the game that matches your passion and
            become part of the Requiem gaming community.
          </p>
        </div>
      </section>

      {/* GAME CARDS */}
      <section className="container py-20">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
            01 / Our Games
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase sm:text-4xl">
            Active Battlegrounds
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {games.map((game) => (
            <article
              key={game.id}
              className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-[#100c1c] transition duration-300 hover:-translate-y-1 hover:border-violet-400/60"
            >
              {/* CLICKABLE GAME CARD OVERLAY */}
              <Link
                href={`/games/${game.id}`}
                aria-label={`Explore ${game.name}`}
                className="absolute inset-0 z-10"
              />

              {/* CINEMATIC GAME BANNER */}
              <div className="relative h-52 overflow-hidden sm:h-60">
                <Image
                  src={game.image}
                  alt={`${game.name} game artwork`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Dark gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#100c1c] via-black/20 to-black/10" />

                {/* Decorative number */}
                <span className="absolute right-5 top-3 text-6xl font-black text-white/20">
                  {game.number}
                </span>

                {/* Platform badge */}
                <span className="absolute bottom-5 left-6 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                  {game.platform}
                </span>
              </div>

              {/* GAME INFORMATION */}
              <div className="p-7 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
                  {game.genre}
                </p>

                <h3 className="mt-3 text-2xl font-black uppercase sm:text-3xl">
                  {game.name}
                </h3>

                <p className="mt-5 min-h-20 leading-7 text-slate-400">
                  {game.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-violet-500/15 pt-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                    ● Active Game
                  </span>

                  <Link
                    href={game.id === "codm" ? "/games/codm" : "/join"}
                    className="relative z-20 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-violet-400 transition hover:text-violet-300"
                  >
                    {game.id === "codm"
                      ? "Explore Division"
                      : "Join Community"}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* RECRUITMENT CTA */}
      <section className="border-t border-violet-500/10 bg-[#0d0915] py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-black uppercase sm:text-5xl">
            Ready to <span className="text-violet-400">Deploy?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">
            Join Requiem Esports and request membership
            in the games you love.
          </p>

          <Link
            href="/join"
            className="mt-8 inline-flex rounded-xl bg-violet-600 px-8 py-4 text-sm font-bold uppercase tracking-wider transition hover:bg-violet-500"
          >
            Join Requiem
          </Link>
        </div>
      </section>
    </main>
  );
}
