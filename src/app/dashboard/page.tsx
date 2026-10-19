
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Member = {
  gamer_tag: string | null;
  membership_status: string | null;
};

type Game = {
  id: number;
  name: string;
};

type Registration = {
  id: number;
  game_id: number;
  status: string;
  requested_at: string;
};

type Squad = {
  id: number;
  name: string;
  description: string | null;
  game_id: number | null;
};

type SignupMetadata = {
  requested_game_ids?: unknown;
  steam_community?: unknown;
};

function statusStyle(status: string) {
  if (status === "approved") {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
  }

  if (status === "rejected") {
    return "border-red-500/30 bg-red-500/10 text-red-300";
  }

  return "border-amber-500/30 bg-amber-500/10 text-amber-300";
}

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [member, setMember] = useState<Member | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [mySquads, setMySquads] = useState<Squad[]>([]);
  const [steamCommunity, setSteamCommunity] = useState(false);

  const [message, setMessage] = useState(
    "Loading your member profile..."
  );
  const [notice, setNotice] = useState("");
  const [busyGame, setBusyGame] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!supabase) {
      setMessage("Supabase is not configured.");
      setLoading(false);
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

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("gamer_tag, membership_status")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError || !profile) {
      setMessage("Could not load your member profile.");
      setLoading(false);
      return;
    }

    const { data: activeGames, error: gamesError } = await supabase
      .from("games")
      .select("id, name")
      .eq("is_active", true)
      .order("name");

    if (gamesError) {
      setMessage("Could not load available games.");
      setLoading(false);
      return;
    }

    const metadata = user.user_metadata as SignupMetadata;

    const requestedIds = Array.isArray(metadata.requested_game_ids)
      ? metadata.requested_game_ids.filter(
          (id): id is number =>
            typeof id === "number" &&
            Number.isSafeInteger(id)
        )
      : [];

    const validGameIds = new Set(
      (activeGames ?? []).map((game) => game.id)
    );

    const { data: existing, error: existingError } = await supabase
      .from("member_games")
      .select("id, game_id, status, requested_at")
      .eq("profile_id", user.id);

    if (existingError) {
      setMessage("Could not load your game registrations.");
      setLoading(false);
      return;
    }

    // Complete game requests originally selected at signup.
    // The RPC creates only pending requests.
    const alreadyRequested = new Set(
      (existing ?? []).map((item) => item.game_id)
    );

    const missingIds = requestedIds.filter(
      (id) => validGameIds.has(id) && !alreadyRequested.has(id)
    );

    let syncFailed = false;

    for (const gameId of missingIds) {
      const { error } = await supabase.rpc(
        "request_game_registration",
        { target_game_id: gameId }
      );

      if (error) {
        syncFailed = true;
      }
    }

    const { data: updated, error: updatedError } = await supabase
      .from("member_games")
      .select("id, game_id, status, requested_at")
      .eq("profile_id", user.id)
      .order("requested_at", { ascending: false });

    if (updatedError) {
      setMessage("Could not refresh your game registrations.");
      setLoading(false);
      return;
    }

    // Find the player's authorized squad assignments.
const { data: assignments, error: assignmentsError } =
  await supabase
    .from("squad_members")
    .select("squad_id")
    .eq("profile_id", user.id);

if (assignmentsError) {
  setMessage("Could not load your squad assignments.");
  setLoading(false);
  return;
}

const squadIds = (assignments ?? []).map(
  (assignment) => assignment.squad_id
);

let assignedSquads: Squad[] = [];

if (squadIds.length > 0) {
  const { data: squadData, error: squadError } =
    await supabase
      .from("squads")
      .select("id, name, description, game_id")
      .in("id", squadIds);

  if (squadError) {
    setMessage("Could not load your squads.");
    setLoading(false);
    return;
  }

  assignedSquads = squadData ?? [];
}

