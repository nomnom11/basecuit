import Image from "next/image";
import Link from "next/link";

const sections = [
  ["01", "Introduction", "introduction"],
  ["02", "Vision & Mission", "vision"],
  ["03", "The Ecosystem", "ecosystem"],
  ["04", "Tokenomics", "tokenomics"],
  ["05", "Staking", "staking"],
  ["06", "Community", "community"],
  ["07", "BASECUIT Arcade", "arcade"],
  ["08", "Roadmap", "roadmap"],
  ["09", "Risks & Disclaimer", "disclaimer"],
];

function SectionTitle({
  number,
  eyebrow,
  title,
}: {
  number: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-7">
      <span className="text-sm font-bold tracking-[0.2em] text-[#ffe18a]">
        {number} / {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#071a32] text-white">
      <header className="sticky top-0 z-40 border-b border-[#4385ff30] bg-[#081d38ee] backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="BASECUIT" width={42} height={42} priority />
            <span className="text-lg font-black tracking-tight">BASECUIT</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs font-bold tracking-widest text-[#9eb2d0] sm:inline">
              OFFICIAL WHITEPAPER
            </span>
            <Link
              href="/"
              className="rounded-full border border-[#ffe18a55] px-5 py-2.5 text-xs font-bold text-[#ffe18a] transition hover:bg-[#ffe18a] hover:text-[#12264a]"
            >
              BACK TO HOME ↗
            </Link>
          </div>
        </div>
      </header>

      <section className="relative border-b border-[#4385ff25] px-5 py-20 md:px-10 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#174b7a55,_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ffe18a40] bg-[#ffe18a10] px-4 py-2 text-xs font-bold tracking-widest text-[#ffe18a]">
            <span className="h-2 w-2 rounded-full bg-[#ffe18a]" />
            THE BASECUIT PROJECT
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            THE RECIPE
            <br />
            <span className="text-[#ffe18a]">FOR A NEW CULTURE.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[#b8c6dc] md:text-lg">
            An overview of BASECUIT, a community-driven meme coin project
            inspired by cookie culture and built on the Base blockchain.
            Cookies, memes, creativity, and community — all in one ecosystem.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#introduction"
              className="rounded-xl bg-[#ffe18a] px-7 py-4 text-sm font-black text-[#12264a] transition hover:-translate-y-1"
            >
              EXPLORE THE WHITEPAPER ↗
            </a>
            <span className="rounded-xl border border-white/15 px-6 py-4 text-sm font-bold text-[#b8c6dc]">
              NETWORK: BASE
            </span>
          </div>
          <div className="mt-14 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
            {[
              ["PROJECT", "BASECUIT"],
              ["BLOCKCHAIN", "BASE"],
              ["CATEGORY", "MEME COIN"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#8fa6c5]">
                  {label}
                </span>
                <p className="mt-2 text-lg font-black text-[#ffe18a]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[250px_1fr] md:px-10 md:py-24">
        <aside className="h-fit rounded-2xl border border-white/10 bg-[#0c2442] p-6 md:sticky md:top-28">
          <p className="mb-5 text-xs font-black tracking-[0.2em] text-[#ffe18a]">
            CONTENTS
          </p>
          <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {sections.map(([number, title, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-lg px-3 py-2.5 text-sm text-[#b8c6dc] transition hover:bg-white/5 hover:text-[#ffe18a]"
              >
                <span className="mr-2 text-xs text-[#ffe18a]">{number}</span>
                {title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="min-w-0 space-y-20">
          <section id="introduction" className="scroll-mt-28">
            <SectionTitle number="01" eyebrow="INTRODUCTION" title="What Is BASECUIT?" />
            <div className="space-y-5 text-[15px] leading-8 text-[#b8c6dc]">
              <p>
                BASECUIT is a meme coin project built on the Base blockchain,
                inspired by the fun, creativity, and shared culture surrounding
                cookies. It aims to bring people together through internet
                culture, memes, digital experiences, and community participation.
              </p>
              <p>
                BASECUIT is more than a token identity. It is an evolving
                community concept designed around a simple idea: make the
                experience of participating in the Base ecosystem fun,
                accessible, and creative.
              </p>
              <p>
                This whitepaper introduces the project&apos;s current concept,
                ecosystem, planned features, and development direction. It is
                an informational document and does not promise financial
                returns or future outcomes.
              </p>
            </div>
          </section>

          <section id="vision" className="scroll-mt-28">
            <SectionTitle number="02" eyebrow="VISION & MISSION" title="Building a Cookie Culture." />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#ffe18a30] bg-[#102b50] p-7">
                <span className="text-3xl">🎯</span>
                <h3 className="mt-5 text-xl font-black text-[#ffe18a]">OUR VISION</h3>
                <p className="mt-3 leading-7 text-[#b8c6dc]">
                  To establish BASECUIT as a recognizable and creative
                  community identity within the Base ecosystem.
                </p>
              </div>
              <div className="rounded-2xl border border-[#4385ff35] bg-[#102b50] p-7">
                <span className="text-3xl">🍪</span>
                <h3 className="mt-5 text-xl font-black text-[#ffe18a]">OUR MISSION</h3>
                <p className="mt-3 leading-7 text-[#b8c6dc]">
                  To encourage community participation through memes,
                  creative content, interactive experiences, and future
                  ecosystem initiatives.
                </p>
              </div>
            </div>
          </section>

          <section id="ecosystem" className="scroll-mt-28">
            <SectionTitle number="03" eyebrow="THE ECOSYSTEM" title="More Than a Meme." />
            <p className="mb-7 leading-8 text-[#b8c6dc]">
              The BASECUIT ecosystem is designed to connect token identity,
              community creativity, and interactive digital experiences.
              Its current website introduces several parts of this concept.
            </p>
            <div className="space-y-4">
              {[
                ["01", "Token Identity", "The BASECUIT token concept on the Base blockchain. Official contract and token parameters are pending announcement."],
                ["02", "Meme Hub", "A community space for sharing creative BASECUIT memes and participating in meme voting."],
                ["03", "Player Profiles", "A player identity experience where community members can create a profile."],
                ["04", "Community Games", "Interactive experiences designed to make participation more enjoyable."],
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-5 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <span className="text-lg font-black text-[#ffe18a]">{number}</span>
                  <div>
                    <h3 className="font-black text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#aebed3]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="tokenomics" className="scroll-mt-28">
            <SectionTitle number="04" eyebrow="TOKENOMICS" title="The Recipe." />
            <p className="mb-7 leading-8 text-[#b8c6dc]">
              BASECUIT&apos;s official token parameters have not yet been
              published. The information below reflects only what is currently
              confirmed on the project website.
            </p>
            <div className="overflow-hidden rounded-2xl border border-[#ffe18a35] bg-[#102b50]">
              {[
                ["Token Name", "BASECUIT"],
                ["Blockchain Network", "Base"],
                ["Token Ticker", "To Be Announced"],
                ["Contract Address", "To Be Announced"],
                ["Total Supply", "To Be Announced"],
                ["Token Distribution", "To Be Announced"],
                ["Liquidity Details", "To Be Announced"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col justify-between gap-2 border-b border-white/10 px-6 py-5 last:border-0 sm:flex-row">
                  <span className="text-sm text-[#9eb2d0]">{label}</span>
                  <strong className="text-sm font-black text-[#ffe18a]">{value}</strong>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[#8fa6c5]">
              No token allocation, supply figure, or financial distribution
              should be assumed until an official announcement is published.
            </p>
          </section>

          <section id="staking" className="scroll-mt-28">
            <SectionTitle number="05" eyebrow="STAKING" title="Rewards Are Baking." />
            <p className="leading-8 text-[#b8c6dc]">
              BASECUIT staking is a planned ecosystem feature currently under
              development. The project website describes potential reward
              concepts, including eligible protocol transaction fees,
              ecosystem partner bonuses, and additional BASECUIT rewards.
            </p>
            <div className="mt-7 rounded-2xl border border-[#ffe18a40] bg-[#ffe18a0d] p-6">
              <span className="text-xs font-black tracking-widest text-[#ffe18a]">CURRENT STATUS</span>
              <h3 className="mt-3 text-2xl font-black">COMING SOON</h3>
              <p className="mt-3 leading-7 text-[#b8c6dc]">
                Staking availability, eligibility, reward calculations,
                duration, and terms have not been finalized or announced.
                No yield or reward is guaranteed.
              </p>
            </div>
          </section>

          <section id="community" className="scroll-mt-28">
            <SectionTitle number="06" eyebrow="COMMUNITY" title="The People Make the Culture." />
            <p className="leading-8 text-[#b8c6dc]">
              Community creativity is central to BASECUIT. Members are
              encouraged to create memes, share ideas, participate in
              discussions, and help shape the project&apos;s identity.
              Community initiatives and social channels may evolve as
              the ecosystem develops.
            </p>
          </section>

          <section id="arcade" className="scroll-mt-28">
            <SectionTitle number="07" eyebrow="BASECUIT ARCADE" title="Play. Earn. Climb the Ranks." />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#102b50] p-6">
                <span className="text-4xl">🍪</span>
                <h3 className="mt-4 text-lg font-black">COOKIE CLICKER</h3>
                <p className="mt-3 text-sm leading-7 text-[#b8c6dc]">
                  An interactive game where players click cookies, collect
                  points, unlock upgrades, and build their lifetime score.
                </p>
                <Link href="/game" className="mt-5 inline-block text-sm font-black text-[#ffe18a]">
                  PLAY THE GAME ↗
                </Link>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#102b50] p-6">
                <span className="text-4xl">🏆</span>
                <h3 className="mt-4 text-lg font-black">GLOBAL LEADERBOARD</h3>
                <p className="mt-3 text-sm leading-7 text-[#b8c6dc]">
                  A ranking experience that displays player scores and
                  celebrates participation in the BASECUIT Arcade.
                </p>
                <Link href="/leaderboard" className="mt-5 inline-block text-sm font-black text-[#ffe18a]">
                  VIEW LEADERBOARD ↗
                </Link>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-[#8fa6c5]">
              Arcade points are game scores. They are not tokens, cash,
              investment returns, or a promise of monetary rewards.
            </p>
          </section>

          <section id="roadmap" className="scroll-mt-28">
            <SectionTitle number="08" eyebrow="ROADMAP" title="Fresh Out of the Oven." />
            <p className="mb-7 leading-8 text-[#b8c6dc]">
              BASECUIT&apos;s roadmap is presented as a broad project direction.
              Timing and delivery may change as development progresses.
            </p>
            <div className="space-y-4">
              {[
                ["FIRST BATCH", "The Beginning", "Introduce BASECUIT and build the community."],
                ["MORE FLAVOR", "Community Growth", "Expand the culture, creativity, and community."],
                ["BIGGER BATCH", "The Next Chapter", "Explore more ideas and new experiences for the ecosystem."],
              ].map(([phase, title, description], index) => (
                <div key={phase} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                  <span className="text-xs font-black tracking-widest text-[#ffe18a]">
                    PHASE 0{index + 1} / {phase}
                  </span>
                  <h3 className="mt-3 text-xl font-black">{title}</h3>
                  <p className="mt-2 leading-7 text-[#b8c6dc]">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="disclaimer" className="scroll-mt-28">
            <SectionTitle number="09" eyebrow="RISKS & DISCLAIMER" title="Know Before You Participate." />
            <div className="space-y-5 text-sm leading-8 text-[#aebed3]">
              <p>
                <strong className="text-white">Informational purpose.</strong>{" "}
                This whitepaper describes the BASECUIT project concept and
                current development direction. It is not financial, investment,
                legal, or tax advice, and should not be treated as an offer
                or solicitation to buy any asset.
              </p>
              <p>
                <strong className="text-white">Meme coin risks.</strong>{" "}
                Digital assets and meme coins can be highly volatile.
                Participants may lose some or all of the value they commit.
                There is no guarantee of liquidity, market value, adoption,
                or future performance.
              </p>
              <p>
                <strong className="text-white">Development uncertainty.</strong>{" "}
                Features, partnerships, token parameters, staking mechanisms,
                and roadmap plans may change, be delayed, or never be delivered.
              </p>
              <p>
                <strong className="text-white">Independent responsibility.</strong>{" "}
                Users should conduct their own research, verify official
                contract information before interacting with a token, and
                understand the risks of blockchain transactions and smart
                contracts.
              </p>
              <p>
                <strong className="text-white">No guaranteed returns.</strong>{" "}
                BASECUIT does not promise profits, token appreciation,
                staking yields, or financial rewards.
              </p>
            </div>
          </section>

          <div className="rounded-3xl border border-[#ffe18a40] bg-gradient-to-br from-[#15385d] to-[#0c2442] p-8 text-center md:p-12">
            <span className="text-5xl">🍪</span>
            <h2 className="mt-5 text-3xl font-black">THE BASECUIT SPIRIT.</h2>
            <p className="mx-auto mt-4 max-w-xl leading-8 text-[#b8c6dc]">
              Cookies, memes, and community. Be part of the journey and help
              shape what comes next.
            </p>
            <Link
              href="/"
              className="mt-7 inline-block rounded-xl bg-[#ffe18a] px-7 py-4 text-sm font-black text-[#12264a] transition hover:-translate-y-1"
            >
              BACK TO BASECUIT ↗
            </Link>
          </div>
        </article>
      </div>

      <footer className="border-t border-[#4385ff30] bg-[#06152a] px-5 py-10 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="BASECUIT" width={34} height={34} />
            <span className="font-black">BASECUIT</span>
          </Link>
          <span className="text-xs font-bold tracking-widest text-[#8fa6c5]">
            BUILT ON BASE. BAKED FOR FUN. ✳
          </span>
          <span className="text-xs text-[#7186a3]">© 2026 BASECUIT</span>
        </div>
      </footer>
    </main>
  );
}
