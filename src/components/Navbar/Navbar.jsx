import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { navigation, personal } from '../../data';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Determine active section for scroll-spy highlighting
      const sectionIds = navigation.map((item) => item.href.replace('#', ''));
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setOpen(false);

    const targetId = href.replace('#', '');
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const navOffset = 70;
      const elementTop = targetEl.getBoundingClientRect().top + window.pageYOffset;
      const offsetTop = Math.max(0, elementTop - navOffset);

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a
          href="#home"
          className="navbar__brand"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          <span className="navbar__brand-mark">{'</>'}</span>
          {personal.firstName}
        </a>

        <nav className="navbar__links navbar__links--desktop">
          {navigation.map((item) => {
            const secId = item.href.replace('#', '');
            const isActive = activeSection === secId;
            return (
              <a
                key={item.id}
                href={item.href}
                className={isActive ? 'navbar__link--active' : ''}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="btn btn--solid navbar__cta"
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Hire Me
        </a>

        <button
          className="navbar__toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="navbar__links navbar__links--mobile">
          {navigation.map((item) => {
            const secId = item.href.replace('#', '');
            const isActive = activeSection === secId;
            return (
              <a
                key={item.id}
                href={item.href}
                className={isActive ? 'navbar__link--active' : ''}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
