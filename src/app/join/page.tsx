"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gamerTag, setGamerTag] = useState("");
  const [game, setGame] = useState("Valorant");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    if (!supabase) {
      setMessage("Supabase is not configured. Add the project URL and publishable key to .env.local.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { gamer_tag: gamerTag.trim(), preferred_game: game } },
    });
    setBusy(false);
    if (error) setMessage(error.message);
    else setMessage("Signup submitted! Check your email if confirmation is enabled. Your clan membership will be pending admin approval.");
  }

  return <section className="container grid min-h-[70vh] items-center gap-10 py-14 md:grid-cols-2">
    <div><p className="text-xs font-bold tracking-[.25em] text-violet-400">YOUR NEXT CHAPTER</p><h1 className="mt-3 text-4xl font-black md:text-5xl">Join the clan.</h1><p className="mt-5 max-w-lg leading-7 muted">Create your account to request membership. Your profile is created automatically by the database trigger; an admin can approve you after review.</p><div className="mt-8 flex flex-wrap gap-2"><span className="pill">Squad play</span><span className="pill">Community events</span><span className="pill">Competitive matches</span></div></div>
    <form onSubmit={submit} className="panel space-y-4 p-6 md:p-8">
      <div><label className="mb-2 block text-sm font-semibold" htmlFor="tag">Gamer tag</label><input id="tag" className="field" value={gamerTag} onChange={e => setGamerTag(e.target.value)} required minLength={2} maxLength={24} placeholder="Your in-game name" /></div>
      <div><label className="mb-2 block text-sm font-semibold" htmlFor="email">Email</label><input id="email" type="email" className="field" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" /></div>
      <div><label className="mb-2 block text-sm font-semibold" htmlFor="game">Main game</label><select id="game" className="field" value={game} onChange={e => setGame(e.target.value)}><option>Valorant</option><option>BGMI</option><option>Call of Duty</option><option>Other</option></select></div>
      <div><label className="mb-2 block text-sm font-semibold" htmlFor="password">Password</label><input id="password" type="password" className="field" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} placeholder="At least 8 characters" /></div>
      <button disabled={busy} className="btn btn-primary w-full disabled:opacity-50">{busy ? "Submitting..." : "Create account"}</button>
      {message && <p role="status" className="rounded-lg border border-[#34415a] bg-[#0a101b] p-3 text-sm">{message}</p>}
      <p className="text-center text-sm muted">Already registered? <Link href="/login" className="text-violet-300">Log in</Link></p>
    </form>
  </section>;
}