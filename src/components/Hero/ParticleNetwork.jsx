import { useEffect, useRef } from 'react';
import './ParticleNetwork.css';

// Lightweight canvas "plexus" network — auto-pauses when off-screen for 60/120 FPS performance.
function ParticleNetwork({ color = '224, 164, 88', density = 0.00009 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, points, raf;
    let isVisible = true;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * (window.devicePixelRatio || 1);
      canvas.height = height * (window.devicePixelRatio || 1);
      ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);

      const count = Math.min(70, Math.max(24, Math.floor(width * height * density)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25
      }));
    };

    const step = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
      }

      const maxDist = Math.min(150, width * 0.14);

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(${color}, ${0.16 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        ctx.fillStyle = `rgba(${color}, 0.5)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(step);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    resize();
    step();

    const onResize = () => resize();
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [color, density]);

  return <canvas ref={canvasRef} className="particle-network" aria-hidden="true" />;
}

export default ParticleNetwork;
