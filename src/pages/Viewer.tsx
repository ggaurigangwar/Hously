import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

interface Project {
  id: string;
  name: string;
  ownerName: string;
  aiDesc: string;
  originalUrl: string;
  thumbnailUrl: string;
}

export function Viewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    async function loadProject() {
      try {
        const puter = (window as any).puter || await import('@heyputer/puter.js').then(m => m.default || m);
        const data = await puter.kv.get(`hously_${id}`);
        if (data) {
          setProject(data);
        } else {
          setProject({
            id: id || "demo",
            name: "Luminous Retreat",
            ownerName: "Demo Workspace",
            aiDesc: "A breathtaking architectural synthesis generated via neural spatial understanding. Light, white, and sublime geometry.",
            originalUrl: "https://picsum.photos/seed/plan/800/600",
            thumbnailUrl: "https://picsum.photos/seed/render/800/600"
          });
        }
      } catch (e) {
          setProject({
            id: id || "demo",
            name: "Luminous Retreat",
            ownerName: "Demo Workspace",
            aiDesc: "A breathtaking architectural synthesis generated via neural spatial understanding. Light, white, and sublime geometry.",
            originalUrl: "https://picsum.photos/seed/plan/800/600",
            thumbnailUrl: "https://picsum.photos/seed/render/800/600"
          });
      } finally {
        setIsLoading(false);
      }
    }
    loadProject();
  }, [id]);

  const handleDownload = () => {
    if (!project) return;
    const a = document.createElement('a');
    a.href = project.thumbnailUrl;
    a.download = `${project.name.replace(/\s+/g, '_')}_render.jpg`;
    a.click();
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-10 w-10 animate-[spin_1.5s_linear_infinite] rounded-full border border-[#10b981]/40 border-t-[#10b981]"></div>
      </div>
    );
  }

  if (!project) {
    return <div className="p-20 text-center text-[#064e3b]">Project not found</div>;
  }

  return (
    <div className="w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mx-auto flex flex-col h-full flex-1 relative overflow-hidden">
      <div className="orb-2" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 z-10 relative"
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 rounded-xl bg-white/60 hover:bg-[#10b981] transition-colors text-[#064e3b] hover:text-white shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-[#022c22] tracking-tight">{project.name}</h1>
            <p className="text-sm font-medium text-[#064e3b]/60 mt-1">by {project.ownerName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="tactile-button-outline !px-4 !py-3"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownload}
            className="tactile-button !px-6 !py-3"
          >
            <Download className="w-4 h-4 mr-2" />
            Export High-Res
          </button>
        </div>
      </motion.div>

      <motion.div 
         initial={{ opacity: 0, scale: 0.98 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.2, duration: 0.8 }}
         className="flex-1 min-h-[60vh] rounded-[24px] overflow-hidden aether-card z-10"
      >
        <ReactCompareSlider
          itemOne={<ReactCompareSliderImage src={project.originalUrl} alt="2D Plan" />}
          itemTwo={<ReactCompareSliderImage src={project.thumbnailUrl} alt="3D Render" />}
          className="w-full h-[70vh] object-cover"
        />
      </motion.div>

      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.4 }}
         className="mt-8 p-8 bg-white/80 backdrop-blur-xl rounded-2xl aether-card max-w-3xl z-10"
      >
        <h3 className="text-xs font-bold text-[#10b981] mb-2 tracking-widest uppercase">Genesis Interpretation</h3>
        <p className="text-[#064e3b] font-medium leading-relaxed">{project.aiDesc}</p>
      </motion.div>
    </div>
  );
}
