import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, OrbitControls, TorusKnot } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import '../styles/ThreeDBackground.css';

function AnimatedParticles() {
  const ref = useRef();
  const sphere = useMemo(() => new Float32Array(5000 * 3), []);

  useMemo(() => {
    for (let i = 0; i < sphere.length; i += 3) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      sphere[i] = Math.cos(theta) * Math.sin(phi) * 50;
      sphere[i + 1] = Math.sin(theta) * Math.sin(phi) * 50;
      sphere[i + 2] = Math.cos(phi) * 50;
    }
  }, [sphere]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={ref}>
      <Points positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#6366f1"
          size={0.5}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingSpheres() {
  const spheres = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
      ],
      scale: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.5 + 0.5
    }));
  }, []);

  return (
    <>
      {spheres.map((sphere, i) => (
        <FloatingSphere key={i} {...sphere} />
      ))}
    </>
  );
}

function FloatingSphere({ position, scale, speed }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 2;
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[scale, 16, 16]} position={position}>
      <meshStandardMaterial
        color="#6366f1"
        transparent
        opacity={0.1}
        wireframe
      />
    </Sphere>
  );
}

export default function ThreeDBackground() {
  const { isDark } = useTheme ? useTheme() : { isDark: false };
  return (
        <div className="three-d-background-container">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color={isDark ? '#a78bfa' : '#6366f1'} />
        <AnimatedParticles />
        <FloatingSpheres />
        {/* Developer-themed 3D object: Glowing TorusKnot */}
        <TorusKnot
          position={[0, 0, 0]}
          args={[4, 1.2, 128, 32]}
        >
          <meshPhysicalMaterial
            color={isDark ? '#a78bfa' : '#6366f1'}
            emissive={isDark ? '#a78bfa' : '#6366f1'}
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </TorusKnot>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
} 