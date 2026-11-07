
import Image from "next/image";
import TokenInfo from "./components/TokenInfo";

const socials = [
  { name: "Twitter / X", href: "https://x.com/nix_Bitcoin" },
  { name: "Telegram", href: "#" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="navbar">
        <a href="#" className="brand">
          <Image
            src="/logo.png"
            alt="BASECUIT Logo"
            width={48}
            height={48}
            priority
          />
          <span>BASECUIT</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
            <a href="/whitepaper">Whitepaper</a>
          <a href="#tokenomics">Tokenomics</a>
          <a href="#staking">Staking</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#community">Community</a>
          <a href="/whitepaper">Whitepaper</a>
        <a href="/memes">Meme Hub</a>
          <a href="/leaderboard">Leaderboard</a>
          <a href="/game">Play Game</a>
          <a href="/player">Player Profile</a>
        </div>

        <a href="#community" className="nav-button">
          Join Community ↗
        </a>

        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">
            <span></span><span></span><span></span>
          </summary>
          <div className="mobile-menu-panel">
            <a href="#about">About</a>
            <a href="/whitepaper">Whitepaper</a>
            <a href="#tokenomics">Tokenomics</a>
            <a href="#staking">Staking</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#community">Community</a>
            <a href="/memes">Meme Hub</a>
            <a href="/leaderboard">Leaderboard</a>
            <a href="/game">Play Game</a>
            <a href="/player">Player Profile</a>
            <a href="#community">Join Community ↗</a>
          </div>
        </details>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="live-dot" />
            BUILT ON BASE ECOSYSTEM
          </div>

          <h1>
            LIFE IS BETTER
            <br />
            WITH A LITTLE
            <br />
            <span>BASECUIT.</span>
          </h1>

          <p className="hero-description">
            A little cookie. A lot of character.
            Bringing playful energy to the Base ecosystem.
          </p>

          <div className="hero-actions">
            <a href="#about" className="primary-button">
              Discover BASECUIT ↗
            </a>
            <a href="#community" className="secondary-button">
              Join the Community
            </a>
          </div>

          <div className="hero-note">
            <span>✳</span> MADE FOR THE CULTURE. BUILT ON BASE.
          </div>
        </div>

        <div className="hero-art">
          <div className="art-circle" />
          <div className="cookie-particles" aria-hidden="true">
            <span className="cookie-particle particle-one">🍪</span>
            <span className="cookie-particle particle-two">🍪</span>
            <span className="cookie-particle particle-three">🍪</span>
            <span className="cookie-particle particle-four">🍪</span>
            <span className="cookie-particle particle-five">✦</span>
          </div>
          <div className="floating-label label-top">100% COOKIE ENERGY</div>
          <div className="logo-card">
            <Image
              src="/logo.png"
              alt="BASECUIT Official Artwork"
              width={460}
              height={460}
              priority
              className="hero-logo"
            />
          </div>
          <div className="floating-label label-bottom">
            GOOD VIBES ONLY ✳
          </div>
          <div className="sparkle sparkle-one">✳</div>
          <div className="sparkle sparkle-two">✦</div>
        </div>

        <div className="hero-index">01 / THE COOKIE REVOLUTION</div>
      </section>

      <section className="ticker">
        <div className="ticker-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              BASECUIT ✳ BUILT ON BASE ✳ GOOD VIBES ONLY ✳
              COOKIE CULTURE ✳ BASECUIT ✳ BUILT ON BASE ✳
            </span>
          ))}
        </div>
      </section>

      <section id="about" className="content-section">
        <div className="section-tag">01 — ABOUT BASECUIT</div>
        <h2>
          NOT JUST A COOKIE.
          <br />
          <span>A WHOLE CULTURE.</span>
        </h2>
        <p>
          BASECUIT is a meme coin project built on the Base blockchain,
          inspired by the fun and creativity of cookie culture.
          More than just a token, BASECUIT brings together memes,
          creativity, and community spirit. Our vision is to create
          a fun identity within the Base ecosystem where people can
          connect, share ideas, and enjoy the journey together.
          Cookies, memes, and community — the BASECUIT spirit.
        </p>
      </section>

      <section id="tokenomics" className="content-section alternate">
        <div className="section-tag">02 — TOKENOMICS</div>
        <h2>THE RECIPE.</h2>
        <p>
          Every great cookie starts with a recipe. Official token details
          will be announced here.
        </p>
        <TokenInfo />
      </section>

      <section id="staking" className="content-section alternate">
        <div className="section-tag">03 — BASECUIT STAKING</div>
        <h2>
          STAKE YOUR BASECUIT.
          <br />
          <span>REWARDS ARE BAKING.</span>
        </h2>
        <p>
          A new way to be part of the BASECUIT ecosystem.
          Staking features and reward details are currently in development.
        </p>

        <div className="roadmap-grid staking-grid">
          <div className="roadmap-card staking-card">
            <span>PROTOCOL FEES</span>
            <h3>Transaction Rewards</h3>
            <p>Potential rewards from eligible protocol transaction fees.</p>
          </div>
          <div className="roadmap-card staking-card">
            <span>PARTNER REWARDS</span>
            <h3>Ecosystem Bonuses</h3>
            <p>Potential bonus tokens from future ecosystem partners.</p>
          </div>
          <div className="roadmap-card staking-card">
            <span>STAKING BONUS</span>
            <h3>Additional Rewards</h3>
            <p>Additional BASECUIT rewards planned for the staking program.</p>
          </div>
        </div>

        <div className="staking-status">
          <span className="live-dot" />
          STAKING — COMING SOON
        </div>
      </section>

      <section id="roadmap" className="content-section">
        <div className="section-tag">03 — THE ROADMAP</div>
        <h2>FRESH OUT OF THE OVEN.</h2>
        <div className="roadmap-grid">
          <div className="roadmap-card">
            <span>01 / FIRST BATCH</span>
            <h3>The Beginning</h3>
            <p>Introduce BASECUIT and build the community.</p>
          </div>
          <div className="roadmap-card">
            <span>02 / MORE FLAVOR</span>
            <h3>Community Growth</h3>
            <p>Expand the culture, creativity, and community.</p>
          </div>
          <div className="roadmap-card">
            <span>03 / BIGGER BATCH</span>
            <h3>The Next Chapter</h3>
            <p>More ideas and new experiences for the ecosystem.</p>
          </div>
        </div>
      </section>

      <section id="arcade" className="content-section alternate">
        <div className="section-tag">04 — THE BASECUIT ARCADE</div>
        <h2>PLAY. EARN. CLIMB THE RANKS.</h2>
        <p className="section-description">
          Take a break, click some cookies, and compete with the BASECUIT community.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#ffe18a]/30 bg-[#102b50] p-8 text-center shadow-xl">
            <div className="text-6xl">🍪</div>
            <h3 className="mt-5 text-2xl font-black">COOKIE CLICKER</h3>
            <p className="mt-3 text-sm text-[#a9b9d1]">
              Click cookies, collect points, unlock upgrades, and build your score.
            </p>
            <a href="/game" className="mt-7 inline-block rounded-xl bg-[#ffe18a] px-7 py-3 font-black text-[#12264a] transition hover:-translate-y-1">
              PLAY NOW ↗
            </a>
          </div>

          <div className="rounded-3xl border border-[#ffe18a]/30 bg-[#102b50] p-8 text-center shadow-xl">
            <div className="text-6xl">🏆</div>
            <h3 className="mt-5 text-2xl font-black">GLOBAL LEADERBOARD</h3>
            <p className="mt-3 text-sm text-[#a9b9d1]">
              See the top players and find your place in the BASECUIT rankings.
            </p>
            <a href="/leaderboard" className="mt-7 inline-block rounded-xl bg-[#ffe18a] px-7 py-3 font-black text-[#12264a] transition hover:-translate-y-1">
              VIEW RANKINGS ↗
            </a>
          </div>
        </div>
      </section>

      <section id="community" className="community-section">
        <div className="section-tag">04 — JOIN THE COMMUNITY</div>
        <h2>GOOD THINGS ARE BAKING.</h2>
        <p>Be part of the BASECUIT journey.</p>
        <div className="hero-actions">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="primary-button"
            >
              {social.name} ↗
            </a>
          ))}
        </div>
      </section>

      <footer className="footer">
        <a href="#" className="brand">
          <Image
            src="/logo.png"
            alt="BASECUIT"
            width={36}
            height={36}
          />
          <span>BASECUIT</span>
        </a>
        <span>BUILT ON BASE. BAKED FOR FUN. ✳</span>
        <span>© 2026 BASECUIT</span>
      </footer>
    </main>
  );
}
