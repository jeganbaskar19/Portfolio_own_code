import { useCallback, useEffect, useRef, useState } from 'react';
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { projects } from '../../data';
import { backgrounds } from '../../config/backgrounds';
import SectionHeading from '../shared/SectionHeading';
import Reveal from '../shared/Reveal';
import './Projects.css';

function Projects() {
  const [active, setActive] = useState('All');
  const bgStyle = backgrounds.projects ? { backgroundImage: `url(${backgrounds.projects})` } : undefined;

  const visible = active === 'All' ? projects.items : projects.items.filter((p) => p.category.includes(active));

  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeCard, setActiveCard] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  cardRefs.current = [];
  const registerCard = (el) => {
    if (el) cardRefs.current.push(el);
  };

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 8);

    // figure out which card is closest to the left edge, for the dots
    const cards = cardRefs.current;
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - track.scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveCard(closest);
  }, []);

  useEffect(() => {
    updateArrows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible.length]);

  const scrollToCard = (i) => {
    const card = cardRefs.current[i];
    const track = trackRef.current;
    if (!card || !track) return;
    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  };

  const scrollByOne = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = cardRefs.current[0]?.offsetWidth || 300;
    const gap = 16;
    track.scrollBy({ left: dir * (cardWidth + gap), behavior: 'smooth' });
  };

  return (
    <section id="projects" className="section section--paper projects" style={bgStyle}>
      <div className="section__scrim" />
      <div className="container section__inner">
        <SectionHeading eyebrow={projects.eyebrow} title={projects.title} />

        <div className="projects__toolbar">
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

          <div className="projects__nav">
            <button
              className="projects__nav-btn"
              onClick={() => scrollByOne(-1)}
              disabled={!canPrev}
              aria-label="Previous project"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              className="projects__nav-btn"
              onClick={() => scrollByOne(1)}
              disabled={!canNext}
              aria-label="Next project"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        <Reveal className="projects__viewport">
          <div className="projects__track" ref={trackRef} onScroll={updateArrows}>
            {visible.map((p, i) => (
              <article className="projects__card" key={p.id} ref={registerCard}>
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
              </article>
            ))}
          </div>
        </Reveal>

        {visible.length > 1 && (
          <div className="projects__dots">
            {visible.map((p, i) => (
              <button
                key={p.id}
                className={`projects__dot ${i === activeCard ? 'projects__dot--active' : ''}`}
                onClick={() => scrollToCard(i)}
                aria-label={`Go to ${p.title}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;