import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

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

  return (
    <group>
      {/* Background Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#FAF9F6" />
      </mesh>

      {/* Main Floor (Reality Context) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[baseSize * imageAspect, baseSize]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={mode === '2d'}
          opacity={1}
        />
      </mesh>

      {/* 3D Structural Extrusion: Baseline Mode */}
      {mode === '3d' && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <planeGeometry args={[baseSize * imageAspect, baseSize, 1, 1]} />
          <meshStandardMaterial 
            color="#FFFFFF" 
            roughness={1}
            metalness={0}
            transparent
            opacity={0.1}
          />
        </mesh>
      )}

    </group>
  );
}
