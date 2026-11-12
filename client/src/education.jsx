import { useEffect, useState } from "react";
import { apiRequest } from "./api";

export default function Education() {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/api/qualifications")
      .then(setQualifications)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  return <section className="page-pad inner-page">
    <div className="page-intro">
      <p className="eyebrow">The foundations</p>
      <h1>Always learning, <em>always curious.</em></h1>
      <p className="lede">A mix of formal training and hands-on practice has shaped how I approach my work.</p>
    </div>
    {loading && <p className="form-note">Loading qualifications...</p>}
    {error && <p className="form-error" role="alert">{error}</p>}
    {!loading && !error && qualifications.length === 0 && <p className="form-note">No qualifications published yet.</p>}
    <div className="timeline">
      {qualifications.map((qualification) => (
        <article key={qualification._id}>
          <span className="timeline-year">{new Date(qualification.completionDate).getFullYear() || "Forever"}</span>

          <div>
            <h2>{qualification.title}{" - "}{qualification.cred || ""}</h2>
            <p className="muted">{qualification.type}</p>
            <p>{qualification.description}</p>
            
          </div>
        </article>
      ))}
    </div>
  </section>;
}
