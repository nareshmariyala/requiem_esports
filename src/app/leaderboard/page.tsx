import { supabase } from "@/lib/supabase";

type Row = { gamer_tag: string; points: number; wins: number; squad: string | null };

export default async function LeaderboardPage() {
  let rows: Row[] = [];
  let errorText = "";
  if (supabase) {
    const result = await supabase.from("leaderboard_public").select("gamer_tag,points,wins,squad").order("points", { ascending: false }).limit(20);
    if (result.error) errorText = "Leaderboard data isn't available yet. Check the Supabase SQL setup.";
    else rows = (result.data ?? []) as Row[];
  } else {
    errorText = "Connect your Supabase project using .env.local to load live data.";
  }
  return <section className="container py-16">
    <p className="text-xs font-bold tracking-[.25em] text-violet-400">EARN YOUR PLACE</p>
    <h1 className="mt-3 text-4xl font-black md:text-5xl">Clan leaderboard</h1>
    <p className="mt-4 muted">Rankings are based on recorded match points.</p>
    <div className="panel mt-8 overflow-hidden">
      <div className="grid grid-cols-[70px_1fr_100px_80px] gap-3 border-b border-[#263044] bg-[#141d2c] px-5 py-4 text-xs font-bold tracking-wider muted"><span>RANK</span><span>PLAYER</span><span>POINTS</span><span>WINS</span></div>
      {rows.map((r, i) => <div key={`${r.gamer_tag}-${i}`} className="grid grid-cols-[70px_1fr_100px_80px] gap-3 border-b border-[#202a3b] px-5 py-4 text-sm last:border-0"><span className={i < 3 ? "font-black text-violet-300" : "muted"}>#{i + 1}</span><span><span className="font-bold">{r.gamer_tag}</span><span className="block text-xs muted">{r.squad ?? "Unassigned"}</span></span><span className="font-bold">{r.points}</span><span>{r.wins}</span></div>)}
      {!rows.length && <div className="p-8 text-center text-sm muted">{errorText || "No leaderboard records yet. Add sample rows in Supabase to see rankings."}</div>}
    </div>
    <p className="mt-4 text-xs muted">Only publish scores you are comfortable making public. The view is read-only for website visitors.</p>
  </section>;
}