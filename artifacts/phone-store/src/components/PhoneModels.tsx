import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Float, PresentationControls } from "@react-three/drei";
import type { Mesh, MeshStandardMaterial } from "three";

export type PhoneModelType =
  | "iphone"
  | "iphone-pro"
  | "samsung-s"
  | "samsung-a"
  | "samsung-fold"
  | "samsung-flip"
  | "pixel"
  | "xiaomi"
  | "generic";

export const MODEL_OPTIONS: { value: PhoneModelType; label: string }[] = [
  { value: "iphone", label: "iPhone (стандарт)" },
  { value: "iphone-pro", label: "iPhone Pro / Pro Max" },
  { value: "samsung-s", label: "Samsung Galaxy S Ultra" },
  { value: "samsung-a", label: "Samsung Galaxy A серий" },
  { value: "samsung-fold", label: "Samsung Galaxy Z Fold" },
  { value: "samsung-flip", label: "Samsung Galaxy Z Flip" },
  { value: "pixel", label: "Google Pixel" },
  { value: "xiaomi", label: "Xiaomi / Redmi" },
  { value: "generic", label: "Ерөнхий загвар" },
];

function Lens({ pos, r = 0.09 }: { pos: [number, number, number]; r?: number }) {
  return (
    <mesh position={pos} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[r, r, 0.06, 32]} />
      <meshStandardMaterial color="#111" metalness={1} roughness={0} />
    </mesh>
  );
}

function LensInner({ pos }: { pos: [number, number, number] }) {
  return (
    <mesh position={pos} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.048, 0.048, 0.06, 32]} />
      <meshStandardMaterial color="#050a1a" emissive="#001133" emissiveIntensity={0.5} />
    </mesh>
  );
}

function Flash({ pos }: { pos: [number, number, number] }) {
  return (
    <mesh position={pos} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
      <meshStandardMaterial color="#fffbea" emissive="#fffbea" emissiveIntensity={0.4} />
    </mesh>
  );
}

