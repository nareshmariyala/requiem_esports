const games = [
  { name: "Valorant", type: "TACTICAL FPS", status: "Recruiting", desc: "Team coordination, ranked grind, and tournament play.", color: "text-violet-300" },
  { name: "Battlegrounds Mobile India", type: "BATTLE ROYALE", status: "Recruiting", desc: "Squad rotations, strategy, and competitive lobbies.", color: "text-cyan-300" },
  { name: "Call of Duty", type: "FPS / MULTIPLAYER", status: "Coming soon", desc: "Build a roster and take on community match nights.", color: "text-orange-300" },
];
export default function GamesPage() {
  return <section className="container py-16">
    <p className="text-xs font-bold tracking-[.25em] text-violet-400">OUR BATTLEFIELDS</p>
    <h1 className="mt-3 text-4xl font-black md:text-5xl">Games & squads</h1>
    <p className="mt-4 max-w-2xl muted">These are example game listings to get the site started. Edit the array in <code>src/app/games/page.tsx</code> to match your clan.</p>
    <div className="mt-10 grid gap-4 md:grid-cols-3">
      {games.map((g) => <article key={g.name} className="panel p-6">
        <div className={`text-xs font-bold tracking-widest ${g.color}`}>{g.type}</div>
        <h2 className="mt-5 text-2xl font-black">{g.name}</h2>
        <p className="mt-3 min-h-12 text-sm leading-6 muted">{g.desc}</p>
        <div className="mt-6 flex items-center justify-between border-t border-[#263044] pt-4"><span className="text-sm muted">Status</span><span className="pill">{g.status}</span></div>
      </article>)}
    </div>
  </section>;
}