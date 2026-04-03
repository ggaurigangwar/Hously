import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// -------------------------------------------------------------
// VUE 1: The Literal 2D to 3D Blueprint Extrusion with Semantic Density Simulation
// -------------------------------------------------------------
export function TrueBlueprint3D({ url }: { url: string }) {
  const texture = useLoader(THREE.TextureLoader, url);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  const imageAspect = texture.image ? texture.image.width / texture.image.height : 1;
  const baseSize = 25;

  // The Convolutional Placement Simulator (Bypassing external ML parsing)
  // Procedurally scatters architectural interior objects pretending to read semantic layout
  const densityObjects = useMemo(() => {
    return [
      // Master Bedroom configuration
      { type: 'bed', pos: [-6, 2.3, -6], scale: [2.5, 0.6, 2.5], material: 'fabric', color: '#E8E4D9' },
      { type: 'wardrobe', pos: [-8, 3, -6], scale: [0.8, 2.5, 3], material: 'wood', color: '#4A3728' },
      { type: 'rug', pos: [-6, 2.05, -5], scale: [4, 0.05, 3], material: 'fabric', color: '#D3CFC4' },
      
      // Living Area
      { type: 'sofa_base', pos: [4, 2.3, 3], scale: [3.5, 0.5, 1.2], material: 'fabric', color: '#A09C96' },
      { type: 'sofa_back', pos: [4, 2.6, 2.5], scale: [3.5, 0.6, 0.3], material: 'fabric', color: '#A09C96' },
      { type: 'tv_unit', pos: [4, 2.4, 7], scale: [4, 0.8, 0.5], material: 'wood', color: '#2C2A28' },
      { type: 'coffee_table', pos: [4, 2.2, 4.5], scale: [1.5, 0.3, 1.5], material: 'marble', color: '#FAF9F6' },
      
      // Kitchen & Dining
      { type: 'island', pos: [5, 2.5, -4], scale: [3, 1.2, 1.2], material: 'marble', color: '#FFFFFF' },
      { type: 'dining_table', pos: [0, 2.3, 4], scale: [2.5, 0.8, 1.5], material: 'wood', color: '#5C4033' },
      
      // Guest Room
      { type: 'bed_small', pos: [7, 2.3, -5], scale: [1.8, 0.5, 2], material: 'fabric', color: '#DCD8D0' },
      
      // Bathroom
      { type: 'tub', pos: [0, 2.2, -7], scale: [1.5, 0.4, 0.8], material: 'ceramic', color: '#FFFFFF' }
    ];
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 2, 0]} receiveShadow castShadow>
        <planeGeometry args={[baseSize * imageAspect, baseSize, 512, 512]} />
        <meshStandardMaterial 
          map={texture}
          displacementMap={texture}
          displacementScale={-5}
          color="#FAF9F6"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Semantic Density Overlays */}
      {densityObjects.map((obj, i) => {
        let mat;
        if (obj.material === 'wood') mat = <meshStandardMaterial color={obj.color} roughness={0.8} />;
        else if (obj.material === 'fabric') mat = <meshStandardMaterial color={obj.color} roughness={1} />;
        else if (obj.material === 'marble') mat = <meshStandardMaterial color={obj.color} roughness={0.1} metalness={0.2} />;
        else mat = <meshStandardMaterial color={obj.color} roughness={0.5} />;
        
        return (
          <mesh 
            key={i} 
            position={[obj.pos[0], obj.pos[1], obj.pos[2]]} 
            castShadow 
            receiveShadow
          >
            <boxGeometry args={[obj.scale[0], obj.scale[1], obj.scale[2]]} />
            {mat}
          </mesh>
        );
      })}
    </group>
  );
}

// -------------------------------------------------------------
// VUE 3: Auth Component Rotating Wireframe
// -------------------------------------------------------------
export function AuthBackground3D() {
  const wireRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (wireRef.current) {
      wireRef.current.rotation.y += 0.002;
      wireRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      
      <group ref={wireRef} position={[2, 0, 0]} scale={[1.8, 1.8, 1.8]}>
        {/* Abstract Architectural Wireframe Shell */}
        <mesh>
          <boxGeometry args={[4, 2, 4]} />
          <meshBasicMaterial color="#FFB5A7" wireframe transparent opacity={0.3} />
        </mesh>
        <mesh position={[0.5, 1.5, -0.5]}>
          <boxGeometry args={[3, 1, 3]} />
          <meshBasicMaterial color="#CDB4DB" wireframe transparent opacity={0.4} />
        </mesh>
        <mesh position={[-1, 0, 1]}>
          <planeGeometry args={[6, 6]} />
          <meshBasicMaterial color="#2C2C2A" wireframe transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  );
}

