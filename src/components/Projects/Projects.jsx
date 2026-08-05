import { useCallback, useEffect, useRef, useState } from 'react';
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight, FiRotateCw } from 'react-icons/fi';
import { projects } from '../../data';
import { backgrounds } from '../../config/backgrounds';
import SectionHeading from '../shared/SectionHeading';
import Reveal from '../shared/Reveal';
import './Projects.css';

function Projects() {
  const [active, setActive] = useState('All');
  const [flippedCards, setFlippedCards] = useState({});
  const bgStyle = backgrounds.projects ? { backgroundImage: `url(${backgrounds.projects})` } : undefined;

  const visible = active === 'All' ? projects.items : projects.items.filter((p) => p.category.includes(active));

  const isMarqueeMode = active === 'All';

  // Slider refs & controls for filtered manual navigation mode
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
    if (!isMarqueeMode) {
      updateArrows();
    }
  }, [visible.length, isMarqueeMode, updateArrows]);

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

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderCardContent = (p, displayIndex) => {
    const isFlipped = Boolean(flippedCards[p.id]);
    const previewList = p.images && p.images.length > 0 ? p.images : p.image ? [p.image] : ['/portfolio-preview.png'];

    return (
      <div
        className={`projects__card-wrapper ${isFlipped ? 'projects__card-wrapper--flipped' : ''}`}
        onClick={() => toggleFlip(p.id)}
        aria-label={`${p.title} project details`}
      >
        <div className="projects__card-inner">
          {/* ==================== FRONT OF CARD ==================== */}
          <div className="projects__card-front">
            <div className="projects__card-top">
              <span className="projects__index">{String(displayIndex + 1).padStart(2, '0')}</span>
              <span className="projects__flip-hint">
                <FiRotateCw size={13} /> Flip
              </span>
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

            <div className="projects__front-footer">
              <span>Hover / Tap card to flip ➜</span>
            </div>
          </div>

          {/* ==================== BACK OF CARD ==================== */}
          <div className="projects__card-back">
            <div className="projects__back-top">
              <div>
                <h4 className="projects__back-title">{p.title}</h4>
                <span className="projects__back-category">{p.category.join(' · ')}</span>
              </div>
              <span className="projects__flip-hint">
                <FiRotateCw size={13} /> Back
              </span>
            </div>

            <div className="projects__preview-box">
              <div className={`projects__preview-grid ${previewList.length > 1 ? 'projects__preview-grid--multi' : ''}`}>
                {previewList.map((imgUrl, imgIdx) => (
                  <img
                    key={imgIdx}
                    src={imgUrl}
                    alt={`${p.title} preview screenshot ${imgIdx + 1}`}
                    className="projects__preview-img"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            <div className="projects__actions" onClick={(e) => e.stopPropagation()}>
              {p.liveUrl ? (
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="projects__action btn--solid">
                  <FiExternalLink size={14} /> Live Demo
                </a>
              ) : (
                <span className="projects__action projects__action--disabled" title="Add liveUrl in data.js">
                  <FiExternalLink size={14} /> Live Demo
                </span>
              )}
              {p.githubUrl ? (
                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="projects__action btn--outline">
                  <FiGithub size={14} /> Code
                </a>
              ) : (
                <span className="projects__action projects__action--disabled" title="Add githubUrl in data.js">
                  <FiGithub size={14} /> Code
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
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
                onClick={() => {
                  setActive(f);
                  setFlippedCards({});
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Show manual navigation arrows only when a specific category filter is active */}
          {!isMarqueeMode && (
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
          )}
        </div>

        {/* MODE 1: ALL FILTER -> Continuous Horizontal Leftward Marquee Mode */}
        {isMarqueeMode ? (
          <Reveal className="projects__marquee">
            <div className="projects__track projects__track--marquee">
              {[...visible, ...visible].map((p, i) => (
                <div key={`marquee-${p.id}-${i}`} className="projects__marquee-item">
                  {renderCardContent(p, i % visible.length)}
                </div>
              ))}
            </div>
          </Reveal>
        ) : (
          /* MODE 2: FILTERED MODE -> Manual Slider Track with Arrows & Navigation Dots */
          <Reveal className="projects__viewport">
            <div className="projects__track projects__track--manual" ref={trackRef} onScroll={updateArrows}>
              {visible.map((p, i) => (
                <div key={`manual-${p.id}`} className="projects__manual-item" ref={registerCard}>
                  {renderCardContent(p, i)}
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Display pagination dots in manual filtered mode */}
        {!isMarqueeMode && visible.length > 1 && (
          <div className="projects__dots">
            {visible.map((p, i) => (
              <button
                key={`dot-${p.id}`}
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
