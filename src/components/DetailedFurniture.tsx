import * as THREE from 'three';

/**
 * Premium Modern Sofa with cushions and base frame.
 */
export function ModernSofa({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1], isL = false }: any) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Main Section */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.7, 1.2]} />
        <meshStandardMaterial color="#2C2C2A" roughness={0.8} />
      </mesh>
      {/* L-Shape extension if enabled */}
      {isL && (
        <mesh position={[1.4, 0.35, 1.4]} rotation={[0, Math.PI/2, 0]} rotation-y={Math.PI/2} castShadow receiveShadow>
            <boxGeometry args={[1.6, 0.7, 1.2]} />
            <meshStandardMaterial color="#2C2C2A" roughness={0.8} />
        </mesh>
      )}
      {/* Backrest */}
      <mesh position={[0, 0.8, -0.45]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.8, 0.3]} />
        <meshStandardMaterial color="#2C2C2A" roughness={0.8} />
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

/**
 * Premium Kitchen Island with Marble details.
 */
export function KitchenIsland({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }: any) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Main Island Body */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 0.9, 1.8]} />
        <meshPhysicalMaterial color="#FFFFFF" roughness={0.05} metalness={0.05} clearcoat={1} />
      </mesh>
      {/* Sink Cutout detail */}
      <mesh position={[1, 0.91, 0]} castShadow>
        <boxGeometry args={[0.8, 0.02, 0.6]} />
        <meshStandardMaterial color="#2C2C2A" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * Modern Freestanding Bathtub.
 */
export function LuxuryTub({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }: any) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 0.8, 0.7, 32]} />
        <meshPhysicalMaterial color="#FFFFFF" roughness={0.1} metalness={0.1} clearcoat={1} />
      </mesh>
    </group>
  );
}

/**
 * High-End Office Setup.
 */
export function OfficeSetup({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }: any) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Desk */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.8, 1.2]} />
        <meshStandardMaterial color="#2C2C2A" roughness={0.7} />
      </mesh>
      {/* Desk Top */}
      <mesh position={[0, 0.825, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.05, 1.3]} />
        <meshStandardMaterial color="#8C847A" roughness={0.9} />
      </mesh>
      {/* Chair Placeholder */}
      <mesh position={[0, 0.5, 1.2]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 1, 0.6]} />
        <meshStandardMaterial color="#2C2C2A" />
      </mesh>
    </group>
  );
}

/**
 * Minimalist Window Frame.
 */
export function WindowFrame({ position, args, rotation = [0, 0, 0] }: any) {
  return (
    <group position={position} rotation={rotation}>
        {/* Frame */}
        <mesh castShadow>
            <boxGeometry args={[args[0], args[1], 0.1]} />
            <meshStandardMaterial color="#1A1A1A" metalness={1} roughness={0.2} />
        </mesh>
        {/* Glass */}
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[args[0] - 0.2, args[1] - 0.2, 0.05]} />
            <meshPhysicalMaterial 
               color="#E0FFFF" 
               transparent 
               opacity={0.15} 
               thickness={0.1} 
               roughness={0} 
               metalness={0.1}
               transmission={0.9}
               ior={1.5}
            />
        </mesh>
    </group>
  );
}

/**
 * Massive 10-Seat Dining Arrangement.
 */
