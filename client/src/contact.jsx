import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => { event.preventDefault(); setSubmitted(true); setTimeout(() => navigate("/"), 1400); };
  return <section className="page-pad inner-page contact-page">
    <div className="contact-layout">
      <div className="page-intro">
        <p className="eyebrow">Start a conversation</p>
        <h1>Let’s make something <em>meaningful.</em></h1>
        <p className="lede">Have an idea, a question, or just want to say hello? My inbox is always open.</p>
        <div className="contact-details"><a href="mailto:spalma6@my.centennialcollege.ca">spalma6@my.centennialcollege.ca ↗</a>
        <span>Toronto, Canada · EST</span></div></div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>First name<input required name="firstName" /></label>
            <label>Last name<input required name="lastName" /></label>
            </div><label>Contact number<input required name="phone" type="tel" /></label>
            <label>Email address<input required name="email" type="email" /></label>
            <label>How can I help?<textarea required name="message" rows="4" /></label>
            <button className="button button-dark" type="submit">{submitted ? "Thanks — taking you home..." : "Send message ↗"}</button></form></div></section>;
}
