const services = [
  ["01", "Problem analysis", "I break down complex technical and business problems, identify root causes, and turn ambiguity into a clear path forward."],
  ["02", "Software engineering", "I build reliable, maintainable software with a focus on clean architecture, thoughtful implementation, and solutions that can grow with your needs."],
  ["03", "Technical communication", "I communicate ideas clearly across technical and non-technical teams through documentation, presentations, collaboration, and knowledge sharing."],
  ["04", "Technical consultation", "I provide practical guidance on technology choices, development workflows, system improvements, and the trade-offs behind each solution."],
];

export default function Services() {
  return <section className="page-pad inner-page services-page"><div className="page-intro"><p className="eyebrow">How I can help</p><h1>Turning complex problems into <em>better software.</em></h1><p className="lede">I help teams understand technical challenges, communicate effectively, and build practical solutions that create lasting value.</p></div><div className="services-list">{services.map(([number, title, description]) => <article key={number}><span>{number}</span><h2>{title}</h2><p>{description}</p><span className="service-arrow">↗</span></article>)}</div></section>;
}