export function DiningSetLarge({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }: any) {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Massive Table */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
                <boxGeometry args={[6, 0.1, 1.8]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.1} />
            </mesh>
            {/* Legs */}
            {[[-2.5, 0.35, 0.6], [2.5, 0.35, 0.6], [-2.5, 0.35, -0.6], [2.5, 0.35, -0.6]].map((p, i) => (
                <mesh key={i} position={p as any} castShadow>
                    <boxGeometry args={[0.1, 0.7, 0.1]} />
                    <meshStandardMaterial color="#1A1A1A" />
                </mesh>
            ))}
            {/* 10 Chairs */}
            {[-2.2, -1.1, 0, 1.1, 2.2].map((x, i) => (
                <group key={i}>
                    <mesh position={[x, 0.45, 1.1]} rotation={[0, 0, 0]} castShadow>
                        <boxGeometry args={[0.6, 0.9, 0.6]} />
                        <meshStandardMaterial color="#2C2C2A" />
                    </mesh>
                    <mesh position={[x, 0.45, -1.1]} rotation={[0, 0, 0]} castShadow>
                        <boxGeometry args={[0.6, 0.9, 0.6]} />
                        <meshStandardMaterial color="#2C2C2A" />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

/**
 * Detailed Walk-In Closet Extrusion.
 */
export function WalkInCloset({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }: any) {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh position={[0, 1.5, -0.4]} castShadow receiveShadow>
                <boxGeometry args={[3, 3, 0.1]} />
                <meshStandardMaterial color="#8C847A" roughness={0.9} />
            </mesh>
            {/* Shelving */}
            {[0.5, 1.25, 2].map((y, i) => (
                <mesh key={i} position={[0, y, -0.2]} castShadow receiveShadow>
                    <boxGeometry args={[3, 0.05, 0.4]} />
                    <meshStandardMaterial color="#8C847A" roughness={0.9} />
                </mesh>
            ))}
        </group>
    );
}

/**
 * Full Ensuite Bathroom Set.
 */
export function BathroomEnsuite({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }: any) {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Vanity sink */}
            <mesh position={[-1, 0.45, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.5, 0.9, 0.6]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.05} />
            </mesh>
            {/* Privacy Toilet */}
            <mesh position={[1, 0.35, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.5, 0.7, 0.8]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Glass Shower Screen */}
            <mesh position={[0, 1.5, 0.8]} castShadow>
                <boxGeometry args={[2, 3, 0.05]} />
                <meshPhysicalMaterial color="#E0FFFF" transparent opacity={0.2} transmission={0.9} ior={1.5} />
            </mesh>
        </group>
    );
}

/**
 * High-precision Designer Armchair.
 */
export function DesignerArmchair({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }: any) {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh position={[0, 0.4, 0]} castShadow>
                <boxGeometry args={[1, 0.8, 1]} />
                <meshStandardMaterial color="#3A3A38" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.7, -0.4]} castShadow>
                <boxGeometry args={[1, 0.6, 0.2]} />
                <meshStandardMaterial color="#3A3A38" />
            </mesh>
        </group>
    );
}

/**
 * Specific Plumbing Fixture (Sink or Toilet).
 */
export function ArchitecturalFixture({ type = 'sink', position = [0, 0, 0], rotation = [0, 0, 0] }: any) {
    return (
        <group position={position} rotation={rotation}>
            {type === 'sink' ? (
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[0.8, 0.1, 0.5]} />
                    <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
                </mesh>
            ) : (
                <group>
                    <mesh position={[0, 0.2, 0]} castShadow>
                        <boxGeometry args={[0.4, 0.8, 0.6]} />
                        <meshStandardMaterial color="#FFFFFF" />
                    </mesh>
                    <mesh position={[0, 0.5, -0.3]} castShadow>
                        <boxGeometry args={[0.5, 0.4, 0.2]} />
                        <meshStandardMaterial color="#FFFFFF" />
                    </mesh>
                </group>
            )}
        </group>
    );
}

/**
 * Bedside Nightstand Set with minimalist lamp.
 */
export function NightstandSet({ position = [0, 0, 0], rotation = [0, 0, 0] }: any) {
    return (
        <group position={position} rotation={rotation}>
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.6, 0.5, 0.6]} />
                <meshStandardMaterial color="#1A1A1A" />
            </mesh>
            <mesh position={[0, 0.6, 0]} castShadow>
                <cylinderGeometry args={[0.1, 0.15, 0.3, 16]} />
                <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
}

/**
 * Symbolic 3D Door Swing arc.
 */
export function DoorSwing3D({ position = [0, 0, 0], rotation = [0, 0, 0], radius = 1 }: any) {
    return (
        <mesh position={position} rotation={rotation}>
            <ringGeometry args={[radius - 0.02, radius, 32, 1, 0, Math.PI / 2]} />
            <meshBasicMaterial color="#2C2C2A" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
    );
}
