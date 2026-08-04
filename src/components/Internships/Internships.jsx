import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';
import { internships } from '../../data';
import { backgrounds } from '../../config/backgrounds';
import SectionHeading from '../shared/SectionHeading';
import Reveal from '../shared/Reveal';
import './Internships.css';

function Internships() {
  const bgStyle = backgrounds.internships
    ? { backgroundImage: `url(${backgrounds.internships})` }
    : undefined;

  const [active, setActive] = useState(0);
  const item = internships.items[active];

  return (
    <section id="internships" className="section section--paper internships" style={bgStyle}>
      <div className="section__scrim" />
      <div className="container section__inner">
        <SectionHeading eyebrow={internships.eyebrow} title={internships.title} />

        <Reveal className="internships__layout">
          {/* Left: company tabs */}
          <div className="internships__tabs" role="tablist" aria-label="Internships">
            {internships.items.map((intern, i) => {
              const isActive = i === active;
              return (
                <button
                  key={intern.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`internships__tab ${isActive ? 'internships__tab--active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="internships-tab-indicator"
                      className="internships__tab-indicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="internships__tab-company">{intern.company}</span>
                  <span className="internships__tab-role">{intern.role}</span>
                  <span className="internships__tab-duration">{intern.duration}</span>
                </button>
              );
            })}
          </div>

          {/* Right: active internship card */}
          <div className="internships__panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                className="internships__card"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="internships__card-head">
                  <div className="internships__role-block">
                    <span className="internships__icon">
                      <FiBriefcase size={18} />
                    </span>
                    <div>
                      <h3 className="internships__role">{item.role}</h3>
                      <p className="internships__company-line">{item.company}</p>
                    </div>
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
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Internships;
