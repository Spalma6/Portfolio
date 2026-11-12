import { useState } from "react";
import { apiRequest } from "./api";

const initialForm = { firstName: "", lastName: "", phone: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    if (Object.values(form).some((value) => !value.trim())) {
      setStatus({ type: "error", message: "Please complete every field." });
      return;
    }

    setSending(true);
    try {
      await apiRequest("/api/contacts", { method: "POST", body: JSON.stringify(form) });
      setForm(initialForm);
      setStatus({ type: "success", message: "Thanks — your message was sent successfully." });
    } catch (requestError) {
      setStatus({ type: "error", message: requestError.message });
    } finally {
      setSending(false);
    }
  };

  return <section className="page-pad inner-page contact-page">
    <div className="contact-layout">
      <div className="page-intro">
        <p className="eyebrow">Start a conversation</p>
        <h1>Let’s make something <em>meaningful.</em></h1>
        <p className="lede">Have an idea, a question, or just want to say hello? My inbox is always open.</p>
        <div className="contact-details"><a href="mailto:spalma6@my.centennialcollege.ca">spalma6@my.centennialcollege.ca ↗</a><span>Toronto, Canada · EST</span></div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label>First name<input required name="firstName" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} /></label>
          <label>Last name<input required name="lastName" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} /></label>
        </div>
        <label>Contact number<input required name="phone" type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
        <label>Email address<input required name="email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
        <label>How can I help?<textarea required name="message" rows="4" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /></label>
        {status.message && <p className={status.type === "error" ? "form-error" : "form-success"} role={status.type === "error" ? "alert" : "status"}>{status.message}</p>}
        <button className="button button-dark" disabled={sending} type="submit">{sending ? "Sending..." : "Send message ↗"}</button>
      </form>
    </div>
  </section>;
}
