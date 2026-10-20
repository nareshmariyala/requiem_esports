
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const games = {
  valorant: {
    name: "VALORANT",
    platform: "PC",
    genre: "Tactical FPS",
    division: "PC Division",
    image: "/images/games/valorant.webp",
    tagline: "Precision. Strategy. Victory.",
    description:
      "Enter the world of tactical competition with Requiem Esports. Build your skills, coordinate with teammates, and master every round.",
    squadName: "VALORANT Division",
  },

  codm: {
    name: "Call of Duty: Mobile",
    platform: "Mobile",
    genre: "Competitive FPS",
    division: "Mobile Division",
    image: "/images/games/codm.webp",
    tagline: "One Squad. One Objective.",
    description:
      "Fast-paced combat, tactical coordination, and competitive multiplayer action. Fight alongside the Requiem community.",
    squadName: "Requiem CODM Alpha",
  },

  "delta-force": {
    name: "Delta Force",
    platform: "PC",
    genre: "Tactical Warfare",
    division: "PC Division",
    image: "/images/games/delta-force.webp",
    tagline: "Adapt. Execute. Dominate.",
    description:
      "Experience tactical warfare through teamwork, battlefield awareness, and coordinated operations.",
    squadName: "Delta Force Division",
  },

  "counter-strike-2": {
    name: "Counter-Strike 2",
    platform: "PC",
    genre: "Competitive FPS",
    division: "PC Division",
    image: "/images/games/cs2.webp",
    tagline: "Every Round Matters.",
    description:
      "Communication, positioning, and precision define every match. Join the Requiem Counter-Strike community.",
    squadName: "Counter-Strike 2 Division",
  },
};

type GameId = keyof typeof games;

export function generateStaticParams() {
  return Object.keys(games).map((gameId) => ({
    gameId,
  }));
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;

  if (!(gameId in games)) {
    notFound();
  }

  const game = games[gameId as GameId];

  return (
    <main className="min-h-screen bg-[#08060e] text-white">
      {/* HERO */}
      <section className="relative flex min-h-[65vh] items-end overflow-hidden">
        <Image
          src={game.image}
          alt={`${game.name} artwork`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#08060e] via-[#08060e]/75 to-black/30" />

        <div className="container relative z-10 pb-16 pt-32">
          <Link
            href="/games"
            className="text-sm font-semibold text-violet-300 transition hover:text-white"
          >
            ← All Games
          </Link>

          <p className="mt-10 text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
            Requiem Esports / {game.division}
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-tight sm:text-7xl">
            {game.name}
          </h1>

          <p className="mt-5 text-xl font-semibold text-violet-300">
            {game.tagline}
          </p>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            {game.description}
          </p>

          <Link
            href="/join"
            className="mt-9 inline-flex rounded-xl bg-violet-600 px-8 py-4 text-sm font-bold uppercase tracking-wider transition hover:bg-violet-500"
          >
            Join Requiem
          </Link>
        </div>
      </section>

      {/* DIVISION INFORMATION */}
      <section className="container py-20">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
          01 / Game Division
        </p>

        <h2 className="mt-4 text-3xl font-black uppercase sm:text-4xl">
          Enter the <span className="text-violet-400">Arena.</span>
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-violet-500/20 bg-[#100c1c] p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400">
              Game Information
            </p>

            <h3 className="mt-5 text-2xl font-black">
              {game.name}
            </h3>

            <p className="mt-5 text-slate-400">
              Platform: {game.platform}
            </p>

            <p className="mt-2 text-slate-400">
              Genre: {game.genre}
            </p>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-[#100c1c] p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400">
              Requiem Community
            </p>

            <h3 className="mt-5 text-2xl font-black">
              {game.squadName}
            </h3>

            <p className="mt-5 leading-7 text-slate-400">
              Connect with players who share your passion
              for competition, teamwork, and improvement.
            </p>

            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-violet-300">
              Community Game
            </p>
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="border-t border-violet-500/10 bg-[#0d0915] py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-black uppercase sm:text-5xl">
            Your Squad <span className="text-violet-400">Awaits.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">
            Become part of Requiem Esports and connect with
            players across our gaming divisions.
          </p>

          <Link
            href="/join"
            className="mt-8 inline-flex rounded-xl bg-violet-600 px-8 py-4 text-sm font-bold uppercase tracking-wider transition hover:bg-violet-500"
          >
            Join the Clan
          </Link>
        </div>
      </section>
    </main>
  );
}
