import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Folders, Lock, Globe } from 'lucide-react';
import { Storage, type Project } from '../lib/storage';

export function Gallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user, isSignedIn } = useOutletContext<any>();

  useEffect(() => {
    // Only fetch current user's projects
    if (user) {
      const allProjects = Storage.getProjects();
      const myProjects = allProjects.filter(p => p.ownerId === user.id).sort((a,b) => b.timestamp - a.timestamp);
      setProjects(myProjects);
    }
  }, [user]);

  if (!isSignedIn) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center bg-background">
        <h2 className="text-3xl font-bold text-foreground">Restricted Sector</h2>
        <p className="mt-4 text-foreground/60 max-w-md">You must configure an authentication fingerprint to browse your project cache.</p>
        <Link to="/login" className="mt-8 tactile-button">Establish Identity</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl px-4 py-12 mx-auto overflow-hidden relative min-h-screen">
      <div className="orb-1" />
      
      <div className="relative z-10 mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-lg">
            <Folders className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-foreground">My Studio</h1>
        </div>
        <p className="text-foreground/60 font-medium text-lg max-w-xl">Deep contextual history of all architectural transformations initiated by your node.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 w-full mb-20">
        {projects.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center text-center aether-card">
            <h3 className="text-2xl font-bold text-foreground mb-3">No Active Syntheses</h3>
            <p className="text-foreground/50 mb-8 max-w-sm">Your project cache is empty. Upload a 2D floorplan to generate your first environment.</p>
            <Link to="/upload" className="tactile-button !px-8">Initialize Synthesis</Link>
          </div>
        ) : (
          projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="aether-card overflow-hidden shadow-xl group border-2 border-transparent hover:border-primary/20 transition-all cursor-pointer"
            >
              <Link to={`/viewer/${proj.id}`}>
                <div className="h-60 overflow-hidden relative">
                   <img src={proj.thumbnailUrl} alt={proj.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                   <span className={`absolute top-4 right-4 text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 backdrop-blur-md shadow-lg ${proj.isPublic ? 'bg-white/90 text-primary' : 'bg-black/60 text-white border border-white/20'}`}>
                    {proj.isPublic ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    {proj.isPublic ? 'Public' : 'Encrypted'}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{proj.name}</h3>
                  <p className="text-sm font-medium text-foreground/50 line-clamp-2 leading-relaxed">
                    {proj.aiDesc}
                  </p>
                  <p className="text-xs text-foreground/40 mt-4 font-semibold tracking-wider">
                    {new Date(proj.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
