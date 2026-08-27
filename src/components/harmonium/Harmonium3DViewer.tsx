"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

// A stylized, procedural 3D Harmonium model
function HarmoniumModel() {
  const group = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, "/harmonium-images/pur-1.webp");

  // Gentle floating animation
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Main Wooden Chassis (Bottom Box) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 1.2, 2.5]} />
        <meshStandardMaterial map={texture} roughness={0.5} metalness={0.1} color="#e6dac3" />
      </mesh>

      {/* Keyboard Bed Cutout Area (Top Front) */}
      <mesh position={[0, 0.7, 0.4]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.2, 1.3]} />
        <meshStandardMaterial color="#1f1411" roughness={0.9} />
      </mesh>

      {/* Bellows (Back Section) */}
      <group position={[0, 0.9, -0.6]}>
        {/* Bellows Base */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[3.6, 0.4, 0.8]} />
          <meshStandardMaterial map={texture} roughness={0.7} />
        </mesh>
        
        {/* Bellows Folds (Stylized) */}
        {[-1.5, -1.0, -0.5, 0, 0.5, 1.0, 1.5].map((x, i) => (
          <mesh key={i} position={[x, 0.2, 0]} castShadow>
            <boxGeometry args={[0.05, 0.8, 0.7]} />
            <meshStandardMaterial color="#e0d7c6" roughness={0.9} />
          </mesh>
        ))}
        {/* Back board of bellows */}
        <mesh position={[0, 0.2, -0.4]} castShadow>
          <boxGeometry args={[3.6, 0.8, 0.1]} />
          <meshStandardMaterial map={texture} roughness={0.6} />
        </mesh>
      </group>

      {/* Decorative Brass Corners / Stops */}
      {[-1.8, 1.8].map((x, i) => (
        <group key={`brass-${i}`}>
          <mesh position={[x, 0.2, 1.3]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.4, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[x, 0.2, -1.3]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.4, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Stops (Knobs) on the front panel */}
          <mesh position={[x * 0.5, -0.2, 1.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
            <meshStandardMaterial color="#111" roughness={0.5} />
          </mesh>
          <mesh position={[x * 0.8, -0.2, 1.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
            <meshStandardMaterial color="#111" roughness={0.5} />
          </mesh>
        </group>
      ))}
      
      {/* Central big stop knob */}
      <mesh position={[0, -0.2, 1.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
        <meshStandardMaterial color="#3E2723" roughness={0.8} />
      </mesh>

      {/* The Keys */}
      <group position={[-1.7, 0.85, 0.6]}>
        {Array.from({ length: 24 }).map((_, i) => {
          const isSharp = [1, 3, 6, 8, 10].includes(i % 12);
          const xOffset = i * 0.145;
          
          if (!isSharp) {
            return (
              <mesh key={`white-${i}`} position={[xOffset, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.13, 0.1, 0.8]} />
                <meshStandardMaterial color="#fcfbf9" roughness={0.2} />
              </mesh>
            );
          }
          return null;
        })}
        
        {Array.from({ length: 24 }).map((_, i) => {
          const isSharp = [1, 3, 6, 8, 10].includes(i % 12);
          const xOffset = i * 0.145;
          
          if (isSharp) {
            return (
              <mesh key={`black-${i}`} position={[xOffset, 0.08, -0.15]} castShadow receiveShadow>
                <boxGeometry args={[0.08, 0.1, 0.5]} />
                <meshStandardMaterial color="#111111" roughness={0.4} />
              </mesh>
            );
          }
          return null;
        })}
      </group>
    </group>
  );
}

export function Harmonium3DViewer() {
  return (
    <div className="w-full h-full relative bg-sandstone/10 rounded-sm overflow-hidden border border-wood/20 cursor-grab active:cursor-grabbing">
      {/* Hint overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-ivory/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
        <p className="text-[10px] uppercase tracking-widest text-charcoal font-medium">Drag to Rotate 360°</p>
      </div>

      <Canvas camera={{ position: [4, 3, 5], fov: 45 }} shadows>
        {/* Lighting setup for a cinematic, premium look */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={0.1}
          shadow-camera-far={20}
          shadow-camera-top={5}
          shadow-camera-right={5}
          shadow-camera-bottom={-5}
          shadow-camera-left={-5}
        />
        <spotLight position={[-5, 5, -5]} intensity={0.5} color="#d4af37" />
        
        {/* Environment Map for realistic reflections on wood and brass */}
        <Environment preset="studio" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <HarmoniumModel />
        </Float>

        {/* Soft contact shadow on the floor */}
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />

        {/* Orbit Controls to allow the user to spin the model 360 degrees */}
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2 + 0.1} // Prevent going entirely below the object
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
