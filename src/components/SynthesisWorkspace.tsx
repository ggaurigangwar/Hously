import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import { PhotorealisticPlan3D } from './PhotorealisticPlan3D';
import { GripVertical, Sparkles } from 'lucide-react';

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
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSlider = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, position)));
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
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
      className="relative w-full h-full overflow-hidden bg-[#FAF9F6]"
    >
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          shadows 
          gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
          camera={{ position: [25, 25, 25], fov: 40 }}
        >
          <PerspectiveCamera makeDefault position={[22, 22, 22]} fov={40} />
          
          {/* Day Cinematic Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 20, 5]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <pointLight position={[-10, 10, -10]} intensity={0.5} color="#FFE4C4" />

          <Suspense fallback={
            <Html center>
              <div className="flex flex-col items-center gap-4 bg-white/20 backdrop-blur-3xl px-12 py-8 rounded-[3rem] border border-white/30 shadow-2xl">
                <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-white animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Synthesizing Architecture...</p>
              </div>
            </Html>
          }>
             <ScissorManager sliderPos={sliderPos} url={originalUrl} />
          </Suspense>

          <OrbitControls 
            enableDamping
            dampingFactor={0.05}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1}
            makeDefault
            enabled={!isDraggingSlider}
          />
        </Canvas>
      </div>

      {/* Persistent HTML Slider Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div 
            className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-auto cursor-ew-resize group"
            style={{ left: `${sliderPos}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
               {/* High-End Architectural Handle */}
               <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-2xl border border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center group-hover:scale-110 active:scale-95 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl">
                    <GripVertical className="w-5 h-5 text-[#1A1A1A]" />
                  </div>
               </div>
               
               {/* Dynamic Mode Badge */}
               <div className="bg-black/80 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 shadow-2xl flex items-center gap-2.5 translate-y-4">
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">
                       {sliderPos < 50 ? 'Source Layout' : 'Synthesis Engine'}
                    </span>
                 </div>
                 <div className="w-px h-3 bg-white/20" />
                 <span className="text-[9px] font-medium text-white/60">
                    {Math.round(sliderPos)}%
                 </span>
               </div>
            </div>
        </div>
      </div>

      {/* Workspace Overlays */}
      <div className="absolute top-10 left-10 right-10 z-20 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col gap-4 pointer-events-auto">
             <div className="bg-white/90 backdrop-blur-2xl p-5 rounded-[2.5rem] border border-white shadow-2xl flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] flex items-center justify-center shadow-lg">
                   <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8C8C8C] mb-1">Architectural Analysis</p>
                   <p className="text-sm font-bold text-[#1A1A1A]">Masterpiece_Synthesis_v4</p>
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-4 pointer-events-auto">
             <div className="bg-white/90 backdrop-blur-2xl px-8 py-5 rounded-full border border-white shadow-2xl flex items-center gap-4">
                <div className="flex flex-col items-end">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8C8C8C]">Render Mode</p>
                   <p className="text-xs font-bold text-[#1A1A1A]">Photorealistic Path-Tracing</p>
                </div>
                <div className="w-px h-8 bg-[#E5E5E5]" />
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
             </div>
          </div>
      </div>

      {/* Instructional Tooltip */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
         <div className="bg-white/10 backdrop-blur-xl px-10 py-4 rounded-full border border-white/20 shadow-2xl group overflow-hidden">
            <div className="relative z-10 flex items-center gap-3">
               <span className="text-[10px] font-black text-white uppercase tracking-[0.5em] opacity-80 group-hover:opacity-100 transition-opacity">Slide to visualize reality</span>
               <div className="w-12 h-[1px] bg-white/40 group-hover:w-20 transition-all duration-500" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
         </div>
      </div>
    </div>
  );
}
