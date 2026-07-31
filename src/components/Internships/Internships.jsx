import { internships } from '../../data';
import { backgrounds } from '../../config/backgrounds';
import SectionHeading from '../shared/SectionHeading';
import Reveal from '../shared/Reveal';
import './Internships.css';

function Internships() {
  const bgStyle = backgrounds.internships
    ? { backgroundImage: `url(${backgrounds.internships})` }
    : undefined;

  return (
    <section id="internships" className="section section--paper internships" style={bgStyle}>
      <div className="section__scrim" />
      <div className="container section__inner">
        <SectionHeading eyebrow={internships.eyebrow} title={internships.title} />

        <div className="internships__grid">
          {internships.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1} className="internships__card">
              <div className="internships__card-head">
                <div>
                  <h3 className="internships__role">{item.role}</h3>
                  <p className="internships__company">{item.company}</p>
                </div>
                <span className="internships__duration">{item.duration}</span>
              </div>

              <p className="internships__desc">{item.description}</p>

              <div className="internships__skills">
                {item.skills.map((s) => (
                  <span key={s} className="internships__skill">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Internships;
