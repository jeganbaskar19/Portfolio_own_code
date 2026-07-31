import { useState } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../../data';
import { backgrounds } from '../../config/backgrounds';
import SectionHeading from '../shared/SectionHeading';
import Reveal from '../shared/Reveal';
import './Projects.css';

function Projects() {
  const [active, setActive] = useState('All');
  const bgStyle = backgrounds.projects ? { backgroundImage: `url(${backgrounds.projects})` } : undefined;

  const visible =
    active === 'All' ? projects.items : projects.items.filter((p) => p.category.includes(active));

  return (
    <section id="projects" className="section section--paper projects" style={bgStyle}>
      <div className="section__scrim" />
      <div className="container section__inner">
        <SectionHeading eyebrow={projects.eyebrow} title={projects.title} />

        <div className="projects__filters">
          {projects.filters.map((f) => (
            <button
              key={f}
              className={`projects__filter ${active === f ? 'projects__filter--active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {visible.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="projects__card">
              <div className="projects__card-top">
                <span className="projects__index">{String(i + 1).padStart(2, '0')}</span>
              </div>

              <h3 className="projects__title">{p.title}</h3>
              <p className="projects__desc">{p.description}</p>

              <ul className="projects__features">
                {p.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>

              <div className="projects__stack">
                {p.stack.map((s) => (
                  <span key={s} className="projects__stack-item">
                    {s}
                  </span>
                ))}
              </div>

              <div className="projects__actions">
                {p.liveUrl ? (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="projects__action">
                    <FiExternalLink size={15} /> Live Demo
                  </a>
                ) : (
                  <span className="projects__action projects__action--disabled" title="Add liveUrl in data.js">
                    <FiExternalLink size={15} /> Live Demo
                  </span>
                )}
                {p.githubUrl ? (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="projects__action">
                    <FiGithub size={15} /> Code
                  </a>
                ) : (
                  <span className="projects__action projects__action--disabled" title="Add githubUrl in data.js">
                    <FiGithub size={15} /> Code
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
