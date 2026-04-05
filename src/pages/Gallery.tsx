import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Storage, type Project } from '../lib/storage';

export function Gallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user, isSignedIn } = useOutletContext<any>();

  useEffect(() => {
    if (user) {
      const allProjects = Storage.getProjects();
      const myProjects = allProjects.filter(p => p.ownerId === user.id).sort((a,b) => b.timestamp - a.timestamp);
      setProjects(myProjects);
    }
  }, [user]);

  if (!isSignedIn) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center bg-background min-h-[60vh]">
        <h2 className="text-3xl font-bold text-foreground">Restricted Sector</h2>
        <p className="mt-4 text-foreground/60 max-w-md">You must configure an authentication fingerprint to browse your project cache.</p>
        <Link to="/login" className="mt-8 tactile-button">Establish Identity</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl px-4 py-24 mx-auto overflow-hidden relative min-h-screen">
      {/* Background architectural depth */}
      <div className="orb-1 opacity-10 blur-[180px] -top-40 -left-40 bg-primary w-[1000px] h-[1000px] rounded-full" />
      
      <div className="relative z-10 mb-32 text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <p className="text-primary font-extrabold tracking-[0.4em] uppercase text-[10px] mb-6">Autonomous Laboratory</p>
          <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-foreground mb-4 leading-none">Architectural Archive</h1>
          <div className="w-12 h-px bg-primary/30 mt-8" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 relative z-10 w-full mb-40">
        {projects.length === 0 ? (
          <div className="col-span-full py-40 flex flex-col items-center text-center">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="aether-glass p-16 rounded-[40px] border-dashed border-2 border-[#EAE6DF] max-w-lg"
            >
              <h3 className="text-2xl font-medium text-foreground mb-4">The Archive is Empty</h3>
              <p className="text-foreground/40 mb-10 text-sm font-medium leading-relaxed">No structural extractions have been initiated. Witness the power of structural synthesis now.</p>
              <Link to="/upload">
                <button className="tactile-button !rounded-full !px-12">Initialize Primary Node</button>
              </Link>
            </motion.div>
          </div>
        ) : (
          projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: 1000 }}
              className="group cursor-pointer"
            >
              <Link to={`/viewer/${proj.id}`}>
                <motion.div
                  whileHover={{ 
                    rotateX: 10, 
                    rotateY: -8, 
                    scale: 1.02,
                    z: 50
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-white border border-[#EAE6DF] shadow-[0_30px_60px_-15px_rgba(44,44,42,0.08)] transform-gpu"
                >
                  <img 
                    src={proj.thumbnailUrl} 
                    alt={proj.name} 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                  />
                  
                  {/* Subtle Top Shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                <div className="mt-8 px-4 flex flex-col items-center">
                   <h3 className="text-2xl font-bold tracking-tight text-foreground mb-1">{proj.name}</h3>
                   <div className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8C847A]">Structural Node: {proj.id.slice(-4)}</span>
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
