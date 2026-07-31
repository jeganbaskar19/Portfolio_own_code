import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaBehance, FaInstagram, FaTwitter, FaGlobe } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { socials } from '../../data';
import './SocialLinks.css';

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  behance: FaBehance,
  instagram: FaInstagram,
  twitter: FaTwitter,
  globe: FaGlobe
};

// GitHub serves public avatar images at a predictable, CORS-safe URL —
// no API key needed, so we can pull a real preview automatically.
// Other platforms (LinkedIn etc.) don't allow this without auth, so
// those fall back to a styled placeholder unless you set `previewImage`
// on that entry in src/data.js.
function autoPreview(social) {
  if (social.previewImage) return social.previewImage;
  if (social.icon === 'github') {
    try {
      const username = new URL(social.url).pathname.replace(/\//g, '');
      if (username) return `https://github.com/${username}.png?size=200`;
    } catch {
      return null;
    }
  }
  return null;
}

function SocialLinks({ variant = 'ink', size = 17 }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className={`social-links social-links--${variant}`}>
      {socials.map((s) => {
        const Icon = ICONS[s.icon] || FaGlobe;
        const preview = autoPreview(s);
        const isOpen = hoveredId === s.id;

        return (
          <div
            key={s.id}
            className="social-links__wrap"
            onMouseEnter={() => setHoveredId(s.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(s.id)}
            onBlur={() => setHoveredId(null)}
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="social-preview"
                  role="tooltip"
                  initial={{ opacity: 0, y: 8, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <div className={`social-preview__media social-preview__media--${s.icon}`}>
                    {preview ? (
                      <img src={preview} alt={`${s.label} preview`} loading="lazy" />
                    ) : (
                      <Icon size={28} />
                    )}
                  </div>
                  <div className="social-preview__footer">
                    <span className="social-preview__label">{s.label}</span>
                    <FiExternalLink size={11} />
                  </div>
                  <span className="social-preview__arrow" />
                </motion.div>
              )}
            </AnimatePresence>

            <a href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="social-links__item">
              <Icon size={size} />
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default SocialLinks;
