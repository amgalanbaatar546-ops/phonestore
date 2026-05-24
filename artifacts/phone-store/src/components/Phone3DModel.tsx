import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial } from 'three';
import { useGLTF, Environment, Float, PresentationControls, ContactShadows, RoundedBox } from '@react-three/drei';

interface PhoneModelProps {
  interactive?: boolean;
  scale?: number;
}

export function Phone3DModel({ interactive = false, scale = 1 }: PhoneModelProps) {
  const meshRef = useRef<Mesh>(null);
  const screenRef = useRef<MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!interactive && meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
    if (screenRef.current) {
      // Add a subtle pulsing glow to the screen
      screenRef.current.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  const PhoneShape = () => (
    <group scale={scale}>
      <RoundedBox args={[2, 4, 0.2]} radius={0.1} smoothness={4} ref={meshRef}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        
        {/* Screen */}
        <mesh position={[0, 0, 0.101]}>
          <planeGeometry args={[1.8, 3.8]} />
          <meshStandardMaterial 
            ref={screenRef}
            color="#000000" 
            emissive="#00f0ff"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Camera bump */}
        <group position={[0.5, 1.5, -0.1]}>
          <RoundedBox args={[0.6, 0.6, 0.1]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.2} />
          </RoundedBox>
          <mesh position={[-0.15, 0.15, -0.05]}>
            <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
            <meshStandardMaterial color="#222" metalness={1} roughness={0} />
          </mesh>
          <mesh position={[0.15, -0.15, -0.05]}>
            <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
            <meshStandardMaterial color="#222" metalness={1} roughness={0} />
          </mesh>
        </group>
      </RoundedBox>
    </group>
  );

  if (interactive) {
    return (
      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <PhoneShape />
        </Float>
      </PresentationControls>
    );
  }

  return (
    <Float rotationIntensity={1} floatIntensity={2} speed={2}>
      <PhoneShape />
    </Float>
  );
}
