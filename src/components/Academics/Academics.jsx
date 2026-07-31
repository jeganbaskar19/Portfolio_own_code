import { academics } from '../../data';
import { backgrounds } from '../../config/backgrounds';
import SectionHeading from '../shared/SectionHeading';
import Reveal from '../shared/Reveal';
import './Academics.css';

function Academics() {
  const bgStyle = backgrounds.academics ? { backgroundImage: `url(${backgrounds.academics})` } : undefined;

  return (
    <section id="academics" className="section section--ink academics" style={bgStyle}>
      <div className="section__scrim" />
      <div className="container section__inner">
        <SectionHeading eyebrow={academics.eyebrow} title={academics.title} />

        <div className="academics__list">
          {academics.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1} className="academics__card">
              <div className="academics__top">
                <h3 className="academics__degree">{item.degree}</h3>
                <span className="academics__duration">{item.duration}</span>
              </div>
              <p className="academics__college">{item.college}</p>

              <div className="academics__meta">
                <span className="academics__cgpa">Score: {item.cgpa}</span>
              </div>

              {item.subjects.length > 0 && (
                <div className="academics__subjects">
                  {item.subjects.map((s) => (
                    <span key={s} className="academics__subject">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Academics;
