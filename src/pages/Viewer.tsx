import { useEffect, useState, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Storage, type Project } from '../lib/storage';
import { TrueBlueprint3D } from '../components/ThreeDSequence';

export function Viewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      const proj = Storage.getProject(id);
      if (proj) setProject(proj);
    }
  }, [id]);

  if (!project) return null;

  return (
    <div className="flex flex-col w-full min-h-screen bg-background overflow-hidden relative">
      <div className="orb-1" />
      
      {/* Rareism Header */}
      <header className="w-full flex items-center justify-between p-6 z-20 relative border-b border-border">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 rounded-xl hover:bg-[#F4F2EC] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-medium tracking-tight text-foreground flex items-center gap-3">
              {project.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="tactile-button-outline !px-6 !py-3 !text-xs !bg-transparent border-0">
            <Share2 className="w-4 h-4 mr-2" /> Publish
          </button>
          <a href={project.originalUrl} download={`${project.name}_blueprint.jpg`}>
            <button className="tactile-button !px-6 !py-3 !text-xs">
              <Download className="w-4 h-4 mr-2" /> Export
            </button>
          </a>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center p-8 lg:p-12 z-10 relative">
        {/* Cinematic Result Container */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="w-full max-w-6xl aspect-[16/10] rounded-[32px] overflow-hidden aether-glass z-10 relative flex flex-col shadow-[0_50px_100px_-20px_rgba(44,44,42,0.12)] border border-white/40"
        >
          <div className="absolute top-8 left-8 z-20 pointer-events-none">
             <div className="flex items-center gap-3 bg-white/40 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/40 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-foreground">Structural Synthesis Complete</span>
             </div>
          </div>
          
          <div className="w-full h-full bg-white flex-1 flex items-center justify-center p-6 lg:p-12">
            {project.modelUrl?.endsWith('.png') || project.modelUrl?.endsWith('.jpg') ? (
              <motion.img 
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={project.modelUrl} 
                alt="Synthesized 3D View" 
                className="w-full h-full object-contain rounded-2xl shadow-2xl" 
              />
            ) : (
              <Canvas shadows camera={{ position: [15, 15, 15], fov: 40 }} className="w-full h-full outline-none">
                <Suspense fallback={null}>
                      <ambientLight intensity={0.6} />
                      <directionalLight position={[15, 25, 10]} intensity={2} castShadow shadow-bias={-0.0001} />
                      <TrueBlueprint3D url={project.originalUrl} />
                      <OrbitControls autoRotate autoRotateSpeed={1} makeDefault minDistance={8} maxDistance={60} maxPolarAngle={Math.PI / 2.2} />
                </Suspense>
              </Canvas>
            )}
          </div>
          
          <div className="p-8 border-t border-[#EAE6DF]/30 flex items-center justify-between bg-[#FAF9F6]/50 backdrop-blur-md">
             <div className="flex items-center gap-8">
                <div>
                   <p className="text-[10px] uppercase tracking-widest font-extrabold text-primary/40 mb-1">Source Format</p>
                   <p className="text-xs font-bold text-foreground">2D VECTORIAL BLUEPRINT</p>
                </div>
                <div className="w-px h-6 bg-border" />
                <div>
                   <p className="text-[10px] uppercase tracking-widest font-extrabold text-primary/40 mb-1">Target Synthesis</p>
                   <p className="text-xs font-bold text-foreground">PHOTOREALISTIC 3D EXTRACTION</p>
                </div>
             </div>
             
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-foreground/30">LITERAL SPATIAL MAPPING: 100.0%</span>
             </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
