"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function PlayerPage() {
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [xUsername, setXUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;

    async function initializePlayer() {
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        let user = sessionData.session?.user ?? null;

        if (!user) {
          const { data, error } =
            await supabase.auth.signInAnonymously();

          if (error) throw error;
          user = data.user;
        }

        if (!user) throw new Error("Could not create player identity.");

        const { data: profile, error: profileError } = await supabase
          .from("player_profiles")
          .select("nickname, x_username")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!active) return;

        setUserId(user.id);

        if (profile) {
          setNickname(profile.nickname);
          setXUsername(profile.x_username || "");
          setSaved(true);
        }
      } catch (error) {
        if (active) {
          setMessage(
            error instanceof Error
              ? error.message
              : "Could not load player profile."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    initializePlayer();

    return () => {
      active = false;
    };
  }, []);

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanNickname = nickname.trim();
    const cleanX = xUsername.trim().replace(/^@/, "");

    if (cleanNickname.length < 3 || cleanNickname.length > 20) {
      setMessage("Nickname must be between 3 and 20 characters.");
      return;
    }

    if (cleanX && !/^[a-zA-Z0-9_]{1,15}$/.test(cleanX)) {
      setMessage("Please enter a valid X username.");
      return;
    }

    setSaving(true);
    setMessage("");

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      setMessage("Your player session is not active. Please refresh the page.");
      setSaving(false);
      return;
    }

    const activeUserId = sessionData.session.user.id;
    const tokenPayload = JSON.parse(
      atob(
        sessionData.session.access_token
          .split(".")[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/")
      )
    );
    console.log("[BASECUIT AUTH CHECK]", {
      sessionUserId: activeUserId,
      tokenSubject: tokenPayload.sub,
      tokenRole: tokenPayload.role,
    });

    const { error } = await supabase
      .from("player_profiles")
      .upsert(
        {
          id: activeUserId,
          nickname: cleanNickname,
          x_username: cleanX || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (error) {
      setMessage(
        error.code === "23505"
          ? "This nickname is already taken. Please choose another."
          : error.message
      );
    } else {
      setNickname(cleanNickname);
      setXUsername(cleanX);
      setSaved(true);
      setMessage("Your player profile has been saved!");
    }

    setSaving(false);
  }

  return (
    <main className="min-h-screen bg-[#071a35] px-5 py-12 text-white">
      <div className="mx-auto max-w-xl">
        <Link
          href="/"
          className="text-sm font-semibold text-[#ffe18a] hover:opacity-80"
        >
          ← Back to BASECUIT
        </Link>

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#102b50] p-7 shadow-2xl sm:p-10">
          <div className="text-center">
            <div className="text-5xl">🍪</div>
            <p className="mt-5 text-xs font-bold tracking-[3px] text-[#ffe18a]">
              BASECUIT PLAYER SYSTEM
            </p>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
              PLAYER PROFILE
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#a9b9d1]">
              Create your player identity and join the BASECUIT game community.
            </p>
          </div>

          {loading ? (
            <p className="py-12 text-center text-[#a9b9d1]">
              Preparing your player identity...
            </p>
          ) : userId ? (
            <form onSubmit={saveProfile} className="mt-9 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Nickname
                </label>
                <input
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}
                  minLength={3}
                  maxLength={20}
                  required
                  placeholder="Choose your player name"
                  className="w-full rounded-xl border border-white/10 bg-[#071a35] px-4 py-4 outline-none focus:border-[#ffe18a]"
                />
                <p className="mt-2 text-xs text-[#a9b9d1]">
                  3–20 characters. Your nickname appears on the leaderboard.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  X Username <span className="text-[#a9b9d1]">(Optional)</span>
                </label>
                <input
                  value={xUsername}
                  onChange={(event) => setXUsername(event.target.value)}
                  maxLength={16}
                  placeholder="@yourusername"
                  className="w-full rounded-xl border border-white/10 bg-[#071a35] px-4 py-4 outline-none focus:border-[#ffe18a]"
                />
                <p className="mt-2 text-xs text-[#a9b9d1]">
                  Your X profile can be displayed beside your leaderboard name.
                </p>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl bg-[#ffe18a] px-5 py-4 font-black text-[#12264a] transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
              >
                {saving
                  ? "SAVING..."
                  : saved
                    ? "UPDATE PLAYER PROFILE"
                    : "CREATE PLAYER PROFILE"}
              </button>

              {message && (
                <p className="rounded-xl bg-[#071a35] p-4 text-center text-sm text-[#ffe18a]">
                  {message}
                </p>
              )}

              {saved && (
                <div className="rounded-xl border border-white/10 bg-[#071a35] p-4 text-center">
                  <p className="font-bold text-[#ffe18a]">
                    Welcome, {nickname}!
                  </p>
                  {xUsername && (
                    <a
                      href={`https://x.com/${xUsername.replace(/^@/, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-sm text-[#a9b9d1] hover:text-white"
                    >
                      @{xUsername.replace(/^@/, "")} ↗
                    </a>
                  )}
                  <p className="mt-3 text-xs text-[#a9b9d1]">
                    Your player identity is ready.
                  </p>
                </div>
              )}
            </form>
          ) : (
            <p className="mt-8 rounded-xl bg-[#071a35] p-4 text-center text-sm text-red-300">
              {message || "Could not initialize player identity."}
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-[#7890b2]">
          No wallet required. Just create your player identity and have fun.
        </p>
      </div>
    </main>
  );
}
