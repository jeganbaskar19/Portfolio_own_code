import Reveal from './Reveal';
import './SectionHeading.css';

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <Reveal className={`heading heading--${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="heading__title">{title}</h2>
      {description && <p className="heading__desc">{description}</p>}
    </Reveal>
  );
}

export default SectionHeading;
