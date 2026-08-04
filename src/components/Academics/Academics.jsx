import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiBookOpen } from 'react-icons/fi';
import { academics } from '../../data';
import { backgrounds } from '../../config/backgrounds';
import SectionHeading from '../shared/SectionHeading';
import Reveal from '../shared/Reveal';
import './Academics.css';

function Academics() {
  const bgStyle = backgrounds.academics ? { backgroundImage: `url(${backgrounds.academics})` } : undefined;

  const [active, setActive] = useState(0);
  const item = academics.items[active];

  return (
    <section id="academics" className="section section--ink academics" style={bgStyle}>
      <div className="section__scrim" />
      <div className="container section__inner">
        <SectionHeading eyebrow={academics.eyebrow} title={academics.title} />

        <Reveal className="academics__layout">
          {/* Left: institution tabs */}
          <div className="academics__tabs" role="tablist" aria-label="Education">
            {academics.items.map((a, i) => {
              const isActive = i === active;
              return (
                <button
                  key={a.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`academics__tab ${isActive ? 'academics__tab--active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="academics-tab-indicator"
                      className="academics__tab-indicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="academics__tab-college">{a.college}</span>
                  <span className="academics__tab-degree">{a.degree}</span>
                  <span className="academics__tab-duration">{a.duration}</span>
                </button>
              );
            })}
          </div>

          {/* Right: active education card */}
          <div className="academics__panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                className="academics__card"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="academics__card-head">
                  <div className="academics__degree-block">
                    <span className="academics__icon">
                      <FiBookOpen size={18} />
                    </span>
                    <div>
                      <h3 className="academics__degree">{item.degree}</h3>
                      <p className="academics__college">{item.college}</p>
                    </div>
                  </div>
                  <span className="academics__duration">{item.duration}</span>
                </div>

                <div className="academics__meta">
                  <span className="academics__cgpa">Score: {item.cgpa}</span>
                </div>

                {item.subjects?.length > 0 && (
                  <div className="academics__subjects">
                    {item.subjects.map((s) => (
                      <span key={s} className="academics__subject">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {item.awards?.length > 0 && (
                  <ul className="academics__awards">
                    {item.awards.map((award, idx) => (
                      <li key={idx}>{award}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Academics;
