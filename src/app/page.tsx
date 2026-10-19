import Link from "next/link";

const stats = [
  { label: "ACTIVE SQUADS", value: "03" },
  { label: "GAMES PLAYED", value: "06" },
  { label: "TOURNAMENT WINS", value: "12" },
  { label: "CLAN MEMBERS", value: "48" },
];
const squads = [
  { name: "Vanguard", game: "Valorant", tag: "COMPETITIVE", color: "from-violet-500/30" },
  { name: "Dropzone", game: "BGMI", tag: "BATTLE ROYALE", color: "from-cyan-500/30" },
  { name: "Nightfall", game: "Call of Duty", tag: "MULTIPLAYER", color: "from-orange-500/30" },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[#202a3b]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(124,58,237,.22),transparent_45%),radial-gradient(ellipse_at_15%_80%,rgba(6,182,212,.10),transparent_35%)]" />
        <div className="container relative grid min-h-[520px] items-center gap-12 py-20 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <span className="pill">YOUR SQUAD. YOUR LEGACY.</span>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">BUILT TO PLAY.<br /><span className="text-violet-400">BORN TO WIN.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 muted">A community for competitive players, late-night squads, and gamers who push each other to the next level.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/join" className="btn btn-primary">Request to join ↗</Link>
              <Link href="/leaderboard" className="btn btn-secondary">View leaderboard</Link>
            </div>
          </div>
          <div className="panel relative overflow-hidden p-6 md:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="flex items-center justify-between"><span className="text-sm font-bold tracking-widest text-slate-300">CLAN STATUS</span><span className="pill">RECRUITING</span></div>
            <div className="mt-8 text-6xl font-black">N<span className="text-violet-400">/</span>X</div>
            <p className="mt-2 text-xl font-bold">No player left behind.</p>
            <p className="mt-2 text-sm leading-6 muted">Find your squad, enter tournaments, and build your reputation with every match.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {stats.map((s) => <div key={s.label} className="rounded-xl bg-[#0a101b] p-4"><div className="text-2xl font-black">{s.value}</div><div className="mt-1 text-[10px] tracking-widest muted">{s.label}</div></div>)}
            </div>
            <p className="mt-4 text-xs muted">Demo stats — replace these with your real clan data.</p>
          </div>
        </div>
      </section>
      <section className="container py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-bold tracking-[.25em] text-violet-400">FIND YOUR PEOPLE</p><h2 className="mt-3 text-3xl font-black md:text-4xl">Meet the squads</h2></div>
          <Link href="/games" className="text-sm text-violet-300 hover:text-white">Explore all games ↗</Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {squads.map((s, i) => <article key={s.name} className={`panel bg-gradient-to-br ${s.color} to-[#101622] p-6`}>
            <div className="flex justify-between"><span className="pill">{s.tag}</span><span className="text-3xl font-black text-white/30">0{i + 1}</span></div>
            <div className="mt-10 text-2xl font-black">{s.name}</div><p className="mt-2 muted">{s.game}</p>
            <Link href="/join" className="mt-6 inline-block text-sm font-bold text-violet-300">Apply to squad ↗</Link>
          </article>)}
        </div>
      </section>
      <section className="container">
        <div className="panel flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
          <div><p className="text-xs font-bold tracking-[.25em] text-violet-400">READY TO DROP IN?</p><h2 className="mt-3 text-2xl font-black md:text-3xl">Your next team starts here.</h2><p className="mt-2 muted">Create an account and request membership.</p></div>
          <Link href="/join" className="btn btn-primary">Join the clan</Link>
        </div>
      </section>
    </>
  );
}