"use client";
import React, { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars as StarCloud, Trail, Float, Torus } from "@react-three/drei";
import { useMotionValue, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import * as THREE from "three";

function Comet({ scrollProgress }: { scrollProgress: any }) {
  const ref = useRef<THREE.Mesh>(null);
  const cometColor = useTransform(scrollProgress, [0.3, 0.6], ["#2dd4bf", "#fbbf24"]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    if (scrollProgress.get() > 0.35) {
      ref.current.position.x += 22 * delta;
      ref.current.position.y -= 9 * delta;
      if (ref.current.position.x > 30) ref.current.position.set(-30, 15, -10);
    } else {
      ref.current.position.set(-30, 15, -10);
    }
  });

  return (
    <Trail width={1.5} length={15} color={new THREE.Color(cometColor.get())} attenuation={(t) => t * t}>
      <mesh ref={ref} position={[-30, 15, -10]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={cometColor.get()} />
      </mesh>
    </Trail>
  );
}

function Planet({ distance, size, color, speed, ring, atmosphereColor }: any) {
  const orbitRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (orbitRef.current) orbitRef.current.rotation.y += speed * (hovered ? 0.005 : 0.002);
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.5;
  });

  return (
    <group ref={orbitRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.02, distance + 0.02, 128]} />
        <meshBasicMaterial color="#ffffff" opacity={0.12} transparent side={THREE.DoubleSide} />
      </mesh>
      <group position={[distance, 0, 0]}>
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh scale={[1.2, 1.2, 1.2]}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshBasicMaterial color={atmosphereColor} transparent opacity={hovered ? 0.4 : 0.15} side={THREE.BackSide} />
          </mesh>
          <mesh ref={planetRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} emissive={color} emissiveIntensity={hovered ? 0.8 : 0.3} />
          </mesh>
          {ring && (
            <Torus args={[size + 0.2, 0.02, 2, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
              <meshStandardMaterial color={color} opacity={0.5} transparent />
            </Torus>
          )}
        </Float>
      </group>
    </group>
  );
}

function Scene() {
  const scrollProgress = useMotionValue(0);
  const sunRef = useRef<THREE.PointLight>(null);
  const sunGroupRef = useRef<THREE.Group>(null);
  const sunMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const coronaMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  useLenis(({ progress }: any) => {
    scrollProgress.set(progress);
  });

  // Camera transforms
  const zPos = useTransform(scrollProgress, [0, 1], [15, 6]);
  const yPos = useTransform(scrollProgress, [0, 1], [8, 0.8]);
  const xRot = useTransform(scrollProgress, [0, 1], [-0.4, 0.12]);

  // Eclipse Dynamics
  const sunIntensity = useTransform(scrollProgress, [0.15, 0.85], [20, 0.8]);
  const sunColor = useTransform(scrollProgress, [0.15, 0.85], ["#ffcc33", "#ff1100"]);
  const sunScale = useTransform(scrollProgress, [0.2, 0.8], [1, 0.82]);
  const coronaOpacity = useTransform(scrollProgress, [0.15, 0.85], [0.15, 0.8]);

  useFrame((state) => {
    // 🛰️ LERPING: Native Three.js lerp is much faster than Motion's loop
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, zPos.get(), 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, yPos.get(), 0.05);
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, xRot.get(), 0.05);

    // Optimized Lighting updates
    if (sunRef.current) {
      sunRef.current.intensity = sunIntensity.get();
      sunRef.current.color.set(sunColor.get());
    }
    if (sunMaterialRef.current) sunMaterialRef.current.color.set(sunColor.get());
    if (coronaMaterialRef.current) {
      coronaMaterialRef.current.color.set(sunColor.get());
      coronaMaterialRef.current.opacity = coronaOpacity.get();
    }
    if (sunGroupRef.current) {
      const s = sunScale.get();
      sunGroupRef.current.scale.set(s, s, s);
    }
  });

  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight ref={sunRef} position={[0, 0, 0]} />
      <StarCloud radius={100} depth={50} count={9000} factor={4} saturation={0} fade speed={1.2} />
      <Comet scrollProgress={scrollProgress} />

      <group ref={sunGroupRef}>
        <mesh>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshBasicMaterial ref={sunMaterialRef} color="#ffcc33" />
        </mesh>
        <mesh scale={[1.5, 1.5, 1.5]}>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshBasicMaterial ref={coronaMaterialRef} color="#ffcc33" transparent opacity={0.2} />
        </mesh>
      </group>

      <Planet distance={4} size={0.15} color="#ff6b6b" speed={1.2} atmosphereColor="#ff0000" />
      <Planet distance={6.5} size={0.3} color="#48dbfb" speed={0.8} atmosphereColor="#00ffff" />
      <Planet distance={9.5} size={0.45} color="#feca57" speed={0.5} ring atmosphereColor="#ffa500" />
      <Planet distance={13} size={0.25} color="#54a0ff" speed={0.3} atmosphereColor="#0000ff" />
    </>
  );
}

export default function StarCanvas() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#02010a]">
      <Canvas camera={{ position: [0, 8, 15], fov: 42 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}