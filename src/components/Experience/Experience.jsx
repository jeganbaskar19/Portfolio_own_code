import { memo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiBriefcase, FiMapPin } from 'react-icons/fi';
import { experience } from '../../data';
import { backgrounds } from '../../config/backgrounds';
import SectionHeading from '../shared/SectionHeading';
import Reveal from '../shared/Reveal';
import './Experience.css';

function Experience() {
  const bgStyle = backgrounds.experience
    ? { backgroundImage: `url(${backgrounds.experience})` }
    : undefined;

  const [active, setActive] = useState(0);
  const item = experience.items[active];
  const isCurrent = /present/i.test(item.duration);

  return (
    <section id="experience" className="section section--ink experience" style={bgStyle}>
      <div className="section__scrim" />
      <div className="container section__inner">
        <SectionHeading eyebrow={experience.eyebrow} title={experience.title} />

        <Reveal className="experience__layout">
          {/* Left: company tabs */}
          <div className="experience__tabs" role="tablist" aria-label="Work experience">
            {experience.items.map((exp, i) => {
              const isActive = i === active;
              return (
                <button
                  key={exp.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`experience__tab ${isActive ? 'experience__tab--active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="experience-tab-indicator"
                      className="experience__tab-indicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="experience__tab-company">{exp.company}</span>
                  <span className="experience__tab-role">{exp.role}</span>
                  <span className="experience__tab-duration">{exp.duration}</span>
                </button>
              );
            })}
          </div>

          {/* Right: active experience card */}
          <div className="experience__panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                className="experience__card"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="experience__card-head">
                  <div className="experience__role-block">
                    <span className="experience__icon">
                      <FiBriefcase size={18} />
                    </span>
                    <div>
                      <h3 className="experience__role">{item.role}</h3>
                      <p className="experience__company-line">
                        {item.company}
                        <span className="experience__dot-sep">·</span>
                        <FiMapPin size={12} /> {item.location}
                      </p>
                    </div>
                  </div>
                  <span className="experience__duration">
                    {isCurrent && <span className="experience__pulse" />}
                    {item.duration}
                  </span>
                </div>

                <p className="experience__desc">{item.description}</p>

                <ul className="experience__list">
                  {item.responsibilities.map((r, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.08 + idx * 0.05 }}
                    >
                      <span className="experience__diff experience__diff--add">+</span>
                      {r}
                    </motion.li>
                  ))}
                </ul>

                <div className="experience__tags">
                  {item.technologies.map((t) => (
                    <span key={t} className="experience__tag">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default memo(Experience);
