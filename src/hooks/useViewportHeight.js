import { useEffect } from 'react';

// Mobile browsers change the visible viewport height as the address bar
// shows/hides, which makes 100vh unreliable for exact full-screen
// sections. This keeps a `--vh` custom property in sync with the real
// visible height so `calc(var(--vh, 1vh) * 100)` always matches the
// screen, on every device. Modern browsers also get `100svh` as a
// belt-and-braces CSS-only fallback (see theme.css).
function useViewportHeight() {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);
}

export default useViewportHeight;
