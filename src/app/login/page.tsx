"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) { setMessage("Add your Supabase values to .env.local first."); return; }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setMessage(error.message);
    else router.push("/dashboard");
  }

  return <section className="container grid min-h-[70vh] max-w-4xl items-center py-14 md:grid-cols-2 md:gap-10">
    <div><p className="text-xs font-bold tracking-[.25em] text-violet-400">MEMBER ACCESS</p><h1 className="mt-3 text-4xl font-black">Welcome back.</h1><p className="mt-4 muted">Log in to see your member status.</p></div>
    <form onSubmit={submit} className="panel space-y-4 p-6">
      <div><label className="mb-2 block text-sm font-semibold" htmlFor="email">Email</label><input id="email" className="field" type="email" required value={email} onChange={e => setEmail(e.target.value)} /></div>
      <div><label className="mb-2 block text-sm font-semibold" htmlFor="password">Password</label><input id="password" className="field" type="password" required value={password} onChange={e => setPassword(e.target.value)} /></div>
      <button className="btn btn-primary w-full" disabled={busy}>{busy ? "Logging in..." : "Log in"}</button>
      {message && <p role="status" className="text-sm text-rose-300">{message}</p>}
      <p className="text-sm muted">New here? <Link href="/join" className="text-violet-300">Request membership</Link></p>
    </form>
  </section>;
}