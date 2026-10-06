import { Link } from "react-router-dom";

export default function About() {
  return <section className="page-pad inner-page">
    <div className="page-intro">
      <p className="eyebrow">A little context</p>
      <h1>Nice to meet you, <em>I’m Scott.</em></h1>
      <p className="lede">I’m a fullstack developer who loves turning complex problems into clear, inviting experiences.</p></div>
    <div className="about-grid">
      <div className="portrait-wrap">
        <img src="meow.jpg" alt="Scott smiling in a bright studio" />
        <span className="portrait-caption">Hello, from my studio ↗</span>
        </div>
      <div className="about-copy">
        <p>For the last 6+ years, I’ve partnered with founders and teams to bring thoughtful digital products to life. I care about the space where design, technology, and language meet.</p>
        <p>When I’m not at my desk, you’ll find me hunting down a great coffee, collecting print magazines, or planning my next hiking trip.</p>
        <p>I’m also a passionate advocate for accessible design and sustainable development practices.</p>
        <a className="button button-outline" href="/resume.pdf" target="_blank" rel="noreferrer">Download my résumé <span>↓</span></a>
        <p className="about-note">Available for select projects</p>
        <p className="about-note">Open to new opportunities</p>
        <div className="about-facts"><span>Toronto, Canada</span>
        <span>Available for select projects</span></div></div>
    </div>
    <div className="page-cta">
      <p>Have a project in mind?</p>
      <Link to="/contact">Let’s make it happen <span>↗</span></Link></div>
  </section>;
}
