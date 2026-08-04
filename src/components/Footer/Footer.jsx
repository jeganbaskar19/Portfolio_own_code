import { footer, personal, navigation } from '../../data';
import SocialLinks from '../shared/SocialLinks';
import './Footer.css';

function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div>
          <p className="site-footer__brand">{footer.logoText}</p>
          <p className="site-footer__tagline">{personal.tagline}</p>
        </div>

        <nav className="site-footer__nav">
          {navigation.map((item) => (
            <a key={item.id} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-footer__right">
          <SocialLinks variant="ink" size={15} />
          <button className="site-footer__top-btn" onClick={scrollTop}>
            {footer.backToTopLabel} ↑
          </button>
        </div>
      </div>

      {/* signature detail: a VS Code style status bar */}
      <div className="statusbar">
        <div className="container statusbar__inner">
          <span className="statusbar__item">
            {/* <span className="statusbar__dot" /> main */}
          </span>
          {/* <span className="statusbar__item">0 problems</span> */}
          <span className="statusbar__item statusbar__item--grow">{footer.copyright}</span>
          {/* <span className="statusbar__item">UTF-8</span> */}
          {/* <span className="statusbar__item">Ln 1, Col 1</span> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
