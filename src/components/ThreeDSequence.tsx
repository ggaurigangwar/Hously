import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
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

  const densityObjects = useMemo(() => {
    return [
      { type: 'bed', pos: [-6, 2.3, -6], scale: [2.5, 0.6, 2.5], material: 'fabric', color: '#B5AFA4' },
      { type: 'wardrobe', pos: [-8, 3, -6], scale: [0.8, 2.5, 3], material: 'wood', color: '#4A3728' },
      { type: 'rug', pos: [-6, 2.05, -5], scale: [4, 0.05, 3], material: 'fabric', color: '#D3CFC4' },
      { type: 'sofa_base', pos: [4, 2.3, 3], scale: [3.5, 0.5, 1.2], material: 'fabric', color: '#8C847A' },
      { type: 'sofa_back', pos: [4, 2.6, 2.5], scale: [3.5, 0.6, 0.3], material: 'fabric', color: '#8C847A' },
      { type: 'tv_unit', pos: [4, 2.4, 7], scale: [4, 0.8, 0.5], material: 'wood', color: '#2C2A28' },
      { type: 'coffee_table', pos: [4, 2.2, 4.5], scale: [1.5, 0.3, 1.5], material: 'marble', color: '#FAF9F6' },
      { type: 'island', pos: [5, 2.5, -4], scale: [3, 1.2, 1.2], material: 'marble', color: '#FFFFFF' },
      { type: 'dining_table', pos: [0, 2.3, 4], scale: [2.5, 0.8, 1.5], material: 'wood', color: '#5C4033' },
      { type: 'bed_small', pos: [7, 2.3, -5], scale: [1.8, 0.5, 2], material: 'fabric', color: '#DCD8D0' },
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

export function RealisticArchitecturalLanding() {
  const villaRef = useRef<THREE.Group>(null);

  // Procedural geometry nodes for the "Luxe" Villa
  const volumes = useMemo(() => [
    // Foundation & Site
    { pos: [0, -0.3, 0], scale: [40, 0.6, 40], mat: 'concrete_dark' },
    { pos: [0, 0.1, 8], scale: [6, 0.2, 12], mat: 'stone' }, // Entrance path
    
    // Ground Floor Main Volume
    { pos: [-4, 2.3, -2], scale: [14, 4, 10], mat: 'concrete' },
    { pos: [5, 2.3, -3], scale: [4, 4, 8], mat: 'wood' },
    
    // First Floor Cantilevered Volume
    { pos: [0, 5.5, -4], scale: [16, 3, 10], mat: 'concrete' },
    { pos: [-6, 5.5, 0], scale: [6, 3, 4], mat: 'wood_dark' },
    
    // Glass Walls (Floor-to-ceiling)
    { pos: [-4, 2.5, 3.1], scale: [12, 3.8, 0.1], mat: 'glass' }, // Ground front
    { pos: [0, 5.5, 1.1], scale: [10, 2.8, 0.1], mat: 'glass' }, // First front
    { pos: [-9.1, 2.5, -2], scale: [0.1, 3.8, 6], mat: 'glass' }, // Side
    
    // Roof Planes
    { pos: [0, 7.2, -4], scale: [18, 0.4, 12], mat: 'slate' },
    { pos: [-4, 4.5, -2], scale: [15, 0.4, 11], mat: 'slate' },
    
    // Interior Detail (Visible through glass)
    { pos: [-4, 1.5, -1], scale: [4, 0.8, 2.5], mat: 'leather' }, // Sofa
    { pos: [2, 6, -3], scale: [1, 2, 0.1], mat: 'art' }, // Wall art
  ], []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const radius = 26;
    state.camera.position.x = Math.sin(t * 0.05) * radius;
    state.camera.position.z = Math.cos(t * 0.05) * radius;
    state.camera.position.y = 12 + Math.sin(t * 0.1) * 3;
    state.camera.lookAt(0, 2, 0);
    
    if (villaRef.current) {
      villaRef.current.rotation.y = Math.sin(t * 0.02) * 0.03;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[20, 30, 20]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
      <spotLight position={[-15, 20, 10]} intensity={2500} angle={0.4} penumbra={1} color="#FFF5E6" castShadow />
      <pointLight position={[0, 3, 0]} intensity={500} color="#FFD1A3" /> {/* Interior Glow */}
      
      <group ref={villaRef}>
        {volumes.map((v, i) => {
          let material;
          switch (v.mat) {
            case 'glass':
                material = <meshPhysicalMaterial 
                  color="#E8F4F8" 
                  transmission={1} 
                  thickness={1.5} 
                  roughness={0.02} 
                  ior={1.5} 
                  transparent 
                  opacity={0.4}
                />;
                break;
            case 'wood':
                material = <meshStandardMaterial color="#8C7E6A" roughness={0.7} metalness={0.1} />;
                break;
            case 'wood_dark':
                material = <meshStandardMaterial color="#4A3728" roughness={0.8} />;
                break;
            case 'concrete':
                material = <meshStandardMaterial color="#FAF9F6" roughness={0.9} />;
                break;
            case 'concrete_dark':
                material = <meshStandardMaterial color="#EAE6DF" roughness={1} />;
                break;
            case 'stone':
                material = <meshStandardMaterial color="#D1CDBC" roughness={0.9} />;
                break;
            case 'slate':
                material = <meshStandardMaterial color="#1C1C1A" roughness={0.8} metalness={0.3} />;
                break;
            case 'leather':
                material = <meshStandardMaterial color="#5C4033" roughness={0.6} />;
                break;
            default:
                material = <meshStandardMaterial color="#FFFFFF" />;
          }
          return (
            <mesh key={i} position={v.pos as any} castShadow receiveShadow>
              <boxGeometry args={v.scale as any} />
              {material}
            </mesh>
          );
        })}
      </group>
      
      <ContactShadows resolution={1024} scale={60} blur={2.5} opacity={0.4} far={30} color="#1C1C1A" />
      <Environment preset="city" />
    </>
  );
}

// -------------------------------------------------------------
// VUE 4: The Studio Dashboard Hero (Interactive Floating Model)
// -------------------------------------------------------------
export function DashboardHero3D() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef} scale={[0.45, 0.45, 0.45]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[10, 0.2, 8]} />
          <meshStandardMaterial color="#EAE6DF" roughness={0.9} />
        </mesh>
        <mesh position={[-2, 1.6, -1]} castShadow receiveShadow>
          <boxGeometry args={[6, 3, 5]} />
          <meshStandardMaterial color="#EAE6DF" roughness={0.9} />
        </mesh>
        <mesh position={[3, 1.1, 1]} castShadow receiveShadow>
          <boxGeometry args={[4, 2, 4]} />
          <meshStandardMaterial color="#8C7E6A" roughness={0.8} />
        </mesh>
        <mesh position={[-0.5, 3.2, -1]} castShadow receiveShadow>
          <boxGeometry args={[7, 0.2, 6]} />
          <meshStandardMaterial color="#1C1C1A" roughness={0.9} />
        </mesh>
        <mesh position={[3, 2.2, 1]} castShadow receiveShadow>
          <boxGeometry args={[4.5, 0.2, 4.5]} />
          <meshStandardMaterial color="#1C1C1A" roughness={0.9} />
        </mesh>
        <mesh position={[-2, 1.6, 1.6]} castShadow receiveShadow>
          <boxGeometry args={[4, 2.8, 0.1]} />
          <meshPhysicalMaterial color="#E8F4F8" transmission={1} opacity={1} roughness={0} thickness={1} transparent />
        </mesh>
        <mesh position={[1, -0.05, 5]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.01, 4]} />
          <meshStandardMaterial color="#D1CDBC" roughness={1} />
        </mesh>
        <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4} color="#1C1C1A" />
      </group>
    </Float>
  );
}

