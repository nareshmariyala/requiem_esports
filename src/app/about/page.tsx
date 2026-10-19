
import Link from "next/link";

export const metadata = {
  title: "About Us | Requiem Esports",
  description:
    "Discover Requiem Esports, a gaming community built on teamwork, competition, and ambition.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#08060e] text-white">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[65vh] items-center overflow-hidden border-b border-violet-500/10">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.18),transparent_65%)]" />
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-violet-700/10 blur-3xl" />

        <div className="container relative z-10 py-24">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-violet-400">
            The Story Behind Requiem
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
            More Than
            <br />
            A Clan.
            <br />
            <span className="text-violet-400">
              A Legacy.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Requiem Esports is a gaming community united by
            competition, teamwork, and the drive to improve.
            Across every game and every battlefield, we play
            with purpose and grow together.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/join"
              className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-7 py-3 text-sm font-bold uppercase tracking-wider transition hover:bg-violet-500"
            >
              Join Requiem
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-violet-500/30 px-7 py-3 text-sm font-bold uppercase tracking-wider transition hover:border-violet-400 hover:bg-violet-500/10"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
            {/* WHO WE ARE & OUR MISSION */}
      <section className="container py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
              01 / Our Identity
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase sm:text-5xl">
              Who We <span className="text-violet-400">Are.</span>
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-400">
              Requiem Esports brings together players who share
              a passion for gaming, competition, and community.
              Whether we're competing in ranked matches,
              coordinating as a squad, or learning new strategies,
              we believe that every player has room to grow.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-400">
              Our identity goes beyond any single game. We value
              commitment, respect, and the connections built
              through playing together.
            </p>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-[#100c1c] p-10">
            <div className="mb-8 text-6xl text-violet-400">
              ◈
            </div>

            <h3 className="text-2xl font-black uppercase">
              United by the Game.
            </h3>

            <p className="mt-4 leading-7 text-slate-400">
              Different players. Different battlefields.
              One Requiem.
            </p>
          </div>
        </div>

        <div className="mt-24 grid items-center gap-12 md:grid-cols-2">
          <div className="order-2 rounded-2xl border border-violet-500/20 bg-[#100c1c] p-10 md:order-1">
            <div className="mb-8 text-6xl text-violet-400">
              ◎
            </div>

            <h3 className="text-2xl font-black uppercase">
              Built to Improve.
            </h3>

            <p className="mt-4 leading-7 text-slate-400">
              Every match is a chance to learn.
              Every challenge is a chance to become stronger.
            </p>
          </div>

          <div className="order-1 md:order-2">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
              02 / Our Purpose
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase sm:text-5xl">
              Our <span className="text-violet-400">Mission.</span>
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-400">
              Our mission is to create an environment where
              players can develop their skills, compete with
              confidence, and build lasting connections.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-400">
              Through teamwork, dedication, and a shared
              competitive spirit, we aim to build a community
              that supports both individual progress and
              collective success.
            </p>
          </div>
        </div>
        </section>

      {/* CORE VALUES */}
      <section className="relative border-t border-violet-500/10 bg-[#0d0915] py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
              03 / The Requiem Code
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase sm:text-5xl">
              Our Core{" "}
              <span className="text-violet-400">Values.</span>
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              More than just words, these are the principles
              that shape our community, our teams, and the
              way we compete.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* BROTHERHOOD */}
            <div className="group rounded-2xl border border-violet-500/20 bg-[#140e20] p-8 transition duration-300 hover:-translate-y-2 hover:border-violet-400/60">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10 text-3xl text-violet-400">
                ✦
              </div>

              <h3 className="text-xl font-black uppercase">
                Brotherhood
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                We stand together through victories and
                defeats. Respect, trust, and teamwork are
                the foundations of Requiem.
              </p>

              <p className="mt-8 text-xs font-bold uppercase tracking-widest text-violet-400">
                One Team. One Identity.
              </p>
            </div>

            {/* DISCIPLINE */}
            <div className="group rounded-2xl border border-violet-500/20 bg-[#140e20] p-8 transition duration-300 hover:-translate-y-2 hover:border-violet-400/60">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10 text-3xl text-violet-400">
                ◈
              </div>

              <h3 className="text-xl font-black uppercase">
                Discipline
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                Improvement requires dedication. We value
                consistency, accountability, and the
                willingness to learn from every challenge.
              </p>

              <p className="mt-8 text-xs font-bold uppercase tracking-widest text-violet-400">
                Respect the Grind.
              </p>
            </div>

            {/* COMPETITIVE SPIRIT */}
            <div className="group rounded-2xl border border-violet-500/20 bg-[#140e20] p-8 transition duration-300 hover:-translate-y-2 hover:border-violet-400/60">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10 text-3xl text-violet-400">
                ⚡
              </div>

              <h3 className="text-xl font-black uppercase">
                Competitive Spirit
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                We embrace competition as an opportunity
                to grow. Every match is a chance to push
                our limits and become better players.
              </p>

              <p className="mt-8 text-xs font-bold uppercase tracking-widest text-violet-400">
                Always Strive Higher.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* OUR BATTLEGROUNDS */}
      <section className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
            04 / Where We Compete
          </p>

          <h2 className="mt-4 text-4xl font-black uppercase sm:text-5xl">
            Our <span className="text-violet-400">Battlegrounds.</span>
          </h2>

          <p className="mt-6 leading-8 text-slate-400">
            Different games. Different challenges.
            One identity. Requiem competes across
            multiple battlefields, united by the
            same commitment to teamwork and improvement.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {[
            {
              number: "01",
              name: "VALORANT",
              platform: "PC",
              category: "Tactical Shooter",
              description:
                "Precision, communication, and strategy. Every round matters.",
            },
            {
              number: "02",
              name: "Call of Duty: Mobile",
              platform: "Mobile",
              category: "Competitive FPS",
              description:
                "Fast-paced combat, sharp reflexes, and coordinated squad play.",
            },
            {
              number: "03",
              name: "Delta Force",
              platform: "PC",
              category: "Tactical Warfare",
              description:
                "Team coordination and adaptability across demanding operations.",
            },
            {
              number: "04",
              name: "Counter-Strike 2",
              platform: "PC",
              category: "Competitive FPS",
              description:
                "Classic tactical competition built on teamwork and precision.",
            },
          ].map((game) => (
            <div
              key={game.number}
              className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-[#100c1c] p-8 transition duration-300 hover:-translate-y-1 hover:border-violet-400/60 sm:p-10"
            >
              <div className="pointer-events-none absolute -right-8 -top-10 text-[10rem] font-black leading-none text-violet-400/[0.05]">
                {game.number}
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-300">
                    {game.platform}
                  </span>

                  <span className="text-xs uppercase tracking-widest text-slate-500">
                    {game.category}
                  </span>
                </div>

                <h3 className="mt-10 text-2xl font-black uppercase sm:text-3xl">
                  {game.name}
                </h3>

                <p className="mt-4 max-w-md leading-7 text-slate-400">
                  {game.description}
                </p>

                <div className="mt-10 h-px w-full bg-violet-500/15" />

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
                  Requiem Esports / {game.number}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* JOIN THE LEGACY */}
      <section className="relative overflow-hidden border-t border-violet-500/10 bg-[#0d0915] py-28">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.2),transparent_65%)]" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-violet-700/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-violet-700/10 blur-3xl" />

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
              05 / Your Journey Starts Here
            </p>

            <h2 className="mt-6 text-5xl font-black uppercase leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Your Story.
              <br />
              <span className="text-violet-400">
                Our Legacy.
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Every legend begins somewhere. Whether you're
              a competitive player, a dedicated teammate,
              or someone looking for a community to call home,
              there's a place to begin your journey with Requiem.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/join"
                className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-8 py-4 text-sm font-bold uppercase tracking-wider transition hover:bg-violet-500"
              >
                Join Requiem
                <span className="ml-3">↗</span>
              </Link>

              <Link
                href="/#games"
                className="inline-flex items-center justify-center rounded-xl border border-violet-500/30 px-8 py-4 text-sm font-bold uppercase tracking-wider transition hover:border-violet-400 hover:bg-violet-500/10"
              >
                Explore Our Games
              </Link>
            </div>

            <p className="mt-12 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
              One Identity. Multiple Battlefields. Requiem.
            </p>
          </div>
        </div>
      </section>
    </main>
 );
}