/* ─── iPhone Standard ──────────────────────────────────────── */
export function IPhoneModel() {
  const bodyRef = useRef<Mesh>(null);
  const screenRef = useRef<MeshStandardMaterial>(null);
  useFrame((s) => {
    if (!bodyRef.current) return;
    bodyRef.current.rotation.y = s.clock.elapsedTime * 0.4;
    if (screenRef.current)
      screenRef.current.emissiveIntensity = 0.4 + Math.sin(s.clock.elapsedTime * 2) * 0.15;
  });
  return (
    <group>
      <RoundedBox args={[1.9, 4.05, 0.12]} radius={0.12} smoothness={6} ref={bodyRef}>
        <meshStandardMaterial color="#1c1c1e" metalness={0.95} roughness={0.05} />
      </RoundedBox>
      <mesh position={[0, 0, 0.062]}>
        <planeGeometry args={[1.72, 3.88]} />
        <meshStandardMaterial ref={screenRef} color="#000" emissive="#00cfff" emissiveIntensity={0.4} roughness={0.1} metalness={0.5} />
      </mesh>
      {/* Dynamic Island */}
      <mesh position={[0, 1.7, 0.065]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.07, 0.26, 6, 16]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Camera module */}
      <mesh position={[-0.45, 1.45, -0.065]}>
        <boxGeometry args={[0.62, 0.62, 0.04]} />
        <meshStandardMaterial color="#0a0a0c" metalness={0.9} roughness={0.2} />
      </mesh>
      <Lens pos={[-0.58, 1.58, -0.09]} />
      <LensInner pos={[-0.58, 1.58, -0.09]} />
      <Lens pos={[-0.32, 1.32, -0.09]} />
      <LensInner pos={[-0.32, 1.32, -0.09]} />
      <Flash pos={[-0.3, 1.56, -0.09]} />
      {/* Power button */}
      <mesh position={[0.97, 0.6, 0]}>
        <boxGeometry args={[0.03, 0.4, 0.08]} />
        <meshStandardMaterial color="#2c2c2e" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Volume buttons */}
      <mesh position={[-0.97, 0.45, 0]}>
        <boxGeometry args={[0.03, 0.28, 0.08]} />
        <meshStandardMaterial color="#2c2c2e" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.97, 0.05, 0]}>
        <boxGeometry args={[0.03, 0.28, 0.08]} />
        <meshStandardMaterial color="#2c2c2e" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* USB-C */}
      <mesh position={[0, -2.035, 0]}>
        <boxGeometry args={[0.28, 0.05, 0.1]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

/* ─── iPhone Pro / Pro Max ──────────────────────────────────── */
export function IPhoneProModel() {
  const bodyRef = useRef<Mesh>(null);
  const screenRef = useRef<MeshStandardMaterial>(null);
  useFrame((s) => {
    if (bodyRef.current) bodyRef.current.rotation.y = s.clock.elapsedTime * 0.4;
    if (screenRef.current)
      screenRef.current.emissiveIntensity = 0.4 + Math.sin(s.clock.elapsedTime * 2) * 0.15;
  });
  return (
    <group>
      <RoundedBox args={[1.95, 4.2, 0.12]} radius={0.08} smoothness={6} ref={bodyRef}>
        <meshStandardMaterial color="#3a3a3c" metalness={1} roughness={0.08} />
      </RoundedBox>
      {/* Titanium side bands */}
      <mesh position={[0.978, 0, 0]}>
        <boxGeometry args={[0.01, 4.2, 0.12]} />
        <meshStandardMaterial color="#8e8e93" metalness={1} roughness={0.05} />
      </mesh>
      <mesh position={[-0.978, 0, 0]}>
        <boxGeometry args={[0.01, 4.2, 0.12]} />
        <meshStandardMaterial color="#8e8e93" metalness={1} roughness={0.05} />
      </mesh>
      <mesh position={[0, 0, 0.062]}>
        <planeGeometry args={[1.78, 4.02]} />
        <meshStandardMaterial ref={screenRef} color="#000" emissive="#00e5ff" emissiveIntensity={0.4} roughness={0.05} metalness={0.6} />
      </mesh>
      {/* Dynamic Island */}
      <mesh position={[0, 1.78, 0.065]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.07, 0.28, 6, 16]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Triple camera module */}
      <mesh position={[-0.47, 1.5, -0.065]}>
        <boxGeometry args={[0.78, 0.78, 0.05]} />
        <meshStandardMaterial color="#080808" metalness={0.95} roughness={0.15} />
      </mesh>
      <Lens pos={[-0.62, 1.64, -0.096]} r={0.1} />
      <LensInner pos={[-0.62, 1.64, -0.096]} />
      <Lens pos={[-0.32, 1.64, -0.096]} r={0.1} />
      <LensInner pos={[-0.32, 1.64, -0.096]} />
      <Lens pos={[-0.47, 1.37, -0.096]} r={0.1} />
      <LensInner pos={[-0.47, 1.37, -0.096]} />
      {/* LiDAR */}
      <Lens pos={[-0.28, 1.56, -0.096]} r={0.055} />
      <Flash pos={[-0.65, 1.37, -0.096]} />
      <mesh position={[0, -2.035, 0]}>
        <boxGeometry args={[0.3, 0.05, 0.1]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

/* ─── Samsung Galaxy S Ultra ──────────────────────────────── */
export function SamsungSModel() {
  const bodyRef = useRef<Mesh>(null);
  const screenRef = useRef<MeshStandardMaterial>(null);
  useFrame((s) => {
    if (bodyRef.current) bodyRef.current.rotation.y = s.clock.elapsedTime * 0.4;
    if (screenRef.current)
      screenRef.current.emissiveIntensity = 0.35 + Math.sin(s.clock.elapsedTime * 2) * 0.12;
  });
  return (
    <group>
      <RoundedBox args={[1.88, 4.1, 0.11]} radius={0.16} smoothness={8} ref={bodyRef}>
        <meshStandardMaterial color="#12121a" metalness={0.9} roughness={0.08} />
      </RoundedBox>
      <mesh position={[0, 0, 0.057]}>
        <planeGeometry args={[1.7, 3.95]} />
        <meshStandardMaterial ref={screenRef} color="#000" emissive="#b000ff" emissiveIntensity={0.35} roughness={0.05} metalness={0.4} />
      </mesh>
      {/* Punch-hole */}
      <mesh position={[0, 1.82, 0.06]}>
        <circleGeometry args={[0.07, 32]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Vertical camera strip */}
      <mesh position={[-0.5, 1.5, -0.062]}>
        <boxGeometry args={[0.32, 1.05, 0.04]} />
        <meshStandardMaterial color="#0d0d10" metalness={0.9} roughness={0.2} />
      </mesh>
      <Lens pos={[-0.5, 1.95, -0.094]} r={0.095} />
      <LensInner pos={[-0.5, 1.95, -0.094]} />
      <Lens pos={[-0.5, 1.68, -0.094]} r={0.095} />
      <LensInner pos={[-0.5, 1.68, -0.094]} />
      <Lens pos={[-0.5, 1.41, -0.094]} r={0.09} />
      <LensInner pos={[-0.5, 1.41, -0.094]} />
      <Lens pos={[-0.5, 1.15, -0.094]} r={0.06} />
      <Flash pos={[-0.5, 0.95, -0.094]} />
      {/* S-Pen slot */}
      <mesh position={[0.85, -1.8, 0]}>
        <boxGeometry args={[0.06, 0.55, 0.08]} />
        <meshStandardMaterial color="#1a0033" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -2.06, 0]}>
        <boxGeometry args={[0.3, 0.05, 0.09]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

/* ─── Samsung Galaxy A серий ──────────────────────────────── */
export function SamsungAModel() {
  const bodyRef = useRef<Mesh>(null);
  const screenRef = useRef<MeshStandardMaterial>(null);
  useFrame((s) => {
    if (bodyRef.current) bodyRef.current.rotation.y = s.clock.elapsedTime * 0.4;
    if (screenRef.current)
      screenRef.current.emissiveIntensity = 0.3 + Math.sin(s.clock.elapsedTime * 2) * 0.1;
  });
  return (
    <group>
      <RoundedBox args={[1.9, 4.0, 0.14]} radius={0.18} smoothness={6} ref={bodyRef}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, 0, 0.072]}>
        <planeGeometry args={[1.72, 3.84]} />
        <meshStandardMaterial ref={screenRef} color="#000" emissive="#00cfff" emissiveIntensity={0.3} roughness={0.1} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.75, 0.075]}>
        <circleGeometry args={[0.075, 32]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[-0.44, 1.5, -0.075]}>
        <boxGeometry args={[0.6, 0.65, 0.04]} />
        <meshStandardMaterial color="#0a0a12" metalness={0.7} roughness={0.3} />
      </mesh>
      <Lens pos={[-0.54, 1.64, -0.1]} />
      <LensInner pos={[-0.54, 1.64, -0.1]} />
      <Lens pos={[-0.34, 1.64, -0.1]} r={0.07} />
      <LensInner pos={[-0.34, 1.64, -0.1]} />
      <Lens pos={[-0.44, 1.38, -0.1]} r={0.06} />
      <Flash pos={[-0.34, 1.38, -0.1]} />
    </group>
  );
}

