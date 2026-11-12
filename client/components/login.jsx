import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/useAuth";

const initialForm = { email: "", password: "" };

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.email.trim() || !form.password) {
      setError("Email and password are required.");
      return;
    }

    setSaving(true);
    try {
      await signIn(form);
      navigate("/admin");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="page-pad inner-page auth-page">
      <div className="page-intro">
        <p className="eyebrow">Welcome back</p>
        <h1>Sign <em>in.</em></h1>
      </div>
      <form className="resource-form auth-form" onSubmit={handleSubmit} noValidate>
        <label>Email<input type="email" name="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
        <label>Password<input type="password" name="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-dark" disabled={saving} type="submit">{saving ? "Signing in..." : "Sign in ↗"}</button>
        <p className="form-note">Need an account? <Link to="/signup">Sign up</Link></p>
      </form>
    </section>
  );
}
