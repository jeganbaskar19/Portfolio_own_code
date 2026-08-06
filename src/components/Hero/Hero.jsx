import { lazy, memo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { hero, personal } from '../../data';
import { backgrounds } from '../../config/backgrounds';
import ParticleNetwork from './ParticleNetwork';
import AnimatedCounter from '../shared/AnimatedCounter';
import TypedRoles from '../shared/TypedRoles';
import SocialLinks from '../shared/SocialLinks';
import './Hero.css';

const Hero3D = lazy(() => import('./Hero3D'));

function Hero3DFallback() {
  return (
    <div className="hero3d" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: '270px',
          height: '350px',
          borderRadius: '16px',
          background: 'rgba(224, 164, 88, 0.08)',
          border: '1px solid rgba(224, 164, 88, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          animation: 'pulse 2s infinite ease-in-out'
        }}
      />
    </div>
  );
}

function Hero() {
  const bgStyle = backgrounds.hero ? { backgroundImage: `url(${backgrounds.hero})` } : undefined;

  return (
    <section id="home" className="section section--ink hero" style={bgStyle}>
      <div className="section__scrim" />
      <ParticleNetwork />

      <div className="container section__inner hero__inner">
        <div className="hero__copy">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            className="hero__headline"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            {hero.greeting || personal.greeting}{' '}
            <span className="hero__name">{personal.firstName}</span>
          </motion.h1>

          <motion.p
            className="hero__role"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            <TypedRoles roles={personal.roles} />
          </motion.p>

          <motion.p
            className="hero__desc"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            {hero.description}
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
          >
            <a className="btn btn--solid" href={hero.ctaPrimary.href} download>
              {hero.ctaPrimary.label}
            </a>
            <Link className="btn btn--outline" to="/resume">
              View Resume
            </Link>
            <a className="btn btn--outline" href={hero.ctaSecondary.href}>
              {hero.ctaSecondary.label}
            </a>
          </motion.div>

          <motion.div
            className="hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {hero.stats.map((s) => (
              <div className="hero__stat" key={s.id}>
                <span className="hero__stat-value">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="hero__socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <SocialLinks variant="ink" />
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<Hero3DFallback />}>
            <Hero3D />
          </Suspense>
          <div className="hero__visual-tag">
            <span className="hero__visual-dot" />
            {personal.availability.label}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Hero);
