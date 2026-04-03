import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Globe, Lock, Box as BoxIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Gltf } from '@react-three/drei';
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
            <h1 className="text-xl font-bold text-foreground flex items-center gap-3">
              {project.name}
              <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase tracking-widest font-extrabold flex items-center gap-1 ${project.isPublic ? 'bg-primary/20 text-primary' : 'bg-foreground/5 text-foreground/50'}`}>
                {project.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                {project.isPublic ? 'Public Node' : 'Encrypted'}
              </span>
            </h1>
            <p className="text-xs font-bold text-foreground/50 tracking-widest uppercase mt-1">UUID: {project.id}</p>
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

      <main className="flex-1 flex flex-col lg:flex-row p-6 gap-6 z-10 relative">
        {/* Source 2D Component */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="w-full lg:w-1/4 flex flex-col gap-6"
        >
          <div className="aether-card p-4 flex flex-col pt-6 aspect-[4/3] relative">
            <h3 className="text-[10px] uppercase tracking-widest font-extrabold text-primary mb-3 px-2">Original Blueprints</h3>
            <div className="flex-1 rounded-xl overflow-hidden bg-[#FAF9F6] border border-[#EAE6DF]">
              <img src={project.originalUrl} alt="Source 2D Plan" className="w-full h-full object-cover opacity-60 mix-blend-multiply" />
            </div>
          </div>
          
          <div className="aether-card p-6 flex-1 flex flex-col gap-4">
            <div>
               <h3 className="text-[10px] uppercase tracking-widest font-extrabold text-primary mb-2">Model Geometry</h3>
               <p className="text-sm text-foreground/80 font-medium">True GLTF Structural Form</p>
            </div>
            <div>
               <h3 className="text-[10px] uppercase tracking-widest font-extrabold text-primary mb-2">Synthesis Context</h3>
               <p className="text-xs text-foreground/60 leading-relaxed font-medium">{project.aiDesc}</p>
            </div>
          </div>
        </motion.div>

        {/* Real Interactive 3D Component */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="w-full lg:w-3/4 min-h-[60vh] rounded-[16px] overflow-hidden aether-card z-10 relative"
        >
          <div className="absolute top-6 left-6 z-10 pointer-events-none">
             <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-lg border border-[#EAE6DF] shadow-sm">
                <BoxIcon className="w-4 h-4 text-foreground/80" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-foreground">Interactive 3D Simulation</span>
             </div>
          </div>
          
          <div className="absolute bottom-6 right-6 z-10 pointer-events-none text-right">
             <p className="text-[10px] uppercase tracking-widest font-extrabold text-foreground/40 mb-1">Spatial Controls</p>
             <p className="text-xs font-bold text-foreground/70 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#EAE6DF]">Orbit [Drag] • Zoom [Scroll]</p>
          </div>
          
          <Canvas shadows camera={{ position: [15, 15, 15], fov: 40 }} className="w-full h-full bg-[#FAF9F6] outline-none">
            <Suspense fallback={null}>
                  {/* Literal User-Uploaded Blueprint 2D-to-3D Extraction */}
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[15, 25, 10]} intensity={2} castShadow shadow-bias={-0.0001} />
                  <TrueBlueprint3D url={project.originalUrl} />
                  <OrbitControls autoRotate autoRotateSpeed={1} makeDefault minDistance={8} maxDistance={60} maxPolarAngle={Math.PI / 2.2} />
            </Suspense>
          </Canvas>
        </motion.div>
      </main>
    </div>
  );
}
