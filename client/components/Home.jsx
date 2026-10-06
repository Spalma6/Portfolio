import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero page-pad">
        <div className="hero-copy">
          <p className="eyebrow">Independent designer & developer</p>
          <h1>I make digital experiences <em>feel human.</em></h1>
          <p className="hero-intro">I’m Scott Palma, a fullstack developer focused on thoughtful interfaces, clear systems, and products that make a difference.</p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/project">View my work <span>↗</span></Link>
            <Link className="text-link" to="/about">More about me <span>↗</span></Link>
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract illustration">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="sun" />
          <div className="hero-note">Based in Toronto<br />Working worldwide</div>
          <span className="hero-star">✳</span>
        </div>
      </section>
      <section className="trusted page-pad">
        <p className="eyebrow">Selected collaborators</p>
        <div className="logo-row"><span>northstar</span><span>arc<span className="logo-spark">✦</span>form</span><span>mosaic</span><span>PALETTE</span><span>fifth&co</span></div>
      </section>
      <section className="home-feature page-pad">
        <div className="section-heading"><p className="eyebrow">What I bring</p><h2>Good work sits at the intersection of <em>curiosity</em> and care.</h2></div>
        <div className="feature-list">
          <div><span>01</span><h3>Strategy first</h3><p>Before pixels, I ask the right questions. Every project starts with a shared understanding of the people we're designing for.</p></div>
          <div><span>02</span><h3>Details matter</h3><p>From interaction states to the final line of CSS, the small decisions add up to experiences people enjoy using.</p></div>
          <div><span>03</span><h3>Built to last</h3><p>Clean, accessible code and flexible systems give your product room to grow long after launch day.</p></div>
        </div>
      </section>
    </>
  );
}
