import { FiAward } from 'react-icons/fi';
import { certifications } from '../../data';
import { backgrounds } from '../../config/backgrounds';
import SectionHeading from '../shared/SectionHeading';
import Reveal from '../shared/Reveal';
import './Certifications.css';

function Certifications() {
  const bgStyle = backgrounds.certifications
    ? { backgroundImage: `url(${backgrounds.certifications})` }
    : undefined;

  return (
    <section id="certifications" className="section section--ink certifications" style={bgStyle}>
      <div className="section__scrim" />
      <div className="container section__inner">
        <SectionHeading eyebrow={certifications.eyebrow} title={certifications.title} />

        <div className="certifications__grid">
          {certifications.items.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08} className="certifications__card">
              <FiAward className="certifications__icon" size={22} />
              <h3 className="certifications__title">{c.title}</h3>
              <p className="certifications__meta">
                {c.issuer} · {c.year}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
