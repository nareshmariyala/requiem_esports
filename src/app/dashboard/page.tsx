"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Member = { gamer_tag: string | null; preferred_game: string | null; membership_status: string | null };

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [member, setMember] = useState<Member | null>(null);
  const [message, setMessage] = useState("Loading your member profile...");

  useEffect(() => {
    let alive = true;
    async function load() {
      if (!supabase) { setMessage("Supabase is not configured. Add .env.local values."); return; }
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login"); return; }
      if (!alive) return;
      setEmail(user.email ?? "");
      const { data, error } = await supabase.from("profiles").select("gamer_tag,preferred_game,membership_status").eq("id", user.id).maybeSingle();
      if (!alive) return;
      if (error) setMessage("Could not load profile. Check that you ran the SQL setup.");
      else if (!data) setMessage("No profile exists yet. Check the signup trigger in Supabase.");
      else { setMember(data as Member); setMessage(""); }
    }
    void load();
    return () => { alive = false; };
  }, [router]);

  async function logout() {
    if (supabase) await supabase.auth.signOut();
    router.push("/");
  }

  return <section className="container min-h-[65vh] py-16">
    <p className="text-xs font-bold tracking-[.25em] text-violet-400">MEMBER AREA</p>
    <h1 className="mt-3 text-4xl font-black">Your dashboard</h1>
    {message && <p className="mt-6 panel p-5 text-sm muted">{message}</p>}
    {member && <div className="panel mt-8 max-w-2xl p-6 md:p-8">
      <div className="flex items-center justify-between gap-4"><div><p className="text-sm muted">GAMER TAG</p><h2 className="mt-1 text-2xl font-black">{member.gamer_tag ?? "Not set"}</h2></div><span className="pill">{member.membership_status ?? "pending"}</span></div>
      <div className="mt-6 grid gap-4 border-t border-[#263044] pt-5 sm:grid-cols-2"><div><p className="text-xs muted">EMAIL</p><p className="mt-1 break-all">{email}</p></div><div><p className="text-xs muted">PREFERRED GAME</p><p className="mt-1">{member.preferred_game ?? "Not set"}</p></div></div>
      <p className="mt-6 text-sm leading-6 muted">If your status is pending, an administrator needs to approve your membership before you are added to a squad.</p>
      <button onClick={logout} className="btn btn-secondary mt-6">Log out</button>
    </div>}
  </section>;
}