/* ─── Samsung Galaxy Z Fold ──────────────────────────────── */
export function SamsungFoldModel() {
  const groupRef = useRef<any>(null);
  const screenRef = useRef<MeshStandardMaterial>(null);
  const coverRef = useRef<MeshStandardMaterial>(null);
  useFrame((s) => {
    if (groupRef.current) groupRef.current.rotation.y = s.clock.elapsedTime * 0.4;
    if (screenRef.current)
      screenRef.current.emissiveIntensity = 0.35 + Math.sin(s.clock.elapsedTime * 2) * 0.1;
    if (coverRef.current)
      coverRef.current.emissiveIntensity = 0.2 + Math.sin(s.clock.elapsedTime * 2) * 0.08;
  });
  return (
    <group ref={groupRef}>
      {/* Top half */}
      <group position={[0, 1.02, 0]}>
        <RoundedBox args={[1.55, 1.97, 0.14]} radius={0.1} smoothness={6}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.92} roughness={0.07} />
        </RoundedBox>
        <mesh position={[0, 0, 0.072]}>
          <planeGeometry args={[1.36, 1.8]} />
          <meshStandardMaterial ref={screenRef} color="#000" emissive="#00e5ff" emissiveIntensity={0.35} roughness={0.05} metalness={0.5} />
        </mesh>
      </group>
      {/* Bottom half */}
      <group position={[0, -1.02, 0]}>
        <RoundedBox args={[1.55, 1.97, 0.14]} radius={0.1} smoothness={6}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.92} roughness={0.07} />
        </RoundedBox>
        <mesh position={[0, 0, 0.072]}>
          <planeGeometry args={[1.36, 1.8]} />
          <meshStandardMaterial color="#000" emissive="#00e5ff" emissiveIntensity={0.2} roughness={0.05} metalness={0.5} />
        </mesh>
      </group>
      {/* Hinge bar */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.55, 0.1, 0.18]} />
        <meshStandardMaterial color="#3a3a3c" metalness={1} roughness={0.05} />
      </mesh>
      {/* Crease line on screen */}
      <mesh position={[0, 0, 0.075]}>
        <boxGeometry args={[1.36, 0.012, 0.01]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      {/* Cover screen (back top) */}
      <mesh position={[0, 1.6, -0.075]}>
        <planeGeometry args={[0.9, 0.28]} />
        <meshStandardMaterial ref={coverRef} color="#000" emissive="#6600ff" emissiveIntensity={0.2} />
      </mesh>
      <Lens pos={[-0.5, 1.75, -0.08]} r={0.075} />
      <LensInner pos={[-0.5, 1.75, -0.08]} />
      <Lens pos={[-0.5, 1.52, -0.08]} r={0.07} />
    </group>
  );
}

