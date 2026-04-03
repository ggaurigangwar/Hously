import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { RealisticArchitecturalLanding } from '../components/ThreeDSequence';

export function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FAF9F6]">
      {/* 4K Cinematic True 3D House Tour Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [20, 20, 20], fov: 40 }} gl={{ alpha: false, antialias: true }}>
          <color attach="background" args={['#FAF9F6']} />
          <Suspense fallback={null}>
            <RealisticArchitecturalLanding />
          </Suspense>
        </Canvas>
        {/* Soft lower gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent opacity-80" />
      </div>

      {/* Rareism Luxe Overlay UI */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-24 px-8 md:px-24 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          className="max-w-4xl"
        >
          <div className="inline-block px-4 py-2 mb-6 border border-[#EAE6DF] bg-white/40 backdrop-blur-xl rounded-full pointer-events-auto shadow-sm">
            <span className="text-[10px] font-extrabold tracking-[0.3em] uppercase text-[#8C847A]">Interactive Photorealistic 3D</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-medium tracking-tighter text-[#2C2C2A] leading-[1.05] mb-8 drop-shadow-xl">
            The Origin of <br />
            <span className="text-[#A3A79A] italic font-normal">Structure.</span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 pointer-events-auto">
             <Link to="/signup">
                <button className="tactile-button group flex items-center justify-center !px-10 !py-5">
                   Enter Platform 
                   <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
                </button>
             </Link>
             <p className="max-w-xs text-[#2C2C2A]/70 text-sm leading-relaxed font-bold">
               Witness the impossible. From identical 2D vectors transformed into true photorealistic 3D extraction.
             </p>
          </div>
        </motion.div>
      </div>

      {/* Subtle Frame borders for the Rareism aesthetic */}
      <div className="absolute top-8 left-8 right-8 bottom-8 border border-[#2C2C2A]/5 pointer-events-none z-20 mix-blend-overlay" />
    </div>
  );
}
