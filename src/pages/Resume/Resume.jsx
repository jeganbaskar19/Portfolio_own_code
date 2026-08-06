import { Link } from 'react-router-dom';
import {
  personal,
  experience,
  internships,
  academics,
  technicalSkills,
  certifications,
  contact,
  navigation
} from '../../data';
import './Resume.css';

function Resume() {
  const categories = [
    'Programming Languages',
    'Frontend',
    'Backend',
    'Database',
    'Tools',
    'Concepts'
  ];

  const skillGroups = categories
    .map((cat) => ({
      label: cat,
      items: (technicalSkills || [])
        .filter((s) => s.category === cat)
        .map((s) => s.name)
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="resume-page">
      <div className="resume-page__container">
        <div className="resume-page__topbar">
          <Link to="/" className="resume-page__back">
            ← {personal.name}
          </Link>
          <a className="resume-page__download" href={personal.resumeUrl} download>
            Download PDF
          </a>
        </div>

        <header className="resume-page__header">
          <h1 className="resume-page__name">{personal.name}</h1>
          <p className="resume-page__meta">
            {contact.email} · {personal.location} · {contact.phone}
          </p>
          <p className="resume-page__summary">{personal.shortDescription}</p>
        </header>

        <section className="resume-page__section">
          <h2 className="resume-page__heading">Experience</h2>
          <hr className="resume-page__rule" />

          {experience.items.map((item) => (
            <article key={item.id} className="resume-page__entry">
              <p className="resume-page__entry-title">
                <span className="resume-page__entry-org">{item.company}</span>
                <span className="resume-page__entry-sep">|</span>
                {item.role}
              </p>
              <p className="resume-page__entry-meta">
                {item.duration} · {item.location}
              </p>
              <p className="resume-page__entry-stack">{item.technologies.join(', ')}</p>
              <ul className="resume-page__list">
                {item.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </article>
          ))}

          {internships.items.map((item) => (
            <article key={item.id} className="resume-page__entry">
              <p className="resume-page__entry-title">
                <span className="resume-page__entry-org">{item.company}</span>
                <span className="resume-page__entry-sep">|</span>
                {item.role}
              </p>
              <p className="resume-page__entry-meta">{item.duration}</p>
              <p className="resume-page__entry-stack">{item.skills.join(', ')}</p>
              <p className="resume-page__entry-desc">{item.description}</p>
            </article>
          ))}
        </section>

        <section className="resume-page__section">
          <h2 className="resume-page__heading">Education</h2>
          <hr className="resume-page__rule" />
          {academics.items.map((a) => (
            <p key={a.id} className="resume-page__education-line">
              <strong>{a.college}</strong>: {a.degree} ({a.duration.split('—')[1]?.trim() || a.duration}) · Score:{' '}
              {a.cgpa}
            </p>
          ))}
        </section>

        <section className="resume-page__section">
          <h2 className="resume-page__heading">Certifications</h2>
          <hr className="resume-page__rule" />
          <p className="resume-page__education-line">
            {certifications.items.map((c) => `${c.title} (${c.issuer}, ${c.year})`).join(' · ')}
          </p>
        </section>

        <section className="resume-page__section">
          <h2 className="resume-page__heading">Skills</h2>
          <hr className="resume-page__rule" />
          {skillGroups.map((g) => (
            <p key={g.label} className="resume-page__skill-line">
              <strong>{g.label}:</strong> {g.items.join(' · ')}
            </p>
          ))}
        </section>

        <footer className="resume-page__footer">
          {navigation.map((n, i) => (
            <span key={n.id}>
              <Link to={`/${n.href}`}>{n.label}</Link>
              {i < navigation.length - 1 && <span className="resume-page__footer-sep">·</span>}
            </span>
          ))}
        </footer>
      </div>
    </div>
  );
}

export default Resume;
