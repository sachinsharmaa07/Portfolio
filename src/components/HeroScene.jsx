import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Particles({ count = 80, mouse }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: [(Math.random() - 0.5) * 16, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12 - 2],
        scale: Math.random() * 0.12 + 0.04,
        speed: Math.random() * 0.002 + 0.001,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    particles.forEach((p, i) => {
      const x = p.position[0] + Math.sin(t * p.speed * 100 + p.offset) * 0.3 + (mouse.current.x * 0.3);
      const y = p.position[1] + Math.cos(t * p.speed * 80 + p.offset) * 0.2 + (mouse.current.y * 0.3);
      const z = p.position[2] + Math.sin(t * p.speed * 60) * 0.1;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#7B5CFA"
        emissive="#7B5CFA"
        emissiveIntensity={0.6}
        wireframe
        transparent
        opacity={0.5}
      />
    </instancedMesh>
  );
}

function CentralMesh({ mouse }) {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1 + mouse.current.y * 0.2;
    meshRef.current.rotation.y = t * 0.15 + mouse.current.x * 0.2;
    if (wireRef.current) {
      wireRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group>
        {/* Solid inner mesh */}
        <mesh ref={meshRef} scale={2.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#7B5CFA"
            emissive="#7B5CFA"
            emissiveIntensity={1.8}
            transparent
            opacity={0.15}
          />
        </mesh>
        {/* Wireframe overlay */}
        <mesh ref={wireRef} scale={2.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#00FFC2"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingTorus({ position, mouse }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.z = t * 0.2;
    ref.current.position.x = position[0] + mouse.current.x * 0.15;
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3 + mouse.current.y * 0.15;
  });

  return (
    <mesh ref={ref} position={position} scale={0.5}>
      <torusKnotGeometry args={[0.6, 0.15, 64, 8, 2, 3]} />
      <meshStandardMaterial
        color="#00FFC2"
        emissive="#00FFC2"
        emissiveIntensity={0.8}
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  };

  return (
    <div
      className="absolute inset-0"
      onPointerMove={handlePointerMove}
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={4} color="#00FFC2" />
        <pointLight position={[-5, -5, -5]} intensity={3} color="#7B5CFA" />
        <pointLight position={[0, 8, -5]} intensity={2} color="#FF3CAC" />

        <Particles mouse={mouse} />
        <CentralMesh mouse={mouse} />
        <FloatingTorus position={[-4.5, 2.5, -3]} mouse={mouse} />
        <FloatingTorus position={[5, -2, -4]} mouse={mouse} />

        {/* Bloom post-processing */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={1.5}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
