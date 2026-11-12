import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/useAuth";

const initialForm = { name: "", email: "", password: "" };

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || form.password.length < 6) {
      setError("Name and email are required; password must be at least 6 characters.");
      return;
    }

    setSaving(true);
    try {
      await signUp(form);
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
        <p className="eyebrow">Create access</p>
        <h1>Sign <em>up.</em></h1>
      </div>
      <form className="resource-form auth-form" onSubmit={handleSubmit} noValidate>
        <label>Name<input name="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
        <label>Email<input type="email" name="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
        <label>Password<input type="password" name="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-dark" disabled={saving} type="submit">{saving ? "Creating account..." : "Create account ↗"}</button>
        <p className="form-note">Already registered? <Link to="/signin">Sign in</Link></p>
      </form>
    </section>
  );
}
