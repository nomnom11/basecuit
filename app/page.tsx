
import Image from "next/image";

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
          <a href="#tokenomics">Tokenomics</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#community">Community</a>
        </div>

        <a href="#community" className="nav-button">
          Join Community ↗
        </a>
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
          BASECUIT is bringing a fresh batch of fun to the Base ecosystem.
          Built around community, creativity, and the power of meme culture.
          This is where good vibes meet the blockchain.
        </p>
      </section>

      <section id="tokenomics" className="content-section alternate">
        <div className="section-tag">02 — TOKENOMICS</div>
        <h2>THE RECIPE.</h2>
        <p>
          Every great cookie starts with a recipe. Official token details
          will be announced here.
        </p>
        <div className="token-card">
          <span>TOKEN NAME</span>
          <strong>BASECUIT</strong>
          <span>NETWORK</span>
          <strong>BASE</strong>
          <span>CONTRACT ADDRESS</span>
          <strong className="pending">COMING SOON</strong>
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