setMySquads(assignedSquads);

    setEmail(user.email ?? "");
    setMember({
      gamer_tag: profile.gamer_tag,
      membership_status: profile.membership_status,
    });
    setGames(activeGames ?? []);
    setRegistrations(updated ?? []);
    setSteamCommunity(metadata.steam_community === true);

    setNotice(
      syncFailed
        ? "Some signup game requests could not be submitted. Please contact an administrator if this continues."
        : ""
    );

    setMessage("");
    setLoading(false);
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  async function requestGame(gameId: number) {
    if (!supabase || busyGame !== null) return;

    setBusyGame(gameId);
    setNotice("");

    const { error } = await supabase.rpc(
      "request_game_registration",
      { target_game_id: gameId }
    );

    if (error) {
      setNotice(error.message);
      setBusyGame(null);
      return;
    }

    await load();
    setNotice("Game request submitted. Admin approval is required.");
    setBusyGame(null);
  }

  async function testSquadPrivacy() {
    if (!supabase) return;

    const { data: squadData, error: squadError } = await supabase
      .from("squads")
      .select("id, name")
      .eq("id", 4);

    const { data: rosterData, error: rosterError } = await supabase
      .from("squad_members")
      .select("id, squad_id, profile_id")
      .eq("squad_id", 4);

    console.log("Squad privacy test:", {
      squads: squadData,
      squadError: squadError?.message ?? null,
      roster: rosterData,
      rosterError: rosterError?.message ?? null,
    });

    window.alert(
      `Visible squads: ${squadData?.length ?? 0}\n` +
      `Visible roster entries: ${rosterData?.length ?? 0}\n` +
      "Check the browser console for details."
    );
  }

  async function logout() {
    if (supabase) await supabase.auth.signOut();
    router.replace("/login");
  }

  const registeredGameIds = new Set(
    registrations.map((registration) => registration.game_id)
  );

  const availableGames = games.filter(
    (game) => !registeredGameIds.has(game.id)
  );

  return (
    <section className="container min-h-[65vh] py-16">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
        Requiem Member Area
      </p>

      <h1 className="mt-4 text-4xl font-black uppercase">
        Your Dashboard
      </h1>

      {loading && (
        <p className="mt-6 text-slate-400">
          Loading your account...
        </p>
      )}

      {!loading && message && (
        <div className="panel mt-6 max-w-2xl p-6">
          <p className="text-sm text-slate-400">{message}</p>
          <button
            onClick={logout}
            className="btn btn-secondary mt-5"
          >
            Log out
          </button>
        </div>
      )}

      {!loading && member && (
        <div className="mt-8 max-w-4xl space-y-6">
          {/* ACCOUNT */}
          <div className="panel p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Gamer Tag
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  {member.gamer_tag ?? "Not set"}
                </h2>
              </div>

              <span
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase ${statusStyle(
                  member.membership_status ?? "pending"
                )}`}
              >
                Clan: {member.membership_status}
              </span>
            </div>

            <div className="mt-6 border-t border-violet-500/15 pt-5">
              <p className="text-xs uppercase tracking-widest text-slate-400">
                Account Email
              </p>

              <p className="mt-2 break-all text-sm">{email}</p>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              {member.membership_status === "approved"
                ? "Your clan membership is approved."
                : member.membership_status === "rejected"
                ? "Your clan membership was rejected. Contact an administrator for assistance."
                : "Your clan membership is awaiting admin approval."}
            </p>
          </div>

          {/* GAME REGISTRATIONS */}
          <div className="panel p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
              Your Battlegrounds
            </p>

            <h2 className="mt-3 text-2xl font-black">
              My Games
            </h2>

            {registrations.length === 0 ? (
              <p className="mt-5 text-sm text-slate-400">
                You haven't requested any games yet.
              </p>
            ) : (
              <div className="mt-6 space-y-3">
                {registrations.map((registration) => {
                  const game = games.find(
                    (item) => item.id === registration.game_id
                  );

                  return (
                    <div
                      key={registration.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-violet-500/15 bg-[#100c1c] p-4"
                    >
                      <span className="font-semibold">
                        {game?.name ?? `Game #${registration.game_id}`}
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusStyle(
                          registration.status
                        )}`}
                      >
                        {registration.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <p className="mt-5 text-xs leading-6 text-slate-400">
              Each game requires separate admin approval.
              Game approval does not automatically assign you
              to a squad.
            </p>
          </div>

          {/* REQUEST ADDITIONAL GAMES */}
          {member.membership_status !== "rejected" && (
            <div className="panel p-6 md:p-8">
              <h2 className="text-2xl font-black">
                Request More Games
              </h2>

              {availableGames.length === 0 ? (
                <p className="mt-4 text-sm text-slate-400">
                  You've already requested all available games.
                </p>
              ) : (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {availableGames.map((game) => (
                    <button
                      key={game.id}
                      type="button"
                      disabled={busyGame !== null}
                      onClick={() => requestGame(game.id)}
                      className="rounded-xl border border-violet-500/20 bg-[#100c1c] p-4 text-left font-semibold transition hover:border-violet-400 disabled:opacity-50"
                    >
                      + {game.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEAM COMMUNITY */}
          <div className="panel p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
              PC Gaming
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Steam Community
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              {steamCommunity
                ? "You selected the Steam community during signup. Community access and membership management will be added in a future step."
                : "You haven't selected the Steam community. Community registration will be available in a future update."}
            </p>
          </div>

{/* MY SQUADS */}
<div className="panel p-6 md:p-8">
  <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
    Team Assignments
  </p>

  <h2 className="mt-3 text-2xl font-black">
    My Squads
  </h2>

  {mySquads.length === 0 ? (
    <p className="mt-5 text-sm leading-7 text-slate-400">
      You haven't been assigned to an active squad yet.
      An administrator will assign you after your clan
      membership and game registration are approved.
    </p>
  ) : (
    <div className="mt-6 space-y-4">
      {mySquads.map((squad) => {
        const game = games.find(
          (item) => item.id === squad.game_id
        );

        return (
          <div
            key={squad.id}
            className="rounded-xl border border-violet-500/20 bg-[#100c1c] p-5"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400">
              {game?.name ?? "Competitive Squad"}
            </p>

            <h3 className="mt-2 text-xl font-black">
              {squad.name}
            </h3>

            {squad.description && (
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {squad.description}
              </p>
            )}

            <p className="mt-4 text-xs text-emerald-400">
              Assigned Member
            </p>
          </div>
        );
      })}
    </div>
  )}
</div>

          {notice && (
            <p
              role="status"
              className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 text-sm"
            >
              {notice}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void testSquadPrivacy()}
              className="btn btn-secondary"
            >
              Test Squad Privacy
            </button>

            <button
              type="button"
              onClick={logout}
              className="btn btn-secondary"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
