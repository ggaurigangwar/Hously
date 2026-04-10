import { useLoader } from '@react-three/fiber';
import { useState, useMemo } from 'react';
import * as THREE from 'three';
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

export function PhotorealisticPlan3D({ url, mode = '3d' }: PhotorealisticPlan3DProps) {
  const [textureError, setTextureError] = useState(false);
  const fallbackUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
  const targetUrl = textureError ? fallbackUrl : (url || fallbackUrl);
  
  const texture = useLoader(THREE.TextureLoader, targetUrl, undefined, () => setTextureError(true));
  
  useMemo(() => {
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
  }, [texture]);

  const imageAspect = texture.image ? (texture.image.width / texture.image.height) : 1;
  const baseSize = 40;
  const finalAspect = textureError ? 1 : imageAspect;
  const planWidth = baseSize * finalAspect;
  const planHeight = baseSize;

  const wallHeight = 2.5; 

  return (
    <group>
      <group>
        {mode === '2d' ? (
          <group>
            {/* Flat 2D Blueprint - Pure exact color map */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
              <planeGeometry args={[planWidth, planHeight]} />
              <meshBasicMaterial map={texture} transparent opacity={0.9} color="#FFFFFF" />
            </mesh>
            {/* Thin white backing */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
              <planeGeometry args={[planWidth + 0.5, planHeight + 0.5]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>
        ) : (
          <group>
             {/* Dynamic 3D Extruded Blueprint Maquette */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, wallHeight, 0]} receiveShadow castShadow>
              <planeGeometry args={[planWidth, planHeight, 1024, 1024]} />
              <meshPhysicalMaterial 
                map={texture}
                color="#FAFAFA"
                roughness={0.7}
                metalness={0.1}
                clearcoat={0.3}
                clearcoatRoughness={0.4}
                displacementMap={texture}
                displacementScale={-wallHeight}
              />
            </mesh>
            
            {/* Detailed 3D Furniture Staging intersecting with the monochromatic walls */}
            <group position={[0, 0.01, 0]}>
                {/* Family Room */}
                <ModernSofa position={[-14, 0, -10]} rotation={[0, Math.PI/2, 0]} isL={true} />
                <DesignerArmchair position={[-16, 0, -6]} rotation={[0, Math.PI/4, 0]} />
                <DesignerArmchair position={[-12, 0, -6]} rotation={[0, -Math.PI/4, 0]} />
                
                {/* Kitchen */}
                <KitchenIsland position={[0, 0, -12]} rotation={[0, 0, 0]} />
                <group position={[0, 0.5, -19]}>
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[10, 1, 1]} />
                        <meshStandardMaterial color="#FFFFFF" />
                    </mesh>
                </group>

                {/* Dining Area */}
                <DiningSetLarge position={[0, 0, -6]} rotation={[0, 0, 0]} />

                {/* Living Suite B */}
                <ModernSofa position={[14, 0, -14]} rotation={[0, -Math.PI/2, 0]} isL={true} />
                <WindowFrame position={[planWidth/2 - 0.2, 1.5, -14]} rotation={[0, -Math.PI/2, 0]} args={[10, 3]} />

                {/* Master Suite Left */}
                <LuxuryBed position={[-16, 0, -0.5]} rotation={[0, Math.PI, 0]} />
                <NightstandSet position={[-18.5, 0, -0.5]} />
                <NightstandSet position={[-13.5, 0, -0.5]} />
                <BathroomEnsuite position={[-16, 0, 6]} rotation={[0, Math.PI, 0]} />

                {/* Bedrooms #2 & #3 */}
                <LuxuryBed position={[8, 0, 4]} rotation={[0, 0, 0]} scale={[0.8, 1, 0.8]} />
                <LuxuryBed position={[8, 0, 10]} rotation={[0, 0, 0]} scale={[0.8, 1, 0.8]} />

                {/* Master Bedroom Bottom-Right */}
                <LuxuryBed position={[15, 0, 16]} rotation={[0, -Math.PI/2, 0]} />
                <WalkInCloset position={[18, 0, 12]} rotation={[0, -Math.PI/2, 0]} />
                <ArchitecturalFixture type="sink" position={[16, 0.05, 12]} />
                <ArchitecturalFixture type="toilet" position={[15, 0, 12]} rotation={[0, Math.PI, 0]} />
                
                {/* Door Swings */}
                <DoorSwing3D position={[-planWidth * 0.2, -1.4, -2]} rotation={[-Math.PI/2, 0, 0]} radius={1.2} />
                <DoorSwing3D position={[planWidth * 0.2, -1.4, 8]} rotation={[-Math.PI/2, 0, Math.PI]} radius={1.2} />
                <DoorSwing3D position={[0, -1.4, 18]} rotation={[-Math.PI/2, 0, Math.PI/2]} radius={1.5} />
            </group>

            {/* Architectural Plinth */}
            <mesh position={[0, -0.26, 0]} receiveShadow castShadow>
              <boxGeometry args={[planWidth + 0.8, 0.5, planHeight + 0.8]} />
              <meshStandardMaterial color="#BABABA" roughness={0.9} />
            </mesh>
            
            <mesh position={[0, -0.25, 0]}>
                <boxGeometry args={[planWidth + 0.85, 0.48, planHeight + 0.85]} />
                <meshStandardMaterial color="#1A1A1A" roughness={1} />
            </mesh>
          </group>
        )}
      </group>

      {/* Presentation Base Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.52, 0]} receiveShadow>
        <planeGeometry args={[150, 150]} />
        <meshStandardMaterial color="#F5F3ED" roughness={1} />
      </mesh>

      <gridHelper args={[100, 50, 0x000000, 0x000000]} position={[0, -0.5, 0]}>
         <meshBasicMaterial transparent opacity={0.03} color="#000000" />
      </gridHelper>
    </group>
  );
}
