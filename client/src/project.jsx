export default function Project() {
  const projects = [
    { title: "Semester 2 Project", type: "Database", image: "/ERD.png", role: "Lead designer & developer", outcome: "A well-structured database for managing student information." },
    { title: "2.5D Engine", type: "Personal project", image: "/2.5D.png", role: "Design partner", outcome: "A 2.5D engine for creating immersive experiences." },
    { title: "Map Generator", type: "Personal project", image: "/maps.png", role: "Product designer & developer", outcome: "A tool for generating interactive maps." },
  ];
  return <section className="page-pad inner-page">
    <div className="page-intro project-intro">
      <p className="eyebrow">Selected work</p>
      <h1>A few things I’ve <em>helped make.</em></h1>
      <p className="lede">A selection of collaborations, experiments, and products built with good people.</p></div>
      <div className="project-grid">{projects.map((project, index) => 
        <article className={`project-card project-${index + 1}`} key={project.title}>
          <div className="project-image"><img src={project.image} alt="" />
          <span className="project-number">0{index + 1}</span></div>
          <div className="project-meta">
            <p className="eyebrow">{project.type}</p>
          <h2>{project.title}</h2><p>{project.outcome}</p>
          <p className="muted">Built with {project.role}</p></div></article>)}</div></section>;
}
