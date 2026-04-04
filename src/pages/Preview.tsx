import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Cpu, Box, ArrowRight, ArrowLeft, Home, Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TiltCard } from '../components/TiltCard';

const steps = [
  {
    id: 1,
    title: "1. Photorealistic Synthesis",
    description: "Convert the input 2D floor plan into a photorealistic top-down 3D architectural render. We automatically strip all text, numbers, labels, and dimensions for a clean aesthetic.",
    icon: <Upload className="w-12 h-12 text-[#8C847A]" />,
    color: "from-[#F3F2EE] to-[#EAE6DF]"
  },
  {
    id: 2,
    title: "2. Geometric Integrity",
    description: "Walls, rooms, doors, and windows follow the exact lines and positions of your original 2D sketch with zero shifting or resizing.",
    icon: <Cpu className="w-12 h-12 text-[#2C2C2A]" />,
    color: "from-[#2C2C2A]/5 to-[#2C2C2A]/10"
  },
  {
    id: 3,
    title: "3. Material Fidelity",
    description: "Crisp edges, balanced neutral lighting, and ultra-realistic textures (concrete, wood, glass) are applied to every surface automatically.",
    icon: <Box className="w-12 h-12 text-[#A3A79A]" />,
    color: "from-[#A3A79A]/10 to-[#A3A79A]/20"
  },
  {
    id: 4,
    title: "4. Semantic Furnishing",
    description: "We identify and place realistic furniture—beds, sofas, dining tables—exactly where they were indicated in your original 2D layout.",
    icon: <Home className="w-12 h-12 text-[#8C847A]" />,
    color: "from-[#8C847A]/10 to-[#8C847A]/20"
  }
];

export function Preview() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="flex w-full min-h-screen items-center justify-center px-4 relative overflow-hidden bg-[#FAF9F6] pb-24">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EAE6DF]/30 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#A3A79A]/20 blur-[120px] rounded-full -ml-64 -mb-64" />
      
      <div className="w-full max-w-7xl z-10 flex flex-col items-center mt-24">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#EAE6DF] bg-white rounded-full mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8C847A]">System Demonstration</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#2C2C2A] mb-6"
          >
            Architecture, <br />
            <span className="text-[#A3A79A] italic font-normal">Reimagined.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#2C2C2A]/60 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Observe how Hously transforms raw 2D floor plans into photorealistic 3D environments with surgical precision. 
          </motion.p>
        </div>

        <div className="w-full flex flex-col lg:flex-row items-center gap-20 px-4">
          
          {/* Left Side: Video Demonstration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-3/5"
          >
            <div className="relative group rounded-[2.5rem] border-[12px] border-white shadow-[0_50px_100px_rgba(0,0,0,0.08)] bg-white overflow-hidden aspect-[16/10]">
              {/* Overlay with scanning effect */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="w-full h-1 bg-primary/30 blur-sm absolute animate-scan top-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Video/Image Simulation */}
              <div className="absolute inset-0 bg-[#F3F2EE] flex items-center justify-center overflow-hidden">
                <motion.div 
                   animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="relative w-full h-full"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
                    className="w-full h-full object-cover opacity-90 transition-all duration-700 filter group-hover:brightness-110" 
                    alt="2D to 3D ARCH"
                  />
                  {/* Procedural 3D Overlays */}
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                    <div className="w-full h-full border-[1px] border-white/20 grid grid-cols-8 grid-rows-8 opacity-30">
                      {Array.from({length: 64}).map((_, i) => <div key={i} className="border-[0.5px] border-white/10" />)}
                    </div>
                  </div>
                </motion.div>
                
                {/* Visual UI Elements */}
                <div className="absolute bottom-8 left-8 text-white z-30 drop-shadow-lg">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-1">Synthesizing</p>
                  <p className="text-xl font-bold font-mono">RENDER_V4_8K.OBJ</p>
                </div>
              </div>

              {/* Interaction Elements */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute top-8 right-8 z-30 w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-300"
              >
                {isPlaying ? <span className="w-4 h-4 bg-white rounded-sm" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
            </div>
          </motion.div>

          {/* Right Side: Procedure Steps */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center min-h-[400px]">
            <div className="space-y-4 mb-12">
               {steps.map((step, idx) => (
                 <motion.div
                   key={step.id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: idx * 0.1 + 0.5 }}
                   className={`p-6 rounded-3xl border transition-all duration-500 cursor-pointer ${currentStep === idx ? 'bg-white border-[#EAE6DF] shadow-xl' : 'hover:bg-white/40 border-transparent'}`}
                   onClick={() => setCurrentStep(idx)}
                 >
                   <div className="flex gap-6">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0`}>
                        {React.cloneElement(step.icon as React.ReactElement, { className: 'w-5 h-5 text-[#2C2C2A]' })}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#2C2C2A] mb-1">{step.title}</h3>
                        <p className={`text-sm leading-relaxed ${currentStep === idx ? 'text-[#2C2C2A]/70' : 'text-[#8C847A]/30 line-clamp-1'}`}>
                          {step.description}
                        </p>
                      </div>
                   </div>
                 </motion.div>
               ))}
            </div>

            <div className="flex items-center justify-between px-2">
               <Link to="/contact">
                 <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#8C847A] hover:text-primary transition-colors">
                   <Info className="w-4 h-4" />
                   Technical Specs
                 </button>
               </Link>
               <Link to="/signup">
                 <button className="tactile-button !px-10">
                   Start Your Project
                 </button>
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
