import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { PhotorealisticPlan3D } from './PhotorealisticPlan3D';
import { GripVertical, Layers, Sparkles, Layout } from 'lucide-react';

interface SynthesisWorkspaceProps {
  originalUrl: string;
}

function ScissorManager({ sliderPos, url }: { sliderPos: number, url: string }) {
  const group2d = useRef<any>(null);
  const group3d = useRef<any>(null);

  useFrame((state) => {
    const { gl, scene, camera, size } = state;
    const splitX = (sliderPos / 100) * size.width;
    
    gl.autoClear = false;
    gl.clear();
    gl.setScissorTest(true);

    if (group2d.current && group3d.current) {
        // Left: 2D Blueprint (drawing mode)
        group2d.current.visible = true;
        group3d.current.visible = false;
        gl.setScissor(0, 0, splitX, size.height);
        gl.setViewport(0, 0, size.width, size.height);
        gl.render(scene, camera);

        // Right: 3D Reality (photorealistic mode)
        group2d.current.visible = false;
        group3d.current.visible = true;
        gl.setScissor(splitX, 0, size.width - splitX, size.height);
        gl.setViewport(0, 0, size.width, size.height);
        gl.render(scene, camera);
    }

    gl.setScissorTest(false);
  }, 1);

  return (
    <>
      <group ref={group2d}>
        <PhotorealisticPlan3D url={url} mode="2d" />
      </group>
      <group ref={group3d}>
        <PhotorealisticPlan3D url={url} mode="3d" />
      </group>
    </>
  );
}

export function SynthesisWorkspace({ originalUrl }: SynthesisWorkspaceProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isOrbitEnabled, setIsOrbitEnabled] = useState(false);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSlider = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, position)));
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    // Only start dragging if clicking near the slider or in a specific zone
    setIsDraggingSlider(true);
    updateSlider('touches' in e ? e.touches[0].clientX : e.clientX);
  };

  const handleMouseMove = (e: any) => {
    if (!isDraggingSlider) return;
    updateSlider('touches' in e ? e.touches[0].clientX : e.clientX);
  };

  const handleMouseUp = () => {
    setIsDraggingSlider(false);
  };

  useEffect(() => {
    if (sliderPos > 98) {
      setIsOrbitEnabled(true);
    } else if (sliderPos < 95) {
      setIsOrbitEnabled(false);
    }
  }, [sliderPos]);

  useEffect(() => {
    if (isDraggingSlider) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDraggingSlider]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#FAF9F6]`}
    >
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas gl={{ preserveDrawingBuffer: true, antialias: true }}>
          <PerspectiveCamera makeDefault position={[0, 48, 12]} rotation={[-Math.PI / 2.05, 0, 0]} fov={35} />
          {/* Global Lights - One instance only to prevent shader duplication */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 20, 10]} intensity={1.2} />
          <Suspense fallback={null}>
             <ScissorManager sliderPos={sliderPos} url={originalUrl} />
          </Suspense>
          <OrbitControls 
            enabled={isOrbitEnabled && !isDraggingSlider}
            maxPolarAngle={Math.PI / 2.2}
            makeDefault
          />
        </Canvas>
      </div>

      {/* Persistent HTML Slider Layer */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
      >
        <div 
            className="absolute top-0 bottom-0 w-px bg-white/40 shadow-[0_0_40px_rgba(255,255,255,1)] pointer-events-auto cursor-ew-resize group"
            style={{ left: `${sliderPos}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
               {/* Fixed Bi-Directional Handle */}
               <div className="w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center border border-[#EAE6DF] hover:scale-110 active:scale-95 transition-transform">
                 <GripVertical className="w-6 h-6 text-[#2C2C2A]" />
               </div>
               {/* Label */}
               <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#EAE6DF] shadow-sm flex items-center gap-2">
                 {sliderPos < 50 ? <Layout className="w-3 h-3 text-[#A3A79A]" /> : <Sparkles className="w-3 h-3 text-primary" />}
                 <span className="text-[10px] font-black uppercase tracking-widest text-[#2C2C2A]">
                    {sliderPos < 50 ? 'Blueprint 2D' : 'Synthesis 3D'}
                 </span>
               </div>
            </div>
        </div>
      </div>

      {/* Workspace Header */}
      <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-start pointer-events-none">
          <div className="bg-white/80 backdrop-blur-xl p-4 rounded-3xl border border-white/40 shadow-xl flex items-center gap-4 pointer-events-auto">
             <div className="w-10 h-10 rounded-2xl bg-[#F4F2EC] flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#2C2C2A]" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#8C847A] mb-0.5">Project archive</p>
                <p className="text-xs font-bold text-[#2C2C2A]">Synthesis_Node_v4.2</p>
             </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl px-6 py-4 rounded-full border border-white/40 shadow-xl pointer-events-auto">
             <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isOrbitEnabled ? 'bg-primary animate-pulse' : 'bg-[#A3A79A]'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#2C2C2A]">
                   {isOrbitEnabled ? 'Reality Node Active' : 'Architectural Precision: 100%'}
                </span>
             </div>
          </div>
      </div>

      {!isOrbitEnabled && (
         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 bg-black/5 backdrop-blur-3xl px-8 py-3 rounded-full border border-white/20">
            <span className="text-[10px] font-bold text-[#2C2C2A] uppercase tracking-[0.4em]">Slide to Synthesize Space</span>
         </div>
      )}
    </div>
  );
}