/* ─── Samsung Galaxy Z Flip ──────────────────────────────── */
export function SamsungFlipModel() {
  const groupRef = useRef<any>(null);
  const screenRef = useRef<MeshStandardMaterial>(null);
  const coverRef = useRef<MeshStandardMaterial>(null);
  useFrame((s) => {
    if (groupRef.current) groupRef.current.rotation.y = s.clock.elapsedTime * 0.4;
    if (screenRef.current)
      screenRef.current.emissiveIntensity = 0.35 + Math.sin(s.clock.elapsedTime * 2) * 0.12;
    if (coverRef.current)
      coverRef.current.emissiveIntensity = 0.25 + Math.sin(s.clock.elapsedTime * 2) * 0.1;
  });
  return (
    <group ref={groupRef}>
      {/* Top half */}
      <group position={[0, 1.06, 0]}>
        <RoundedBox args={[2.05, 2.07, 0.15]} radius={0.2} smoothness={6}>
          <meshStandardMaterial color="#1a0033" metalness={0.88} roughness={0.1} />
        </RoundedBox>
        <mesh position={[0, 0, 0.077]}>
          <planeGeometry args={[1.88, 1.9]} />
          <meshStandardMaterial ref={screenRef} color="#000" emissive="#aa00ff" emissiveIntensity={0.35} roughness={0.05} metalness={0.4} />
        </mesh>
      </group>
      {/* Bottom half */}
      <group position={[0, -1.06, 0]}>
        <RoundedBox args={[2.05, 2.07, 0.15]} radius={0.2} smoothness={6}>
          <meshStandardMaterial color="#1a0033" metalness={0.88} roughness={0.1} />
        </RoundedBox>
        <mesh position={[0, 0, 0.077]}>
          <planeGeometry args={[1.88, 1.9]} />
          <meshStandardMaterial color="#000" emissive="#aa00ff" emissiveIntensity={0.1} roughness={0.05} metalness={0.4} />
        </mesh>
      </group>
      {/* Hinge cylinder */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 1.9, 32]} />
        <meshStandardMaterial color="#555" metalness={1} roughness={0.05} />
      </mesh>
      {/* Cover display */}
      <mesh position={[0, 1.42, -0.079]}>
        <planeGeometry args={[1.4, 1.05]} />
        <meshStandardMaterial ref={coverRef} color="#000" emissive="#aa00ff" emissiveIntensity={0.25} />
      </mesh>
      <Lens pos={[-0.3, 1.75, -0.086]} r={0.1} />
      <LensInner pos={[-0.3, 1.75, -0.086]} />
      <Lens pos={[0.3, 1.75, -0.086]} r={0.085} />
      <LensInner pos={[0.3, 1.75, -0.086]} />
    </group>
  );
}