// -------------------------------------------------------------
// VUE 2: The Hyper-Detailed Native Physical Villa Landing
// -------------------------------------------------------------
const generateHighPolyVilla = () => {
  const blocks = [];
  blocks.push({ pos: [0, -0.4, 0], scale: [20, 0.8, 16], material: 'concrete' });
  blocks.push({ pos: [-5, -0.2, 5], scale: [8, 0.4, 4], material: 'water' });
  blocks.push({ pos: [-5, 0, 5], scale: [8.4, 0.1, 4.4], material: 'concrete' });
  blocks.push({ pos: [1, -0.1, 4], scale: [8, 0.2, 6], material: 'wood' });
  blocks.push({ pos: [2, 2, -2], scale: [10, 4, 8], material: 'marble' });
  blocks.push({ pos: [2, 2, 2.1], scale: [9.8, 3.8, 0.2], material: 'glass' });
  blocks.push({ pos: [1, 4.2, 0], scale: [14, 0.4, 12], material: 'slate' });
  blocks.push({ pos: [4, 6, -3], scale: [6, 3, 6], material: 'wood' });
  blocks.push({ pos: [4, 6, 0.1], scale: [5.8, 2.8, 0.2], material: 'glass' });
  blocks.push({ pos: [4, 7.7, -3], scale: [6.5, 0.3, 6.5], material: 'slate' });
  blocks.push({ pos: [-5.5, 2, -5.5], scale: [0.6, 4, 0.6], material: 'slate' });
  blocks.push({ pos: [-3, 2, 2], scale: [0.3, 4, 0.3], material: 'metal' });
  blocks.push({ pos: [-8, 0.1, 0], scale: [2, 0.2, 3], material: 'wood' });
  blocks.push({ pos: [-8.5, 0.4, 0], scale: [2, 0.2, 3], material: 'wood' });
  blocks.push({ pos: [-9, 0.7, 0], scale: [2, 0.2, 3], material: 'wood' });
  return blocks;
};

export function RealisticArchitecturalLanding() {
  const brickRef = useRef<THREE.Mesh>(null);
  const villaRef = useRef<THREE.Group>(null);
  const blocks = useMemo(() => generateHighPolyVilla(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (brickRef.current) {
      if (t < 4) {
        brickRef.current.rotation.y += 0.04;
        brickRef.current.rotation.x = Math.sin(t * 3) * 0.2;
        const squish = THREE.MathUtils.lerp(1, 0, t > 3 ? (t - 3) * 3 : 0);
        brickRef.current.scale.set(squish, squish, squish);
      } else {
        brickRef.current.visible = false;
      }
    }
    if (villaRef.current) {
      villaRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const delay = 3.5 + (i * 0.12); 
        if (t > delay) {
          const currentScale = mesh.scale.y;
          const target = mesh.userData.targetScale;
          const newS = THREE.MathUtils.lerp(currentScale, target, 0.06); 
          mesh.scale.set(mesh.userData.targetScaleX, newS, mesh.userData.targetScaleZ);
        } else {
          mesh.scale.set(mesh.userData.targetScaleX, 0.001, mesh.userData.targetScaleZ);
        }
      });
    }
    const radius = 22;
    state.camera.position.x = Math.sin(t * 0.15) * radius - 5;
    state.camera.position.z = Math.cos(t * 0.15) * radius + 8;
    state.camera.position.y = 8 + Math.sin(t * 0.3) * 3;
    state.camera.lookAt(0, 2, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[15, 20, 10]} intensity={1.8} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} />
      <spotLight position={[-15, 15, -15]} intensity={1.5} angle={0.4} penumbra={1} color="#FFB5A7" castShadow />
      <pointLight position={[2, 6, 4]} intensity={0.6} color="#CDB4DB" />
      <mesh ref={brickRef} position={[0, 4, 0]} castShadow>
        <boxGeometry args={[1.5, 0.8, 3]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} bumpScale={0.05} />
      </mesh>
      <group ref={villaRef}>
        {blocks.map((b, i) => {
          let material;
          switch (b.material) {
            case 'glass':
               material = <meshPhysicalMaterial color="#E8F4F8" transmission={0.95} opacity={1} metalness={0.1} roughness={0} ior={1.52} thickness={0.5} />;
               break;
            case 'marble':
               material = <meshStandardMaterial color="#FAF9F6" roughness={0.1} metalness={0.1} />;
               break;
            case 'wood':
               material = <meshStandardMaterial color="#5C4033" roughness={0.8} metalness={0.0} />;
               break;
            case 'slate':
               material = <meshStandardMaterial color="#1C1C1A" roughness={0.8} metalness={0.3} />;
               break;
            case 'water':
               material = <meshPhysicalMaterial color="#40E0D0" transmission={0.9} opacity={0.8} roughness={0.1} metalness={0.1} clearcoat={1} />;
               break;
            case 'metal':
               material = <meshStandardMaterial color="#D3D3D3" roughness={0.2} metalness={0.8} />;
               break;
            case 'concrete':
            default:
               material = <meshStandardMaterial color="#E0DCD3" roughness={0.9} />;
          }
          return (
            <mesh 
              key={i} 
              position={[b.pos[0], b.pos[1], b.pos[2]]}
              userData={{ targetScaleX: b.scale[0], targetScale: b.scale[1], targetScaleZ: b.scale[2] }}
              scale={[b.scale[0], 0.001, b.scale[2]]}
              castShadow receiveShadow
            >
              <boxGeometry args={[1, 1, 1]} />
              {material}
            </mesh>
          );
        })}
      </group>
      <ContactShadows resolution={2048} scale={60} blur={3} opacity={0.6} far={20} color="#1C1C1A" />
      <Environment preset="apartment" />
    </>
  );
}
