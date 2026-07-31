import { useEffect, useState } from 'react';
import './TypedRoles.css';

const TYPE_SPEED = 55;
const DELETE_SPEED = 30;
const HOLD_MS = 1400;

function TypedRoles({ roles }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index % roles.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)));
        },
        deleting ? DELETE_SPEED : TYPE_SPEED
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, roles]);

  return (
    <span className="typed-roles">
      {text}
      <span className="typed-roles__cursor" aria-hidden="true" />
    </span>
  );
}

export default TypedRoles;
