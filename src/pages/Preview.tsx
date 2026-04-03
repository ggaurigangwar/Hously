import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Cpu, Box, ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TiltCard } from '../components/TiltCard';

const steps = [
  {
    id: 1,
    title: "Upload Your Flat Blueprint",
    description: "Start by supplying any standard 2D blueprint, sketch, or schematic. Real estate listings, AutoCAD PDFs, or simple hand-drawn walls all work perfectly. Hously reads lines and boundaries identically to a human architect.",
    icon: <Upload className="w-12 h-12 text-[#FFB5A7]" />,
    color: "from-[#FFB5A7] to-[#FFC2B6]"
  },
  {
    id: 2,
    title: "AI Dimensional Translation",
    description: "Our core engine activates instantly. It sweeps across your 2D lines, extruding them into mathematically precise 3D space. It calculates realistic lighting, establishes foundational floor metrics, and constructs the walls automatically.",
    icon: <Cpu className="w-12 h-12 text-[#CDB4DB]" />,
    color: "from-[#CDB4DB] to-[#BDE0FE]"
  },
  {
    id: 3,
    title: "Instantly Compare & Export",
    description: "Once processed, you are granted full access to the interactive comparison module. Slide smoothly between your flat 2D blueprint and the photorealistic 3D environment, and export it locally to present directly to your clients.",
    icon: <Box className="w-12 h-12 text-[#FFC2B6]" />,
    color: "from-[#FFC2B6] to-[#CDB4DB]"
  }
];

export function Preview() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="flex w-full min-h-[90vh] items-center justify-center px-4 relative overflow-hidden bg-background">
      <div className="orb-1" />
      <div className="orb-2" />
      
      <div className="absolute top-8 left-8 z-20">
        <Link to="/" className="flex items-center gap-2 text-[#663C35] hover:text-[#FFB5A7] transition-colors font-bold bg-white/50 px-4 py-2 rounded-xl backdrop-blur-md shadow-sm">
          <Home className="w-5 h-5" />
          Home
        </Link>
      </div>

      <div className="w-full max-w-5xl z-10 flex flex-col items-center mt-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tighter text-[#4A4A4A] mb-4"
          >
            How Hously Thinks.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#4A4A4A]/80 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Hously strips away technical friction. We don't require 3D modeling skills. Here is exactly how we transform your 2D lines into immersive structural realities.
          </motion.p>
        </div>

        <div style={{ perspective: "1500px" }} className="w-full relative min-h-[420px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100, rotateY: -5 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: 5 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute w-full max-w-3xl"
            >
              <TiltCard depth={10}>
                <div className="aether-card p-14 flex flex-col items-center text-center shadow-xl border-white/60">
                  <div className={`w-28 h-28 rounded-[2rem] bg-gradient-to-br ${steps[currentStep].color} p-1 mb-8 shadow-2xl`}>
                    <div className="w-full h-full bg-[#FCFBF9] rounded-[1.8rem] flex items-center justify-center inner-shadow">
                      {steps[currentStep].icon}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-extrabold text-[#663C35] mb-5 tracking-tight">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-[#4A4A4A]/80 text-[1.1rem] leading-loose max-w-lg font-medium">
                    {steps[currentStep].description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-8 mt-12 z-20">
          <button 
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`p-4 rounded-full border border-border backdrop-blur-md transition-all ${currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#FFB5A7]/10 hover:border-[#FFB5A7] text-[#663C35]'}`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-4">
            {steps.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${currentStep === idx ? 'w-10 bg-[#FFB5A7]' : 'w-2.5 bg-[#CDB4DB]/40'}`}
              />
            ))}
          </div>

          <button 
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className={`p-4 rounded-full border border-border backdrop-blur-md transition-all ${currentStep === steps.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#FFB5A7]/10 hover:border-[#FFB5A7] text-[#663C35]'}`}
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {currentStep === steps.length - 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 z-20"
          >
            <Link to="/signup">
              <button className="tactile-button shadow-2xl backdrop-blur-md">
                Enter The Studio
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
