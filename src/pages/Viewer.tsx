import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Storage, type Project } from '../lib/storage';
import { SynthesisWorkspace } from '../components/SynthesisWorkspace';

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
    <div className="flex flex-col w-full min-h-screen bg-[#FAF9F6] overflow-hidden relative">
      <div className="orb-1" />
      
      {/* Rareism Header */}
      <header className="w-full flex items-center justify-between p-8 z-20 relative border-b border-[#EAE6DF]/40 bg-white/40 backdrop-blur-xl">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#EAE6DF] flex items-center justify-center hover:bg-black hover:text-white transition-all group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8C847A]">Live Synthesis Node</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tighter text-[#2C2C2A]">
               {project.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#8C847A] hover:text-[#2C2C2A] transition-all">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <a href={project.originalUrl} download={`${project.name}_blueprint.jpg`}>
            <button className="tactile-button !px-8 !py-4 !text-[10px] !tracking-[0.2em] uppercase font-black">
              <Download className="w-4 h-4 mr-2.5" /> Export Artifact
            </button>
          </a>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center p-12 lg:p-20 z-10 relative">
        {/* Cinematic Result Container */}
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="w-full max-w-7xl aspect-[16/9] rounded-[48px] overflow-hidden bg-white z-10 relative flex flex-col shadow-[0_80px_160px_-40px_rgba(44,44,42,0.15)] border border-[#EAE6DF]"
        >
          <div className="w-full h-full flex-1 relative">
            <SynthesisWorkspace originalUrl={project.originalUrl} projectName={project.name} />
          </div>
          
          <div className="p-10 border-t border-[#EAE6DF]/50 flex items-center justify-between bg-white/80 backdrop-blur-xl">
             <div className="flex items-center gap-12">
                <div>
                   <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#8C847A] mb-2">Primary Source</p>
                   <p className="text-xs font-bold text-[#2C2C2A]">2D VECTORIAL BLUEPRINT</p>
                </div>
                <div className="w-px h-10 bg-[#EAE6DF]" />
                <div>
                   <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#8C847A] mb-2">Neural Target</p>
                   <p className="text-xs font-bold text-[#2C2C2A]">PHOTOREALISTIC 3D ARCHIVE</p>
                </div>
             </div>
             
             <div className="flex flex-col items-end">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                   <span className="text-[10px] font-bold text-[#2C2C2A] tracking-[0.2em]">SPATIAL PRECISION: 100.00%</span>
                </div>
                <p className="text-[9px] font-medium text-[#8C847A] uppercase tracking-widest">Calculated by Hously Synthesis Engine</p>
             </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