/* ─── Google Pixel ──────────────────────────────────────── */
export function PixelModel() {
  const bodyRef = useRef<Mesh>(null);
  const screenRef = useRef<MeshStandardMaterial>(null);
  useFrame((s) => {
    if (bodyRef.current) bodyRef.current.rotation.y = s.clock.elapsedTime * 0.4;
    if (screenRef.current)
      screenRef.current.emissiveIntensity = 0.35 + Math.sin(s.clock.elapsedTime * 2) * 0.12;
  });
  return (
    <group>
      <RoundedBox args={[1.88, 4.05, 0.12]} radius={0.18} smoothness={6} ref={bodyRef}>
        <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.25} />
      </RoundedBox>
      {/* Matte back accent panel */}
      <mesh position={[0, -0.5, -0.062]}>
        <planeGeometry args={[1.88, 2.5]} />
        <meshStandardMaterial color="#1e1e1e" metalness={0.4} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.062]}>
        <planeGeometry args={[1.7, 3.89]} />
        <meshStandardMaterial ref={screenRef} color="#000" emissive="#4285f4" emissiveIntensity={0.35} roughness={0.05} metalness={0.4} />
      </mesh>
      <mesh position={[0, 1.78, 0.065]}>
        <circleGeometry args={[0.07, 32]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Camera bar - full-width horizontal strip across top */}
      <mesh position={[0, 1.55, -0.065]}>
        <boxGeometry args={[1.65, 0.44, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <Lens pos={[-0.42, 1.55, -0.1]} r={0.12} />
      <LensInner pos={[-0.42, 1.55, -0.1]} />
      <Lens pos={[0.12, 1.55, -0.1]} r={0.1} />
      <LensInner pos={[0.12, 1.55, -0.1]} />
      {/* Temperature sensor */}
      <mesh position={[0.52, 1.55, -0.1]}>
        <boxGeometry args={[0.1, 0.1, 0.04]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Google G dot */}
      <mesh position={[-0.62, -1.5, 0.065]}>
        <circleGeometry args={[0.06, 16]} />
        <meshStandardMaterial color="#4285f4" emissive="#4285f4" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

/* ─── Xiaomi / Redmi ────────────────────────────────────── */
export function XiaomiModel() {
  const bodyRef = useRef<Mesh>(null);
  const screenRef = useRef<MeshStandardMaterial>(null);
  useFrame((s) => {
    if (bodyRef.current) bodyRef.current.rotation.y = s.clock.elapsedTime * 0.4;
    if (screenRef.current)
      screenRef.current.emissiveIntensity = 0.35 + Math.sin(s.clock.elapsedTime * 2) * 0.12;
  });
  return (
    <group>
      <RoundedBox args={[1.9, 4.1, 0.12]} radius={0.17} smoothness={6} ref={bodyRef}>
        <meshStandardMaterial color="#0d0d0d" metalness={0.88} roughness={0.1} />
      </RoundedBox>
      <mesh position={[0, 0, 0.062]}>
        <planeGeometry args={[1.72, 3.94]} />
        <meshStandardMaterial ref={screenRef} color="#000" emissive="#ff6900" emissiveIntensity={0.35} roughness={0.05} metalness={0.4} />
      </mesh>
      <mesh position={[0, 1.8, 0.065]}>
        <circleGeometry args={[0.07, 32]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Large circular camera island */}
      <mesh position={[-0.44, 1.5, -0.065]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.04, 48]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.2} />
      </mesh>
      <Lens pos={[-0.44, 1.62, -0.099]} r={0.13} />
      <LensInner pos={[-0.44, 1.62, -0.099]} />
      <Lens pos={[-0.6, 1.38, -0.099]} r={0.09} />
      <LensInner pos={[-0.6, 1.38, -0.099]} />
      <Lens pos={[-0.28, 1.38, -0.099]} r={0.07} />
      <LensInner pos={[-0.28, 1.38, -0.099]} />
      {/* Xiaomi orange dot branding */}
      <mesh position={[0.5, -1.6, 0.063]}>
        <circleGeometry args={[0.05, 16]} />
        <meshStandardMaterial color="#ff6900" emissive="#ff6900" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

/* ─── Generic ───────────────────────────────────────────── */
export function GenericModel() {
  const bodyRef = useRef<Mesh>(null);
  const screenRef = useRef<MeshStandardMaterial>(null);
  useFrame((s) => {
    if (bodyRef.current) bodyRef.current.rotation.y = s.clock.elapsedTime * 0.4;
    if (screenRef.current)
      screenRef.current.emissiveIntensity = 0.4 + Math.sin(s.clock.elapsedTime * 2) * 0.15;
  });
  return (
    <group>
      <RoundedBox args={[1.9, 4.0, 0.13]} radius={0.14} smoothness={6} ref={bodyRef}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </RoundedBox>
      <mesh position={[0, 0, 0.067]}>
        <planeGeometry args={[1.72, 3.84]} />
        <meshStandardMaterial ref={screenRef} color="#000" emissive="#00f0ff" emissiveIntensity={0.4} roughness={0.1} metalness={0.5} />
      </mesh>
      <mesh position={[-0.45, 1.45, -0.072]}>
        <boxGeometry args={[0.6, 0.6, 0.04]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.2} />
      </mesh>
      <Lens pos={[-0.58, 1.58, -0.1]} />
      <LensInner pos={[-0.58, 1.58, -0.1]} />
      <Lens pos={[-0.32, 1.32, -0.1]} />
      <LensInner pos={[-0.32, 1.32, -0.1]} />
    </group>
  );
}

/* ─── Main Selector ─────────────────────────────────────── */
export function PhoneModelByType({
  modelType,
  interactive = false,
  scale = 1,
}: {
  modelType?: PhoneModelType | string | null;
  interactive?: boolean;
  scale?: number;
}) {
  const ModelComponent = () => {
    switch (modelType) {
      case "iphone": return <IPhoneModel />;
      case "iphone-pro": return <IPhoneProModel />;
      case "samsung-s": return <SamsungSModel />;
      case "samsung-a": return <SamsungAModel />;
      case "samsung-fold": return <SamsungFoldModel />;
      case "samsung-flip": return <SamsungFlipModel />;
      case "pixel": return <PixelModel />;
      case "xiaomi": return <XiaomiModel />;
      default: return <GenericModel />;
    }
  };

  if (interactive) {
    return (
      <PresentationControls
        global
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
      >
        <group scale={scale}><ModelComponent /></group>
      </PresentationControls>
    );
  }
  return (
    <Float rotationIntensity={0} floatIntensity={1.5} speed={2}>
      <group scale={scale}><ModelComponent /></group>
    </Float>
  );
}
