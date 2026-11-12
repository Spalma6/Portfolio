import { Link } from "react-router-dom";
import { useAuth } from "../src/useAuth";

export default function Layout({ children }) {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Scott Palma home">
          <span className="brand-mark">SP</span>
          <span className="brand-name">Scott Palma<span className="brand-dot">.</span></span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/project">Projects</Link>
          <Link to="/education">Education</Link>
          <Link to="/services">Services</Link>
          {isAdmin && <Link to="/admin">Admin</Link>}
          {user ? <button className="nav-button" type="button" onClick={signOut}>Sign out</button> : <Link to="/signin">Sign in</Link>}
          <Link className="nav-contact" to="/contact">Let's talk <span>↗</span></Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <span>© 2026 Scott Palma</span>
        <span>Designing useful things for the web.</span>
        <Link to="/contact">Get in touch ↗</Link>
      </footer>
    </div>
  );
}
