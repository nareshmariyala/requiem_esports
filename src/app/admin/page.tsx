
"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Applicant = {
  id: string;
  gamer_tag: string;
  preferred_game: string | null;
  membership_status: string;
  created_at: string;
};

export default function AdminPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const loadApplicants = useCallback(async () => {
    setLoading(true);
    setMessage("");

    
    if (!supabase) {
      setMessage("Supabase is not configured. Check your environment variables.");
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage("Please log in to access the admin dashboard.");
      setLoading(false);
      return;
    }

    const { data: admin, error: adminError } =
      await supabase.rpc("check_my_admin_role");

    if (adminError || admin !== true) {
      setIsAdmin(false);
      setMessage("Access denied. Admin privileges are required.");
      setLoading(false);
      return;
    }

    setIsAdmin(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("id, gamer_tag, preferred_game, membership_status, created_at")
      .eq("membership_status", "pending")
      .order("created_at", { ascending: true });

    if (error) {
      setMessage(`Could not load applications: ${error.message}`);
      setApplicants([]);
    } else {
      setApplicants((data ?? []) as Applicant[]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    void loadApplicants();
  }, [loadApplicants]);

  async function updateStatus(
    applicantId: string,
    newStatus: "approved" | "rejected"
  ) {
    const action = newStatus === "approved" ? "approve" : "reject";

    if (!window.confirm(`Are you sure you want to ${action} this applicant?`)) {
      return;
    }

    setWorkingId(applicantId);
    setMessage("");

    const { error } = await supabase.rpc("set_membership_status", {
      target_user_id: applicantId,
      new_status: newStatus,
    });

    if (error) {
      setMessage(`Update failed: ${error.message}`);
    } else {
      setMessage(`Applicant ${newStatus} successfully.`);
      await loadApplicants();
    }

    setWorkingId(null);
  }

  if (loading) {
    return <main className="p-8">Loading admin dashboard...</main>;
  }

  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-3xl p-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-4" role="status">{message}</p>
        <a className="mt-4 inline-block underline" href="/login">
          Go to login
        </a>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-indigo-500">
            Requiem Esports
          </p>
          <h1 className="mt-1 text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-gray-500">
            Review and manage membership applications.
          </p>
        </div>

        <button
          onClick={() => void loadApplicants()}
          className="rounded-lg border px-4 py-2"
        >
          Refresh
        </button>
      </div>

      {message && (
        <p className="my-5 rounded-lg bg-gray-100 p-3" role="status">
          {message}
        </p>
      )}

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">
          Pending Applications ({applicants.length})
        </h2>

        {applicants.length === 0 ? (
          <div className="rounded-xl border p-6 text-gray-500">
            No pending applications at the moment.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3">Gamer Tag</th>
                  <th className="p-3">Preferred Game</th>
                  <th className="p-3">Registered</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => (
                  <tr key={applicant.id} className="border-t">
                    <td className="p-3 font-medium">
                      {applicant.gamer_tag}
                    </td>
                    <td className="p-3">
                      {applicant.preferred_game || "Not specified"}
                    </td>
                    <td className="p-3">
                      {new Date(applicant.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          disabled={workingId !== null}
                          onClick={() =>
                            void updateStatus(applicant.id, "approved")
                          }
                          className="rounded-md bg-green-700 px-3 py-2 text-white disabled:opacity-50"
                        >
                          {workingId === applicant.id
                            ? "Processing..."
                            : "Approve"}
                        </button>
                        <button
                          disabled={workingId !== null}
                          onClick={() =>
                            void updateStatus(applicant.id, "rejected")
                          }
                          className="rounded-md bg-red-700 px-3 py-2 text-white disabled:opacity-50"
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
    </main>
  );
}
