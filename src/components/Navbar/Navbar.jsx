import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { navigation, personal } from '../../data';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#home" className="navbar__brand">
          <span className="navbar__brand-mark">{'</>'}</span>
          {personal.firstName}
        </a>

        <nav className="navbar__links navbar__links--desktop">
          {navigation.map((item) => (
            <a key={item.id} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn--solid navbar__cta">
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
          {navigation.map((item) => (
            <a key={item.id} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
