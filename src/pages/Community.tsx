import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Globe } from 'lucide-react';
import { Storage, type Project } from '../lib/storage';

export function Community() {
  const [publicProjects, setPublicProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Only fetch Public projects
    const allProjects = Storage.getProjects();
    const publicData = allProjects.filter(p => p.isPublic).sort((a,b) => b.timestamp - a.timestamp);
    setPublicProjects(publicData);
  }, []);

  return (
    <div className="w-full max-w-7xl px-4 py-12 mx-auto overflow-hidden relative min-h-screen">
      <div className="orb-2" />
      
      <div className="relative z-10 mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-primary/20">
            <Globe className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-foreground">Global Network</h1>
        </div>
        <p className="text-foreground/60 font-medium text-lg max-w-2xl leading-relaxed">Explore architectural syntheses mapped dynamically across the global network grid.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 w-full mb-20">
        {publicProjects.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center text-center p-8 aether-card border-none bg-background/50">
            <Sparkles className="w-12 h-12 text-primary/30 mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Network Core Empty</h3>
            <p className="text-foreground/50 mb-8 max-w-md mx-auto">No architects have deployed public modules yet. Be the first to establish a public signal.</p>
            <Link to="/upload" className="tactile-button !px-8">Signal a Projection</Link>
          </div>
        ) : (
          publicProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="aether-card overflow-hidden shadow-lg group flex flex-col cursor-pointer border border-border"
            >
              <Link to={`/viewer/${proj.id}`} className="flex-1 flex flex-col">
                <div className="h-48 overflow-hidden relative rounded-t-[20px]">
                   <img src={proj.thumbnailUrl} alt={proj.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                   <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                     <span className="text-white text-xs font-bold tracking-widest uppercase truncate max-w-[120px]">{proj.name}</span>
                     <span className="text-white/60 text-[10px] font-mono tracking-widest truncate">{proj.id.split('_')[1]}</span>
                   </div>
                </div>
                <div className="p-4 flex flex-col flex-1 bg-background relative">
                  <div className="mb-4">
                    <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Node: {proj.ownerName}</p>
                    <p className="text-sm font-medium text-foreground/70 line-clamp-2 leading-relaxed">
                      {proj.aiDesc}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
