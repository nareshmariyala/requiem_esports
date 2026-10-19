"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Member = {
  gamer_tag: string | null;
  preferred_game: string | null;
  membership_status: string | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [member, setMember] = useState<Member | null>(null);
  const [message, setMessage] = useState("Loading your member profile...");

  useEffect(() => {
    let alive = true;

    async function load() {
      if (!supabase) {
        setMessage("Supabase is not configured. Check your environment variables.");
        return;
      }

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.replace("/login");
        return;
      }

      if (!alive) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("gamer_tag, preferred_game, membership_status")
        .eq("id", user.id)
        .maybeSingle();

      if (!alive) return;

      if (error) {
        setMessage("Could not verify your membership. Please try again later.");
        return;
      }

      if (!data) {
        setMessage("No member profile was found. Please contact an administrator.");
        return;
      }

      const status = data.membership_status;

      if (status !== "approved") {
        setMember(null);
        setEmail("");

        if (status === "pending") {
          setMessage(
            "Your membership application is pending. An administrator must approve your account before you can access the member dashboard."
          );
        } else if (status === "rejected") {
          setMessage(
            "Your membership application was rejected. Member dashboard access is unavailable. Please contact an administrator if you believe this is a mistake."
          );
        } else {
          setMessage(
            "Your membership status could not be verified. Please contact an administrator."
          );
        }

        return;
      }

      setEmail(user.email ?? "");
      setMember({
        gamer_tag: data.gamer_tag,
        preferred_game: data.preferred_game,
        membership_status: status,
      });
      setMessage("");
    }

    void load();

    return () => {
      alive = false;
    };
  }, [router]);

  async function logout() {
    if (supabase) await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <section className="container min-h-[65vh] py-16">
      <p className="text-xs font-bold tracking-[.25em] text-violet-400">
        MEMBER AREA
      </p>

      <h1 className="mt-3 text-4xl font-black">Your dashboard</h1>

      {message && (
        <div className="panel mt-6 max-w-2xl p-5">
          <p className="text-sm muted">{message}</p>
          <button
            onClick={logout}
            className="btn btn-secondary mt-5"
          >
            Log out
          </button>
        </div>
      )}

      {member && (
        <div className="panel mt-8 max-w-2xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm muted">GAMER TAG</p>
              <h2 className="mt-1 text-2xl font-black">
                {member.gamer_tag ?? "Not set"}
              </h2>
            </div>
            <span className="pill">{member.membership_status}</span>
          </div>

          <div className="mt-6 grid gap-4 border-t border-[#263044] pt-5 sm:grid-cols-2">
            <div>
              <p className="text-xs muted">EMAIL</p>
              <p className="mt-1 break-all">{email}</p>
            </div>

            <div>
              <p className="text-xs muted">PREFERRED GAME</p>
              <p className="mt-1">{member.preferred_game ?? "Not set"}</p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 muted">
            Your membership is approved. You can access the member dashboard.
          </p>

          <button
            onClick={logout}
            className="btn btn-secondary mt-6"
          >
            Log out
          </button>
        </div>
      )}
    </section>
  );
}