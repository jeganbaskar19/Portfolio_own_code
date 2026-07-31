import { about } from '../../data';
import { backgrounds } from '../../config/backgrounds';
import SectionHeading from '../shared/SectionHeading';
import Reveal from '../shared/Reveal';
import './About.css';

function About() {
  const bgStyle = backgrounds.about ? { backgroundImage: `url(${backgrounds.about})` } : undefined;
  const techGroups = [
    { label: 'Frontend', items: about.technologies.frontend },
    { label: 'Backend', items: about.technologies.backend },
    { label: 'Database', items: about.technologies.database },
    { label: 'Tools', items: about.technologies.tools }
  ].filter((g) => g.items.length);

  return (
    <section id="about" className="section section--paper about" style={bgStyle}>
      <div className="section__scrim" />
      <div className="container section__inner about__inner">
        <SectionHeading eyebrow={about.eyebrow} title={about.title} description={about.intro} />

        <div className="about__grid">
          <div className="about__story">
            {about.story.map((para, i) => (
              <Reveal as="p" key={i} delay={i * 0.08} className="about__para">
                {para}
              </Reveal>
            ))}

            <Reveal className="about__tech" delay={0.2}>
              {techGroups.map((group) => (
                <div className="about__tech-group" key={group.label}>
                  <span className="about__tech-label">{group.label}</span>
                  <div className="about__tech-pills">
                    {group.items.map((t) => (
                      <span className="about__pill" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal className="about__highlights" delay={0.1}>
            {about.highlights.map((h) => (
              <div className="about__highlight" key={h.id}>
                <span className="about__highlight-label">{h.label}</span>
                <span className="about__highlight-value">{h.value}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
