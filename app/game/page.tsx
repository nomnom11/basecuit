"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CookieClicker() {
  const [points, setPoints] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoPower, setAutoPower] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [cracking, setCracking] = useState(false);
  const [crumbs, setCrumbs] = useState<{ id: number; x: number; y: number; size: number; rotation: number }[]>([]);
  const [prestigeCount, setPrestigeCount] = useState(0);
  const [scoreSync, setScoreSync] = useState("waiting");
  const totalEarnedRef = useRef(totalEarned);
  totalEarnedRef.current = totalEarned;

  const MAX_LEVEL = 100;
  const clickCost = Math.round(100 * Math.pow(1.08, clickPower - 1));
  const autoCost = Math.round(500 * Math.pow(1.08, autoPower));
  const prestigeMultiplier = 1 + prestigeCount * 0.25;
  const canPrestige = clickPower >= MAX_LEVEL || autoPower >= MAX_LEVEL;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("basecuit-cookie-game");
      if (saved) {
        const data = JSON.parse(saved);
        setPoints(data.points || 0);
        setTotalEarned(data.totalEarned || 0);
        setClickPower(data.clickPower || 1);
        setAutoPower(data.autoPower || 0);
        setPrestigeCount(data.prestigeCount || 0);
      }
    } catch {
      console.warn("Could not load saved game.");
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "basecuit-cookie-game",
      JSON.stringify({ points, totalEarned, clickPower, autoPower, prestigeCount })
    );
  }, [points, totalEarned, clickPower, autoPower, prestigeCount, loaded]);

  useEffect(() => {
    if (!loaded) return;

    let active = true;
    let syncing = false;

    async function syncScore() {
      if (syncing) return;
      syncing = true;

      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        const user = sessionData.session?.user;
        if (!user) {
          if (active) setScoreSync("no-profile");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("player_profiles")
          .select("id")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!profile) {
          if (active) setScoreSync("no-profile");
          return;
        }

        const { error: scoreError } = await supabase.rpc(
          "save_player_score",
          { p_total_earned: Math.floor(totalEarnedRef.current) }
        );

        if (scoreError) throw scoreError;
        if (active) setScoreSync("saved");
      } catch (error) {
        console.error("Score sync failed:", error);
        if (active) setScoreSync("error");
      } finally {
        syncing = false;
      }
    }

    void syncScore();
    const timer = window.setInterval(() => {
      void syncScore();
    }, 10000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [loaded]);

  useEffect(() => {
    if (autoPower <= 0) return;

    const timer = setInterval(() => {
      const earned = Math.floor(autoPower * prestigeMultiplier);
      setPoints((current) => current + earned);
      setTotalEarned((current) => current + earned);
    }, 1000);

    return () => clearInterval(timer);
  }, [autoPower, prestigeMultiplier]);

  function clickCookie() {
    const earned = Math.floor(clickPower * prestigeMultiplier);
    setPoints((current) => current + earned);
    setTotalEarned((current) => current + earned);
    setClicking(true);
    setTimeout(() => setClicking(false), 120);
    setCracking(true);
    setTimeout(() => setCracking(false), 350);

    const burst = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x: Math.round((Math.random() - 0.5) * 220),
      y: Math.round((Math.random() - 0.5) * 220),
      size: Math.round(5 + Math.random() * 9),
      rotation: Math.round(Math.random() * 360),
    }));

    setCrumbs(burst);
    setTimeout(() => setCrumbs([]), 750);
  }

  function buyClickUpgrade() {
    if (points < clickCost || clickPower >= MAX_LEVEL) return;
    setPoints((current) => current - clickCost);
    setClickPower((current) => current + 1);
  }

  function buyAutoUpgrade() {
    if (points < autoCost || autoPower >= MAX_LEVEL) return;
    setPoints((current) => current - autoCost);
    setAutoPower((current) => current + 1);
  }

  function performPrestige() {
    if (!canPrestige) return;
    setPoints(0);
    setClickPower(1);
    setAutoPower(0);
    setPrestigeCount((current) => current + 1);
  }

  const format = (value: number) =>
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <main className="min-h-screen bg-[#071a35] px-4 py-6 text-white sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="BASECUIT"
              width={46}
              height={46}
              className="rounded-xl"
            />
            <span className="text-lg font-black tracking-wide">BASECUIT</span>
          </Link>

          <Link
            href="/player"
            className="rounded-xl border border-white/15 px-4 py-2 text-sm font-bold text-[#ffe18a] transition hover:bg-white/10"
          >
            Player Profile
          </Link>
        </header>

        <section className="mt-10 text-center">
          <p className="text-xs font-bold tracking-[4px] text-[#ffe18a]">
            BASECUIT ARCADE
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">
            COOKIE CLICKER
          </h1>
          <p className="mt-3 text-sm text-[#a9b9d1]">
            Click the BASECUIT. Build your cookie empire.
          </p>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
          <section className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#102b50] px-5 py-10 sm:py-14">
            <p className="text-sm font-bold uppercase tracking-widest text-[#a9b9d1]">
              Your Cookie Points
            </p>

            <div className="mt-3 text-5xl font-black text-[#ffe18a] sm:text-6xl">
              {format(points)}
            </div>

            <p className="mt-3 text-sm text-[#a9b9d1]">
              +{format(clickPower)} per click
              {autoPower > 0 ? ` · +${format(autoPower)} per second` : ""}
            </p>

            <button
              type="button"
              onClick={clickCookie}
              disabled={!loaded}
              aria-label="Click BASECUIT to earn Cookie Points"
              className={`relative mt-10 rounded-full p-3 transition duration-100 hover:scale-105 active:scale-90 disabled:opacity-50 ${
                clicking ? "scale-90" : "scale-100"
              }`}
            >
              <Image
                src="/logo.png"
                alt="Click BASECUIT"
                width={260}
                height={260}
                priority
                className="h-52 w-52 rounded-full object-cover drop-shadow-[0_15px_35px_rgba(255,225,138,0.2)] sm:h-64 sm:w-64"
              />
              {cracking && (
                <svg className="cookie-crack" viewBox="0 0 260 260" aria-hidden="true">
                  <path d="M130 18 L119 67 L139 91 L112 125 L128 151 L103 190 L111 226" />
                  <path d="M119 67 L82 77 L68 105" />
                  <path d="M139 91 L177 76 L190 49" />
                  <path d="M112 125 L76 145 L59 174" />
                  <path d="M128 151 L166 160 L190 190" />
                  <path d="M103 190 L76 211" />
                </svg>
              )}
              {crumbs.map((crumb) => (
                <span
                  key={crumb.id}
                  className="cookie-crumb"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: crumb.size,
                    height: crumb.size,
                    "--crumb-x": `${crumb.x}px`,
                    "--crumb-y": `${crumb.y}px`,
                    "--crumb-rotate": `${crumb.rotation}deg`,
                  } as React.CSSProperties}
                />
              ))}
            </button>

            <p className="mt-5 text-sm font-bold text-[#ffe18a]">
              CLICK THE BASECUIT!
            </p>

            <div className="mt-10 grid w-full max-w-md grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#071a35] p-4 text-center">
                <p className="text-xs text-[#a9b9d1]">Total Earned</p>
                <p className="mt-2 text-xl font-black">
                  {format(totalEarned)}
                </p>
              </div>
              <div className="rounded-2xl bg-[#071a35] p-4 text-center">
                <p className="text-xs text-[#a9b9d1]">Click Power</p>
                <p className="mt-2 text-xl font-black">{clickPower}</p>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#a9b9d1]" aria-live="polite">
              {scoreSync === "saved" && "✓ Score saved to leaderboard"}
              {scoreSync === "no-profile" && "Create a Player Profile to join the leaderboard."}
              {scoreSync === "error" && "Score sync failed. Please refresh the page."}
              {scoreSync === "waiting" && "Preparing score synchronization..."}
            </p>
          </section>

          <aside className="rounded-3xl border border-white/10 bg-[#102b50] p-6">
            <div className="mb-6">
              <p className="text-xs font-bold tracking-[3px] text-[#ffe18a]">
                THE SHOP
              </p>
              <h2 className="mt-2 text-2xl font-black">UPGRADES</h2>
              <p className="mt-2 text-sm text-[#a9b9d1]">
                Spend your points to grow faster.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#071a35] p-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">👆</span>
                  <div>
                    <h3 className="font-black">Click Power</h3>
                    <p className="text-xs text-[#a9b9d1]">
                      +1 point per click
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#ffe18a]">
                  Level {clickPower} · {clickPower >= MAX_LEVEL ? "MAX LEVEL" : `Cost: ${format(clickCost)}`}
                </p>
                <button
                  onClick={buyClickUpgrade}
                  disabled={points < clickCost || clickPower >= MAX_LEVEL}
                  className="mt-3 w-full rounded-xl bg-[#ffe18a] px-4 py-3 text-sm font-black text-[#12264a] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {clickPower >= MAX_LEVEL ? "MAX LEVEL" : "BUY UPGRADE"}
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#071a35] p-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">⚙️</span>
                  <div>
                    <h3 className="font-black">Auto Clicker</h3>
                    <p className="text-xs text-[#a9b9d1]">
                      Earn points automatically
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#ffe18a]">
                  Level {autoPower} · {autoPower >= MAX_LEVEL ? "MAX LEVEL" : `Cost: ${format(autoCost)}`}
                </p>
                <button
                  onClick={buyAutoUpgrade}
                  disabled={points < autoCost || autoPower >= MAX_LEVEL}
                  className="mt-3 w-full rounded-xl bg-[#ffe18a] px-4 py-3 text-sm font-black text-[#12264a] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {autoPower >= MAX_LEVEL ? "MAX LEVEL" : "BUY AUTO CLICKER"}
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 p-4 text-center">
              <p className="text-xs text-[#a9b9d1]">AUTO PRODUCTION</p>
              <p className="mt-2 text-2xl font-black text-[#ffe18a]">
                {format(autoPower)} / sec
              </p>
            </div>
          </aside>
        </div>

        <section className="mt-8 rounded-3xl border border-white/10 bg-[#102b50] p-6">
          <div className="mb-5">
            <p className="text-xs font-bold tracking-[3px] text-[#ffe18a]">YOUR PROGRESS</p>
            <h2 className="mt-2 text-2xl font-black">ACHIEVEMENTS</h2>
            <p className="mt-2 text-sm text-[#a9b9d1]">Reach upgrade milestones to unlock achievements.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { level: 10, name: "Cookie Rookie", description: "Reach Level 10" },
              { level: 25, name: "Cookie Builder", description: "Reach Level 25" },
              { level: 50, name: "Cookie Master", description: "Reach Level 50" },
              { level: 100, name: "Cookie Legend", description: "Reach Level 100" },
            ].map((achievement) => {
              const unlocked = Math.max(clickPower, autoPower) >= achievement.level;
              return (
                <div key={achievement.level} className={`rounded-2xl border p-4 ${unlocked ? "border-[#ffe18a]/50 bg-[#ffe18a]/10" : "border-white/10 bg-[#071a35] opacity-60"}`}>
                  <div className="text-2xl">{unlocked ? "🏆" : "🔒"}</div>
                  <h3 className="mt-3 font-black">{achievement.name}</h3>
                  <p className="mt-1 text-xs text-[#a9b9d1]">{achievement.description}</p>
                  <p className="mt-3 text-xs font-bold text-[#ffe18a]">{unlocked ? "UNLOCKED" : "LOCKED"}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-[#ffe18a]/30 bg-[#102b50] p-6">
          <p className="text-xs font-bold tracking-[3px] text-[#ffe18a]">ENDGAME SYSTEM</p>
          <h2 className="mt-2 text-2xl font-black">PRESTIGE</h2>
          <p className="mt-2 text-sm text-[#a9b9d1]">Reset your upgrades and Cookie Points to gain a permanent production bonus.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#071a35] p-4 text-center">
              <p className="text-xs text-[#a9b9d1]">PRESTIGE LEVEL</p>
              <p className="mt-2 text-2xl font-black text-[#ffe18a]">{prestigeCount}</p>
            </div>
            <div className="rounded-2xl bg-[#071a35] p-4 text-center">
              <p className="text-xs text-[#a9b9d1]">PERMANENT BONUS</p>
              <p className="mt-2 text-2xl font-black text-[#ffe18a]">+{prestigeCount * 25}%</p>
            </div>
            <div className="rounded-2xl bg-[#071a35] p-4 text-center">
              <p className="text-xs text-[#a9b9d1]">NEXT BONUS</p>
              <p className="mt-2 text-2xl font-black text-[#ffe18a]">+25%</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-[#a9b9d1]">
            {canPrestige ? "You have reached Level 100. You can prestige now!" : "Reach Level 100 in Click Power or Auto Clicker to unlock Prestige."}
          </p>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Prestige will reset your Cookie Points and upgrade levels. Your total earned points and Prestige bonus will remain. Continue?")) {
                performPrestige();
              }
            }}
            disabled={!canPrestige}
            className="mt-4 w-full rounded-xl bg-[#ffe18a] px-4 py-3 text-sm font-black text-[#12264a] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {canPrestige ? "PRESTIGE NOW" : "PRESTIGE LOCKED"}
          </button>
        </section>

        <footer className="mt-8 text-center text-xs text-[#7890b2]">
          BASECUIT COOKIE CLICKER · Just for fun
        </footer>
      </div>
    </main>
  );
}
