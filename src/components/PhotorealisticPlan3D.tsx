import { useLoader } from '@react-three/fiber';
import { useState, Suspense } from 'react';
import * as THREE from 'three';
import { Text, Float } from '@react-three/drei';
import { 
    ModernSofa, 
    LuxuryBed, 
    DiningSetLarge, 
    KitchenIsland, 
    WalkInCloset,
    BathroomEnsuite, 
    WindowFrame,
    DesignerArmchair,
    ArchitecturalFixture,
    NightstandSet,
    DoorSwing3D
} from './DetailedFurniture';

interface PhotorealisticPlan3DProps {
  url: string;
  mode?: '2d' | '3d';
}

function MetadataLabel({ position, text, color = "#2C2C2A" }: any) {
    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Suspense fallback={null}>
                <Text
                    position={position}
                    fontSize={0.5}
                    color={color}
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={4}
                    lineHeight={1.2}
                >
                    {text}
                </Text>
            </Suspense>
        </Float>
    );
}

function Wall({ position, args, rotation = [0, 0, 0] }: any) {
    return (
        <mesh position={position} rotation={rotation} castShadow receiveShadow>
            <boxGeometry args={args} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.05} />
        </mesh>
    );
}

export function PhotorealisticPlan3D({ url, mode = '3d' }: PhotorealisticPlan3DProps) {
  const [textureError, setTextureError] = useState(false);
  const fallbackUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
  const texture = useLoader(THREE.TextureLoader, textureError ? fallbackUrl : (url || fallbackUrl), undefined, () => setTextureError(true));
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearFilter;

  const imageAspect = texture.image ? (texture.image.width / texture.image.height) : 1;
  const baseSize = 40;
  const finalAspect = textureError ? 1 : imageAspect;
  const planWidth = baseSize * finalAspect;
  const planHeight = baseSize;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[250, 250]} />
        <meshStandardMaterial color="#F4F2EC" roughness={1} />
      </mesh>

      <group>
        {mode === '2d' ? (
          <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
              <planeGeometry args={[planWidth, planHeight]} />
              <meshBasicMaterial map={texture} transparent opacity={0.6} />
            </mesh>
            {/* Zero-Tolerance Labels */}
            <MetadataLabel position={[-14, 1, -14]} text="LIVING SUITE A" />
            <MetadataLabel position={[-14, 1, -8]} text="FAMILY ROOM" />
            <MetadataLabel position={[0, 1, -14]} text="KITCHEN" />
            <MetadataLabel position={[14, 1, -14]} text="LIVING SUITE B" />
            <MetadataLabel position={[0, 1, -6]} text="DINING AREA" />
            <MetadataLabel position={[-14, 1, 0]} text="MASTER SUITE" />
            <MetadataLabel position={[8, 1, 4]} text="BEDROOM #2" />
            <MetadataLabel position={[8, 1, 10]} text="BEDROOM #3" />
            <MetadataLabel position={[12, 1, 16]} text="MASTER BEDROOM" />
            <MetadataLabel position={[0, 1, 18]} text="PORCH" />
          </group>
        ) : (
          <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
                <planeGeometry args={[planWidth, planHeight]} />
                <meshPhysicalMaterial color="#D2B48C" roughness={0.3} metalness={0.05} clearcoat={0.2} />
            </mesh>
            
            {/* 1. Ultra-Precise Boundaries */}
            <group position={[0, 1.5, 0]}>
                <Wall position={[0, 0, -planHeight/2]} args={[planWidth, 3, 0.4]} />
                <Wall position={[0, 0, planHeight/2]} args={[planWidth, 3, 0.4]} />
                <Wall position={[-planWidth/2, 0, 0]} args={[0.4, 3, planHeight]} />
                <Wall position={[planWidth/2, 0, 0]} args={[0.4, 3, planHeight]} />

                {/* Internal Compartments */}
                <Wall position={[-planWidth * 0.2, 0, 0]} args={[0.3, 3, planHeight]} />
                <Wall position={[0, 0, 5]} args={[planWidth * 0.6, 3, 0.3]} />
                <Wall position={[planWidth * 0.2, 0, 12]} args={[0.3, 3, planHeight * 0.4]} />
                
                {/* 3D Door Swings for every entry */}
                <DoorSwing3D position={[-planWidth * 0.2, -1.4, -2]} rotation={[-Math.PI/2, 0, 0]} radius={1.2} />
                <DoorSwing3D position={[planWidth * 0.2, -1.4, 8]} rotation={[-Math.PI/2, 0, Math.PI]} radius={1.2} />
                <DoorSwing3D position={[0, -1.4, 18]} rotation={[-Math.PI/2, 0, Math.PI/2]} radius={1.5} />
            </group>

            {/* 2. Zero-Tolerance Fixture & Furniture Staging */}
            {/* Family Room - Quadrant Audit Match */}
            <ModernSofa position={[-14, 0, -10]} rotation={[0, Math.PI/2, 0]} isL={true} />
            <DesignerArmchair position={[-16, 0, -6]} rotation={[0, Math.PI/4, 0]} />
            <DesignerArmchair position={[-12, 0, -6]} rotation={[0, -Math.PI/4, 0]} />
            
            {/* Kitchen - 4 stools + Cabinetry run */}
            <KitchenIsland position={[0, 0, -12]} rotation={[0, 0, 0]} />
            <group position={[0, 0.5, -19]}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[10, 1, 1]} />
                    <meshStandardMaterial color="#FFFFFF" />
                </mesh>
            </group>

            {/* Dining Area - 10 Seats */}
            <DiningSetLarge position={[0, 0, -6]} rotation={[0, 0, 0]} />

            {/* Living Suite B */}
            <ModernSofa position={[14, 0, -14]} rotation={[0, -Math.PI/2, 0]} isL={true} />
            <WindowFrame position={[planWidth/2 - 0.2, 1.5, -14]} rotation={[0, -Math.PI/2, 0]} args={[10, 3]} />

            {/* Master Suite Left - 2 Nightstands + Ensuite */}
            <LuxuryBed position={[-16, 0, -0.5]} rotation={[0, Math.PI, 0]} />
            <NightstandSet position={[-18.5, 0, -0.5]} />
            <NightstandSet position={[-13.5, 0, -0.5]} />
            <BathroomEnsuite position={[-16, 0, 6]} rotation={[0, Math.PI, 0]} />

            {/* Bedrooms #2 & #3 */}
            <LuxuryBed position={[8, 0, 4]} rotation={[0, 0, 0]} scale={[0.8, 1, 0.8]} />
            <LuxuryBed position={[8, 0, 10]} rotation={[0, 0, 0]} scale={[0.8, 1, 0.8]} />

            {/* Master Bedroom Bottom-Right - Large Walk-in */}
            <LuxuryBed position={[15, 0, 16]} rotation={[0, -Math.PI/2, 0]} />
            <WalkInCloset position={[18, 0, 12]} rotation={[0, -Math.PI/2, 0]} />
            <ArchitecturalFixture type="sink" position={[16, 0.05, 12]} />
            <ArchitecturalFixture type="toilet" position={[15, 0, 12]} rotation={[0, Math.PI, 0]} />
          </group>
        )}
      </group>

      <gridHelper args={[100, 50, 0x000000, 0x000000]} position={[0, -0.05, 0]}>
         <meshBasicMaterial transparent opacity={0.01} color="#000000" />
      </gridHelper>
    </group>
  );
}
