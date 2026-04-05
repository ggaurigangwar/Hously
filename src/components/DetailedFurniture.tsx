import * as THREE from 'three';
import { useMemo } from 'react';

/**
 * Premium Modern Sofa with cushions and base frame.
 */
export function ModernSofa({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1], color = "#B5AFA4" }: any) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Base Frame */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.3, 1.8]} />
        <meshStandardMaterial color="#2C2C2A" roughness={0.8} />
      </mesh>
      {/* Main Seat Cushion */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.4, 1.6]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      {/* Back Rest */}
      <mesh position={[0, 0.8, -0.7]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.7, 0.3]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      {/* Side Arms */}
      <mesh position={[-1.75, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.6, 1.6]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[1.75, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.6, 1.6]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );
}

/**
 * High-End Master Bed with pillows and headboard.
 */
export function LuxuryBed({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1], color = "#EAE6DF" }: any) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Mattress */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.6, 5]} />
        <meshStandardMaterial color={color} roughness={1} />
      </mesh>
      {/* Headboard */}
      <mesh position={[0, 0.8, -2.4]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 1.4, 0.2]} />
        <meshStandardMaterial color="#8C847A" roughness={0.8} />
      </mesh>
      {/* Pillows */}
      <mesh position={[-0.8, 0.65, -2]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.2, 0.8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
      </mesh>
      <mesh position={[0.8, 0.65, -2]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.2, 0.8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
      </mesh>
    </group>
  );
}

/**
 * Modern Dining Set with marble table and minimalist chairs.
 */
export function DiningSet({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }: any) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Marble Table */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshPhysicalMaterial color="#FFFFFF" roughness={0.05} metalness={0.1} clearcoat={1} />
      </mesh>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.9, 0.2]} />
        <meshStandardMaterial color="#2C2C2A" />
      </mesh>
      {/* Chairs (Simplified abstract chairs) */}
      {[[-1.2, 0.5, 0], [1.2, 0.5, 0], [0, 0.5, -0.8], [0, 0.5, 0.8]].map((p, i) => (
        <group key={i} position={p as any}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="#8C847A" />
            </mesh>
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.5, 0.8, 0.1]} />
                <meshStandardMaterial color="#8C847A" />
            </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Indoor Plant with realistic pot and foliage nodes.
 */
export function IndoorPlant({ position = [0, 0, 0], scale = [1, 1, 1], color = "#5D6B5D" }: any) {
  return (
    <group position={position} scale={scale}>
      {/* Ceramic Pot */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.3, 0.8, 12]} />
        <meshStandardMaterial color="#EAE6DF" roughness={0.5} />
      </mesh>
      {/* Leafy nodes (abstracted spheres for high-end look) */}
      <group position={[0, 1.2, 0]}>
        {[0, 1, 2, 3, 4].map((i) => (
            <mesh key={i} position={[Math.sin(i)*0.4, i*0.3, Math.cos(i)*0.4]} castShadow>
                <sphereGeometry args={[0.3, 8, 8]} />
                <meshStandardMaterial color={color} roughness={1} />
            </mesh>
        ))}
      </group>
    </group>
  );
}
