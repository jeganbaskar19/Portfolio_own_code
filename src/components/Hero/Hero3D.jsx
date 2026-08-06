import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, useTexture, Sparkles, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { personal } from '../../data';

const FRAME_W = 2.7;
const FRAME_H = FRAME_W * 1.3;

function useCoverTexture(url, frameW, frameH) {
  const texture = useTexture(url);

  useMemo(() => {
    if (!texture.image) return;
    texture.colorSpace = THREE.SRGBColorSpace;
    const imgAspect = texture.image.width / texture.image.height;
    const frameAspect = frameW / frameH;

    if (imgAspect > frameAspect) {
      const scale = frameAspect / imgAspect;
      texture.repeat.set(scale, 1);
      texture.offset.set((1 - scale) / 2, 0);
    } else {
      const scale = imgAspect / frameAspect;
      texture.repeat.set(1, scale);
      texture.offset.set(0, (1 - scale) / 2);
    }
    texture.needsUpdate = true;
  }, [texture, frameW, frameH]);

  useEffect(() => {
    return () => {
      if (texture) texture.dispose();
    };
  }, [texture]);

  return texture;
}

function PhotoCard({ isMobile }) {
  const group = useRef(null);
  const { viewport } = useThree();
  const texture = useCoverTexture(personal.profileImage, FRAME_W, FRAME_H);

  const responsiveScale = Math.min(1, Math.max(0.62, (viewport.width * 0.7) / FRAME_W));

  useFrame((state) => {
    if (!group.current) return;
    const { pointer } = state;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * (isMobile ? 0.12 : 0.22), 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * (isMobile ? 0.08 : 0.15), 0.05);
  });

  return (
    <Float speed={isMobile ? 0.8 : 1.3} rotationIntensity={isMobile ? 0.1 : 0.2} floatIntensity={isMobile ? 0.3 : 0.55}>
      <group ref={group} scale={responsiveScale}>
        <RoundedBox
          args={[FRAME_W + 0.14, FRAME_H + 0.14, 0.06]}
          radius={0.14}
          smoothness={isMobile ? 2 : 4}
          position={[0, 0, -0.05]}
        >
          <meshStandardMaterial color="#e0a458" roughness={0.4} metalness={0.15} />
        </RoundedBox>

        <mesh>
          <planeGeometry args={[FRAME_W, FRAME_H]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function Scene({ isMobile }) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 3, 4]} intensity={0.5} />
      <Sparkles count={isMobile ? 12 : 40} scale={[6, 6, 3]} size={isMobile ? 1.8 : 2.2} speed={0.3} color="#e0a458" opacity={0.5} />
      <Suspense fallback={null}>
        <PhotoCard isMobile={isMobile} />
      </Suspense>
    </>
  );
}

function Hero3D() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isTabActive, setIsTabActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    const mobileCheck = window.innerWidth <= 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    setIsMobile(mobileCheck);

    // On mobile, defer WebGL Canvas mount slightly so initial LCP paint occurs instantly with zero TBT
    if (mobileCheck) {
      const timer = setTimeout(() => setReadyToRender(true), 600);
      return () => clearTimeout(timer);
    } else {
      setReadyToRender(true);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    const handleVisibilityChange = () => {
      setIsTabActive(document.visibilityState === 'visible');
    };

    observer.observe(el);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const shouldRenderLoop = isVisible && isTabActive;

  return (
    <div ref={containerRef} className="hero3d" aria-hidden="true">
      {readyToRender ? (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 42 }}
          dpr={isMobile ? 1 : [1, 1.8]}
          frameloop={shouldRenderLoop ? 'always' : 'never'}
          gl={{
            powerPreference: isMobile ? 'low-power' : 'high-performance',
            antialias: !isMobile,
            precision: isMobile ? 'mediump' : 'highp'
          }}
        >
          <Scene isMobile={isMobile} />
        </Canvas>
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: '240px',
              height: '312px',
              borderRadius: '16px',
              background: 'rgba(224, 164, 88, 0.08)',
              border: '1px solid rgba(224, 164, 88, 0.2)'
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Hero3D;
