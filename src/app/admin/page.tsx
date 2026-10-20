
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Applicant = {
  id: string;
  gamer_tag: string;
  membership_status: string;
  created_at: string;
};

type Game = {
  id: number;
  name: string;
};

type GameRequest = {
  id: number;
  profile_id: string;
  game_id: number;
  status: string;
  requested_at: string;
};

type PlayerInfo = {
  id: string;
  gamer_tag: string;
  membership_status: string;
};

export default function AdminPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [gameRequests, setGameRequests] = useState<GameRequest[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [players, setPlayers] = useState<PlayerInfo[]>([]);

  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);

    if (!supabase) {
      setMessage("Supabase is not configured.");
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage("Please log in to access the admin dashboard.");
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    const { data: admin, error: adminError } =
      await supabase.rpc("check_my_admin_role");

    if (adminError || admin !== true) {
      setMessage("Access denied. Admin privileges are required.");
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    setIsAdmin(true);

    const [
      applicantsResult,
      requestsResult,
      gamesResult,
      playersResult,
    ] = await Promise.all([
      supabase
        .from("profiles")
        .select("id, gamer_tag, membership_status, created_at")
        .eq("membership_status", "pending")
        .order("created_at", { ascending: true }),

      supabase
        .from("member_games")
        .select("id, profile_id, game_id, status, requested_at")
        .eq("status", "pending")
        .order("requested_at", { ascending: true }),

      supabase
        .from("games")
        .select("id, name")
        .order("name"),

      supabase
        .from("profiles")
        .select("id, gamer_tag, membership_status"),
    ]);

    const errors = [
      applicantsResult.error,
      requestsResult.error,
      gamesResult.error,
      playersResult.error,
    ].filter(Boolean);

    if (errors.length > 0) {
      setMessage(
        "Could not load all admin data: " +
          errors.map((error) => error?.message).join("; ")
      );
    } else {
      setMessage("");
    }

    setApplicants(applicantsResult.data ?? []);
    setGameRequests(requestsResult.data ?? []);
    setGames(gamesResult.data ?? []);
    setPlayers(playersResult.data ?? []);

    setLoading(false);
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  async function updateMembership(
    applicantId: string,
    newStatus: "approved" | "rejected"
  ) {
    if (!supabase || workingId !== null) return;

    const action = newStatus === "approved" ? "approve" : "reject";

    if (!window.confirm(`Are you sure you want to ${action} this player?`)) {
      return;
    }

    setWorkingId(`member-${applicantId}`);

    const { error } = await supabase.rpc("set_membership_status", {
      target_user_id: applicantId,
      new_status: newStatus,
    });

    if (error) {
      setMessage(`Membership update failed: ${error.message}`);
    } else {
      await loadData();
      setMessage(`Clan membership ${newStatus} successfully.`);
    }

    setWorkingId(null);
  }

  async function updateGameRequest(
    requestId: number,
    newStatus: "approved" | "rejected"
  ) {
    if (!supabase || workingId !== null) return;

    const action = newStatus === "approved" ? "approve" : "reject";

    if (
      !window.confirm(
        `Are you sure you want to ${action} this game registration?`
      )
    ) {
      return;
    }

    setWorkingId(`game-${requestId}`);

    const { error } = await supabase.rpc(
      "review_game_registration",
      {
        target_registration_id: requestId,
        new_status: newStatus,
      }
    );

    if (error) {
      setMessage(`Game approval failed: ${error.message}`);
    } else {
      await loadData();
      setMessage(`Game registration ${newStatus} successfully.`);
    }

    setWorkingId(null);
  }

  
async function testSquadAssignment() {
  if (!supabase || workingId !== null) return;

  const confirmed = window.confirm(
    "Assign test 3 to Requiem CODM Alpha?"
  );

  if (!confirmed) return;

  setWorkingId("squad-test");
  setMessage("");

  const { error } = await supabase.rpc(
    "assign_player_to_squad",
    {
      target_profile_id: "1e469ae5-f0b8-4353-8650-261d89e58b89",
      target_squad_id: 4,
    }
  );

  if (error) {
    setMessage(`Squad assignment failed: ${error.message}`);
  } else {
    setMessage(
      "Success! test 3 was assigned to Requiem CODM Alpha."
    );
  }

  setWorkingId(null);
  }

  function getGameName(gameId: number) {
    return games.find((game) => game.id === gameId)?.name
      ?? `Game #${gameId}`;
  }

  function getPlayer(profileId: string) {
    return players.find((player) => player.id === profileId);
  }

  if (loading) {
    return (
      <main className="container py-16 text-slate-400">
        Loading admin dashboard...
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="container py-16">
        <h1 className="text-3xl font-black">Admin Dashboard</h1>
        <p className="mt-5 text-slate-400">{message}</p>
        <Link
          href="/login"
          className="btn btn-secondary mt-6 inline-flex"
        >
          Go to Login
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-14">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
            Requiem Esports
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase">
            Admin Dashboard
          </h1>

          <p className="mt-4 text-slate-400">
            Manage clan membership and game registrations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadData()}
          disabled={workingId !== null}
          className="btn btn-secondary disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {message && (
        <p
          role="status"
          className="mt-6 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 text-sm"
        >
          {message}
        </p>
      )}

      {/* OVERVIEW */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="panel p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Pending Clan Applications
          </p>
          <p className="mt-3 text-4xl font-black text-violet-300">
            {applicants.length}
          </p>
        </div>

        <div className="panel p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Pending Game Requests
          </p>
          <p className="mt-3 text-4xl font-black text-violet-300">
            {gameRequests.length}
          </p>
        </div>
      </div>

      {/* CLAN MEMBERSHIP */}
      <section className="mt-12">
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
            Membership Management
          </p>
          <h2 className="mt-2 text-2xl font-black">
            Pending Clan Applications
          </h2>
        </div>

        {applicants.length === 0 ? (
          <div className="panel p-6 text-slate-400">
            No pending clan applications.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-violet-500/15">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-[#1c142d] text-violet-200">
                <tr>
                  <th className="p-4">Gamer Tag</th>
                  <th className="p-4">Registered</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {applicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    className="border-t border-violet-500/10"
                  >
                    <td className="p-4 font-semibold">
                      {applicant.gamer_tag}
                    </td>

                    <td className="p-4 text-slate-400">
                      {new Date(
                        applicant.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={workingId !== null}
                          onClick={() =>
                            void updateMembership(
                              applicant.id,
                              "approved"
                            )
                          }
                          className="rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white disabled:opacity-50"
                        >
                          Approve
                        </button>

                        <button
                          type="button"
                          disabled={workingId !== null}
                          onClick={() =>
                            void updateMembership(
                              applicant.id,
                              "rejected"
                            )
                          }
                          className="rounded-lg bg-red-800 px-4 py-2 font-semibold text-white disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* GAME REQUESTS */}
      <section className="mt-14">
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
            Game Management
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Pending Game Registrations
          </h2>

          <p className="mt-3 text-sm text-slate-400">
            Every game request requires individual admin approval.
          </p>
        </div>

        {gameRequests.length === 0 ? (
          <div className="panel p-6 text-slate-400">
            No pending game registrations.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-violet-500/15">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-[#1c142d] text-violet-200">
                <tr>
                  <th className="p-4">Player</th>
                  <th className="p-4">Game</th>
                  <th className="p-4">Clan Status</th>
                  <th className="p-4">Requested</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {gameRequests.map((request) => {
                  const player = getPlayer(request.profile_id);

                  return (
                    <tr
                      key={request.id}
                      className="border-t border-violet-500/10"
                    >
                      <td className="p-4 font-semibold">
                        {player?.gamer_tag ?? "Unknown player"}
                      </td>

                      <td className="p-4">
                        {getGameName(request.game_id)}
                      </td>

                      <td className="p-4">
                        <span className="rounded-full border border-violet-500/20 px-3 py-1 text-xs uppercase text-slate-300">
                          {player?.membership_status ?? "Unknown"}
                        </span>
                      </td>

                      <td className="p-4 text-slate-400">
                        {new Date(
                          request.requested_at
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={
                              workingId !== null ||
                              player?.membership_status !== "approved"
                            }
                            onClick={() =>
                              void updateGameRequest(
                                request.id,
                                "approved"
                              )
                            }
                            className="rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white disabled:opacity-50"
                          >
                            Approve
                          </button>

                          <button
                            type="button"
                            disabled={workingId !== null}
                            onClick={() =>
                              void updateGameRequest(
                                request.id,
                                "rejected"
                              )
                            }
                            className="rounded-lg bg-red-800 px-4 py-2 font-semibold text-white disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
      
      {/* TEMPORARY SQUAD ASSIGNMENT TEST */}
      <section className="panel mt-12 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
          Squad Management Test
        </p>

        <h2 className="mt-3 text-2xl font-black">
          Requiem CODM Alpha
        </h2>

        <p className="mt-3 text-sm text-slate-400">
          Assign test 3 to the Call of Duty: Mobile squad.
          This uses the secure database assignment function.
        </p>

        <button
          type="button"
          onClick={() => void testSquadAssignment()}
          disabled={workingId !== null}
          className="btn btn-primary mt-5 disabled:opacity-50"
        >
          {workingId === "squad-test"
            ? "Assigning..."
            : "Assign test 3 to squad"}
        </button>
      </section>
    </main>
  );
}
