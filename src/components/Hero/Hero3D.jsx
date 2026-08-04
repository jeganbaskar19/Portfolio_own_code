import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, useTexture, Sparkles, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { personal } from '../../data';

const FRAME_W = 2.7;
const FRAME_H = FRAME_W * 1.3;

// Adjusts the texture's repeat/offset so any photo — portrait,
// landscape, square, whatever gets swapped in later — always fills
// the frame edge-to-edge with no stretching. Same idea as CSS
// `object-fit: cover`, done manually since three.js has no such flag.
function useCoverTexture(url, frameW, frameH) {
  const texture = useTexture(url);

  useMemo(() => {
    if (!texture.image) return;
    texture.colorSpace = THREE.SRGBColorSpace;
    const imgAspect = texture.image.width / texture.image.height;
    const frameAspect = frameW / frameH;

    if (imgAspect > frameAspect) {
      // image wider than frame -> crop left/right
      const scale = frameAspect / imgAspect;
      texture.repeat.set(scale, 1);
      texture.offset.set((1 - scale) / 2, 0);
    } else {
      // image taller than frame -> crop top/bottom
      const scale = imgAspect / frameAspect;
      texture.repeat.set(1, scale);
      texture.offset.set(0, (1 - scale) / 2);
    }
    texture.needsUpdate = true;
  }, [texture, frameW, frameH]);

  return texture;
}

function PhotoCard() {
  const group = useRef(null);
  const { viewport } = useThree();
  const texture = useCoverTexture(personal.profileImage, FRAME_W, FRAME_H);

  // Responsive scale factor: automatically scales the 3D card so it
  // fits cleanly on mobile viewports without overflowing or getting cut off.
  const responsiveScale = Math.min(1, Math.max(0.62, (viewport.width * 0.7) / FRAME_W));

  // gentle tilt that follows the pointer, eases back to rest
  useFrame((state) => {
    if (!group.current) return;
    const { pointer } = state;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.22, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.15, 0.05);
  });

  return (
    <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.55}>
      <group ref={group} scale={responsiveScale}>
        {/* rounded frame behind the photo, gives the "card" edge */}
        <RoundedBox args={[FRAME_W + 0.14, FRAME_H + 0.14, 0.06]} radius={0.14} smoothness={4} position={[0, 0, -0.05]}>
          <meshStandardMaterial color="#e0a458" roughness={0.4} metalness={0.15} />
        </RoundedBox>

        {/* photo plane, cover-cropped so any future image fits cleanly */}
        <mesh>
          <planeGeometry args={[FRAME_W, FRAME_H]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 3, 4]} intensity={0.5} />
      <Sparkles count={40} scale={[6, 6, 3]} size={2.2} speed={0.3} color="#e0a458" opacity={0.5} />
      <Suspense fallback={null}>
        <PhotoCard />
      </Suspense>
    </>
  );
}

function Hero3D() {
  return (
    <div className="hero3d" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 42 }} dpr={[1, 1.8]}>
        <Scene />
      </Canvas>
    </div>
  );
}

export default Hero3D;
