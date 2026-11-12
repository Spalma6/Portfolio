import { useEffect, useState } from "react";
import { apiRequest } from "./api";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/api/projects")
      .then(setProjects)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  return <section className="page-pad inner-page">
    <div className="page-intro project-intro">
      <p className="eyebrow">Selected work</p>
      <h1>A few things I’ve <em>helped make.</em></h1>
      <p className="lede">A selection of collaborations, experiments, and products built with good people.</p>
    </div>
    {loading && <p className="form-note">Loading projects...</p>}
    {error && <p className="form-error" role="alert">{error}</p>}
    {!loading && !error && projects.length === 0 && <p className="form-note">No projects published yet.</p>}
    <div className="project-grid">
      {projects.map((project, index) => (
        <article className={`project-card project-${(index % 3) + 1}`} key={project._id}>
          <div className="project-image"><img src={project.image} alt="" /><span className="project-number">0{index + 1}</span></div>
          <div className="project-meta">
            <p className="eyebrow">{project.completionDate ? new Date(project.completionDate).getFullYear() : "Project"}</p>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>
        </article>
      ))}
    </div>
  </section>;
}
