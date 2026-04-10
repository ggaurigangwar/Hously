import { useLoader, useThree } from '@react-three/fiber';
import { useState, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { 
    Text,
    Environment
} from '@react-three/drei';
import { 
    ModernSofa, 
    LuxuryBed, 
    DiningSetLarge, 
    KitchenIsland, 
    BathroomEnsuite, 
    WindowFrame,
    DoorSwing3D
} from './DetailedFurniture';

interface PhotorealisticPlan3DProps {
  url: string;
  sliderPos?: number;
}

/**
 * MAQUETTE LUX: Architectural Conviction Engine
 * Combines Jet Black Matte structure with warm Oak wood for premium visual appeal.
 */
export function PhotorealisticPlan3D({ url, sliderPos = 50 }: PhotorealisticPlan3DProps) {
  const [textureError, setTextureError] = useState(false);
  const { gl } = useThree();
  
  if (!url) return null;

  const originalTexture = useLoader(THREE.TextureLoader, url, undefined, () => setTextureError(true));

  // SHARP-EDGE PREPROCESSING
  const sharpTexture = useMemo(() => {
    if (!originalTexture.image || textureError) return originalTexture;
    
    const canvas = document.createElement('canvas');
    canvas.width = originalTexture.image.width;
    canvas.height = originalTexture.image.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(originalTexture.image, 0, 0);
    
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const avg = (imgData.data[i] + imgData.data[i+1] + imgData.data[i+2]) / 3;
      const v = avg > 128 ? 255 : 0; 
      imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = v;
    }
    ctx.putImageData(imgData, 0, 0);
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = gl.capabilities.getMaxAnisotropy();
    return tex;
  }, [originalTexture, textureError, gl]);

  // PROCEDURAL OAK WOOD TEXTURE
  const oakTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    // Base Oak Color
    ctx.fillStyle = '#C2B280'; 
    ctx.fillRect(0, 0, 1024, 1024);
    
    // Wood Grain lines
    ctx.strokeStyle = '#A68966';
    ctx.lineWidth = 1;
    for (let i = 0; i < 1024; i += 8) {
        ctx.beginPath();
        ctx.moveTo(0, i + Math.random() * 20);
        ctx.bezierCurveTo(256, i - 10, 768, i + 10, 1024, i + Math.random() * 20);
        ctx.stroke();
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    return tex;
  }, []);

  useMemo(() => {
    originalTexture.anisotropy = gl.capabilities.getMaxAnisotropy();
    originalTexture.colorSpace = THREE.SRGBColorSpace;
  }, [originalTexture, gl]);

  const imageAspect = originalTexture.image ? (originalTexture.image.width / originalTexture.image.height) : 1;
  const baseSize = 40;
  const planWidth = baseSize * imageAspect;
  const planHeight = baseSize;

  const normalized = sliderPos / 100;
  const wallGrowth = Math.max(0, Math.min(1, (normalized - 0.2) / 0.5));
  const wallHeight = 3.2 * wallGrowth;
  const realityFade = Math.max(0, Math.min(1, (normalized - 0.7) / 0.3));

  return (
    <group>
      {/* CINEMATIC LIGHTING */}
      <ambientLight intensity={0.4 + realityFade * 0.2} />
      <directionalLight 
        position={[20, 30, 20]} 
        intensity={2.5} 
        color="#FFF4E0" // Warm Sunlight
        castShadow 
        shadow-mapSize={[2048, 2048]}
      />
      
      <Suspense fallback={null}>
        <Environment preset="studio" blur={0.8} />
      </Suspense>

      <group>
        {/* SHARP-EDGE ARCHITECTURAL STRUCTURE */}
        <group position={[0, wallHeight, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
              <planeGeometry args={[planWidth, planHeight, 256, 256]} />
              <meshPhysicalMaterial 
                color="#020202" // Jet Black
                displacementMap={sharpTexture}
                displacementScale={-wallHeight}
                displacementBias={0}
                roughness={0.8} 
                metalness={0.1}
                clearcoat={0.4}
                clearcoatRoughness={0.1}
                transparent={realityFade > 0}
                opacity={1}
                envMapIntensity={1}
              />
            </mesh>
            
            {/* OAK WOOD FLOOR (Convincing Contrast) */}
            {realityFade > 0.05 && (
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -wallHeight + 0.05, 0]} receiveShadow>
                    <planeGeometry args={[planWidth, planHeight]} />
                    <meshPhysicalMaterial 
                        map={oakTexture}
                        color="#ffffff"
                        roughness={0.3}
                        metalness={0.0}
                        opacity={realityFade}
                        transparent
                        clearcoat={0.1}
                    />
                </mesh>
            )}
            
            {/* 2D Overlay */}
            {realityFade < 0.99 && (
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
                    <planeGeometry args={[planWidth, planHeight]} />
                    <meshBasicMaterial map={originalTexture} transparent opacity={1 - realityFade} />
                </mesh>
            )}
        </group>

        {/* BRACING PLINTH */}
        <mesh position={[0, -1, 0]} receiveShadow>
          <boxGeometry args={[planWidth + 4, 2, planHeight + 4]} />
          <meshStandardMaterial color="#080808" roughness={1} />
        </mesh>

        {/* STAGED FIXTURES */}
        {wallGrowth > 0.1 && (
            <group position={[0, 0.05, 0]} visible={realityFade > 0.1}>
                {/* Subtle room lighting */}
                <pointLight position={[-14, 2.5, -10]} intensity={1.5 * realityFade} color="#FFEBB7" />
                <pointLight position={[14, 2.5, -14]} intensity={1.5 * realityFade} color="#FFEBB7" />
                
                <ModernSofa position={[-14, 0, -10]} rotation={[0, Math.PI/2, 0]} isL={true} scale={wallGrowth} />
                <DiningSetLarge position={[0, 0, -6]} rotation={[0, 0, 0]} scale={wallGrowth} />
                <LuxuryBed position={[-16, 0, -0.5]} rotation={[0, Math.PI, 0]} scale={wallGrowth} />
                <KitchenIsland position={[0, 0, -14]} scale={wallGrowth} />
                <BathroomEnsuite position={[-16, 0, 6]} rotation={[0, Math.PI, 0]} scale={wallGrowth} />
                
                <WindowFrame position={[planWidth/2 - 0.2, 1.6, -14]} rotation={[0, -Math.PI/2, 0]} args={[12, 4]} />
                <DoorSwing3D position={[-8, -1.4, -2]} rotation={[-Math.PI/2, 0, 0]} radius={1.5} />
            </group>
        )}

        {/* SIMPLICITY Branding */}
        {wallGrowth < 0.4 && (
            <group position={[0, 0.2, planHeight/2 + 3]}>
                <Text
                    fontSize={1.4}
                    color="#FFFFFF"
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.woff"
                >
                    ARCHITECTURAL MAQUETTE / OAKWOOD
                </Text>
            </group>
        )}
      </group>

      {/* Studio Background */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#F0F0F0" roughness={1} />
      </mesh>
    </group>
  );
}
