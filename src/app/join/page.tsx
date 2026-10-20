
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const games = [
  { id: 1, name: "VALORANT", platform: "PC" },
  { id: 3, name: "Call of Duty: Mobile", platform: "Mobile" },
  { id: 4, name: "Delta Force", platform: "Mobile / PC" },
  { id: 5, name: "Counter-Strike 2", platform: "PC" },
];

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gamerTag, setGamerTag] = useState("");
  const [selectedGames, setSelectedGames] = useState<number[]>([]);
  const [steamCommunity, setSteamCommunity] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  function toggleGame(gameId: number) {
    setSelectedGames((current) =>
      current.includes(gameId)
        ? current.filter((id) => id !== gameId)
        : [...current, gameId]
    );
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (!supabase) {
      setMessage("Supabase is not configured.");
      return;
    }

    if (selectedGames.length === 0 && !steamCommunity) {
      setMessage("Select at least one game or the Steam community.");
      return;
    }

    setBusy(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            gamer_tag: gamerTag.trim(),
            preferred_game:
              games.find((g) => g.id === selectedGames[0])?.name ??
              "Steam Community",
            requested_game_ids: selectedGames,
            steam_community: steamCommunity,
          },
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      // If signup immediately provides a session, submit the
      // game requests now. Otherwise, they'll need to be
      // submitted after email confirmation and login.
      if (data.session && selectedGames.length > 0) {
        const results = await Promise.all(
          selectedGames.map((gameId) =>
            supabase!.rpc("request_game_registration", {
              target_game_id: gameId,
            })
          )
        );

        const failed = results.filter((result) => result.error);

        if (failed.length > 0) {
          setMessage(
            "Account created, but some game requests could not be submitted. Sign in to your dashboard to complete them."
          );
        } else {
          setMessage(
            "Account created! Your clan membership and game requests are pending admin approval."
          );
        }
      } else {
        setMessage(
          "Signup submitted! Check your email if confirmation is enabled. After confirming your account, sign in to submit your selected game requests."
        );
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container grid min-h-[70vh] items-center gap-10 py-14 md:grid-cols-2">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
          Enter the Requiem
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase md:text-5xl">
          Join Requiem.
        </h1>

        <p className="mt-6 max-w-lg leading-8 text-slate-400">
          Become part of our competitive gaming clan or
          connect with our wider PC gaming community.
          Select multiple games and request membership.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <span className="pill">Competitive Squads</span>
          <span className="pill">PC Gaming</span>
          <span className="pill">Community Events</span>
        </div>

        <div className="mt-10 rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
          <h2 className="font-bold text-violet-300">
            How approval works
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Your clan membership requires admin approval.
            Each competitive game registration is reviewed
            separately. Squad access is granted only
            after the required approvals.
          </p>
        </div>
      </div>

      <form
        onSubmit={submit}
        className="panel space-y-6 p-6 md:p-8"
      >
        <div>
          <label
            htmlFor="tag"
            className="mb-2 block text-sm font-semibold"
          >
            Gamer tag
          </label>

          <input
            id="tag"
            className="field"
            value={gamerTag}
            onChange={(e) => setGamerTag(e.target.value)}
            required
            minLength={2}
            maxLength={24}
            placeholder="Your in-game name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            className="field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">
            Select your games
          </p>

          <p className="mb-4 text-xs text-slate-400">
            Choose as many as you play.
          </p>

          <div className="space-y-3">
            {games.map((game) => (
              <label
                key={game.id}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-violet-500/20 bg-[#100c1c] p-4 transition hover:border-violet-400/50"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedGames.includes(game.id)}
                    onChange={() => toggleGame(game.id)}
                    className="h-4 w-4 accent-violet-500"
                  />

                  <span className="text-sm font-semibold">
                    {game.name}
                  </span>
                </div>

                <span className="text-xs text-slate-400">
                  {game.platform}
                </span>
              </label>
            ))}
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-violet-500/20 bg-[#100c1c] p-4">
          <input
            type="checkbox"
            checked={steamCommunity}
            onChange={(e) =>
              setSteamCommunity(e.target.checked)
            }
            className="mt-1 h-4 w-4 accent-violet-500"
          />

          <span>
            <span className="block text-sm font-semibold">
              Steam / PC Gaming Community
            </span>

            <span className="mt-1 block text-xs leading-6 text-slate-400">
              For PC gamers who play other games or simply
              want to join the community.
            </span>
          </span>
        </label>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            className="field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            placeholder="At least 8 characters"
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="btn btn-primary w-full disabled:opacity-50"
        >
          {busy ? "Submitting..." : "Request Membership"}
        </button>

        {message && (
          <p
            role="status"
            className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-4 text-sm leading-6"
          >
            {message}
          </p>
        )}

        <p className="text-center text-sm muted">
          Already registered?{" "}
          <Link
            href="/login"
            className="text-violet-300 hover:text-white"
          >
            Log in
          </Link>
        </p>
      </form>
    </section>
  );
}
