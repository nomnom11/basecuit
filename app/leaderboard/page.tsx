"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type ScoreRow = {
  id: string;
  total_earned: number;
};

type ProfileRow = {
  id: string;
  nickname: string;
  x_username: string | null;
};

type LeaderboardEntry = {
  id: string;
  nickname: string;
  x_username: string | null;
  total_earned: number;
};

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
  const [myId, setMyId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeaderboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      setMyId(sessionData.session?.user.id || "");

      const { data: scores, error: scoreError } = await supabase
        .from("player_scores")
        .select("id, total_earned")
        .order("total_earned", { ascending: false })
        .limit(100);

      if (scoreError) throw scoreError;

      const scoreRows = (scores || []) as ScoreRow[];

      if (scoreRows.length === 0) {
        setPlayers([]);
        return;
      }

      const playerIds = scoreRows.map((score) => score.id);

      const { data: profiles, error: profileError } = await supabase
        .from("player_profiles")
        .select("id, nickname, x_username")
        .in("id", playerIds);

      if (profileError) throw profileError;

      const profileRows = (profiles || []) as ProfileRow[];
      const profileMap = new Map(
        profileRows.map((profile) => [profile.id, profile])
      );

      const entries = scoreRows
        .map((score) => {
          const profile = profileMap.get(score.id);

          if (!profile) return null;

          return {
            id: score.id,
            nickname: profile.nickname,
            x_username: profile.x_username,
            total_earned: Number(score.total_earned),
          };
        })
        .filter((entry): entry is LeaderboardEntry => entry !== null);

      setPlayers(entries);
    } catch (err) {
      console.error("Leaderboard loading failed:", err);
      setError("Could not load the leaderboard. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadLeaderboard();
  }, [loadLeaderboard]);

  return (
    <main className="min-h-screen bg-[#071a35] px-5 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="text-sm font-semibold text-[#ffe18a] hover:opacity-80"
        >
          ← Back to BASECUIT
        </Link>

        <header className="mt-10 text-center">
          <div className="text-5xl">🏆</div>
          <p className="mt-5 text-xs font-bold tracking-[3px] text-[#ffe18a]">
            BASECUIT GAME COMMUNITY
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-5xl">
            GLOBAL LEADERBOARD
          </h1>
          <p className="mt-3 text-sm text-[#a9b9d1]">
            The players with the highest lifetime Cookie Points.
          </p>
        </header>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold text-[#ffe18a]">
            TOP 100 PLAYERS
          </p>

          <button
            onClick={() => void loadLeaderboard()}
            disabled={loading}
            className="rounded-xl border border-white/15 px-4 py-2 text-sm font-bold transition hover:bg-white/10 disabled:opacity-50"
          >
            {loading ? "Loading..." : "↻ Refresh"}
          </button>
        </div>

        <section className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#102b50]">
          <div className="grid grid-cols-[55px_1fr_auto] gap-3 border-b border-white/10 bg-[#0b2141] px-4 py-4 text-xs font-bold uppercase tracking-wider text-[#a9b9d1] sm:grid-cols-[75px_1fr_180px]">
            <span>Rank</span>
            <span>Player</span>
            <span className="text-right">Total Earned</span>
          </div>

          {loading ? (
            <p className="p-10 text-center text-sm text-[#a9b9d1]">
              Loading global rankings...
            </p>
          ) : error ? (
            <div className="p-10 text-center">
              <p className="text-sm text-red-300">{error}</p>
              <button
                onClick={() => void loadLeaderboard()}
                className="mt-4 rounded-lg bg-[#ffe18a] px-4 py-2 text-sm font-bold text-[#12264a]"
              >
                Try Again
              </button>
            </div>
          ) : players.length === 0 ? (
            <p className="p-10 text-center text-sm text-[#a9b9d1]">
              No players yet. Start playing to claim the first position!
            </p>
          ) : (
            players.map((player, index) => (
              <div
                key={player.id}
                className={`grid grid-cols-[55px_1fr_auto] items-center gap-3 border-b border-white/5 px-4 py-4 last:border-0 sm:grid-cols-[75px_1fr_180px] ${
                  player.id === myId
                    ? "bg-[#ffe18a]/10"
                    : "hover:bg-white/[0.03]"
                }`}
              >
                <span className="text-lg font-black text-[#ffe18a]">
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : `#${index + 1}`}
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold sm:text-base">
                    {player.nickname}
                    {player.id === myId && (
                      <span className="ml-2 text-xs text-[#ffe18a]">
                        YOU
                      </span>
                    )}
                  </p>

                  {player.x_username ? (
                    <a
                      href={`https://x.com/${player.x_username.replace(/^@/, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-xs text-[#a9b9d1] hover:text-[#ffe18a]"
                    >
                      @{player.x_username.replace(/^@/, "")} ↗
                    </a>
                  ) : (
                    <p className="mt-1 text-xs text-[#7185a3]">
                      BASECUIT Player
                    </p>
                  )}
                </div>

                <p className="whitespace-nowrap text-right text-sm font-black text-[#ffe18a] sm:text-base">
                  {Number(player.total_earned).toLocaleString("en-US")}
                </p>
              </div>
            ))
          )}
        </section>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/game"
            className="rounded-xl bg-[#ffe18a] px-5 py-4 text-center font-black text-[#12264a] transition hover:-translate-y-0.5"
          >
            PLAY COOKIE CLICKER
          </Link>

          <Link
            href="/player"
            className="rounded-xl border border-white/15 px-5 py-4 text-center font-bold transition hover:bg-white/10"
          >
            MY PLAYER PROFILE
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-[#7185a3]">
          Rankings are based on lifetime Cookie Points earned.
        </p>
      </div>
    </main>
  );
}
