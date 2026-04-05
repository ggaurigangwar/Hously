import { useLoader } from '@react-three/fiber';
import { ContactShadows, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';
import { ModernSofa, LuxuryBed, DiningSet, IndoorPlant } from './DetailedFurniture';

interface PhotorealisticPlan3DProps {
  url: string;
  mode?: '2d' | '3d';
}

export function PhotorealisticPlan3D({ url, mode = '3d' }: PhotorealisticPlan3DProps) {
  const texture = useLoader(THREE.TextureLoader, url);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearFilter;

  const imageAspect = texture.image ? texture.image.width / texture.image.height : 1;
  const baseSize = 30;

  // 1. "Before" Mode (2D Blueprint): White architectural paper with black lines
  const blueprintMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FFFFFF', 
    map: texture,
    roughness: 1,
    metalness: 0
  }), [texture]);

  // 2. "After" Mode (3D Reality): High-end Oak Hardwood with clearcoat
  const physicalOakMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#D4C9BF', // Luxury Light Oak
    map: texture, // Preserve architectural details from the source
    roughness: 0.15,
    metalness: 0.05,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    reflectivity: 0.5,
  }), [texture]);

  return (
    <group>
      <SoftShadows size={25} samples={10} focus={0.5} />
      
      {/* Background Plane (Deep Neutral) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#FAF9F6" roughness={1} />
      </mesh>

      {/* Main Floor / Paper Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[baseSize * imageAspect, baseSize]} />
        <primitive 
          object={mode === '2d' ? blueprintMaterial : physicalOakMaterial} 
          attach="material" 
        />
      </mesh>

      {/* 3D Structural Walls (Only rendered in 3D Mode) */}
      {mode === '3d' && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} castShadow receiveShadow>
          <planeGeometry args={[baseSize * imageAspect, baseSize, 1024, 1024]} />
          <meshStandardMaterial 
            displacementMap={texture}
            displacementScale={-5.5}
            displacementBias={5.4} 
            color="#FAF9F6" 
            roughness={0.9}
            metalness={0}
          />
        </mesh>
      )}

      {/* Staged Content (Only in 3D mode) */}
      {mode === '3d' && (
          <group position={[0, 0.05, 0]}>
             <ModernSofa position={[6, 0.1, 4]} scale={[1.2, 1.2, 1.2]} />
             <LuxuryBed position={[-8, 0.1, -6]} scale={[1.1, 1.1, 1.1]} />
             <DiningSet position={[7, 0.1, -6]} scale={[0.9, 0.9, 0.9]} />
             <IndoorPlant position={[12, 0.1, 12]} scale={[1, 1, 1]} />
             <IndoorPlant position={[-12, 0.1, 4]} scale={[0.8, 1, 0.8]} color="#4D5B4D" />
          </group>
      )}

      {/* Balanced Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[20, 40, 25]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
        shadow-bias={-0.0001}
      />
      <PointLight position={[-10, 5, -10]} intensity={0.5} color="#FDFBD4" />
      
      <ContactShadows 
         position={[0, -0.01, 0]} 
         opacity={0.65} 
         scale={40} 
         blur={2.4} 
         far={8} 
         resolution={1024} 
         color="#000000" 
      />
    </group>
  );
}

function PointLight({ position, intensity, color }: any) {
    return <pointLight position={position} intensity={intensity} color={color} castShadow shadow-bias={-0.001} />;
}
