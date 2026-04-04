import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Cpu, Box, ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TiltCard } from '../components/TiltCard';

const steps = [
  {
    id: 1,
    title: "1. Primary Task",
    description: "Convert the input 2D floor plan into a photorealistic top-down 3D architectural render. Strict Exclusions: Remove all text, letters, numbers, labels, or dimensions from the final render.",
    icon: <Upload className="w-12 h-12 text-[#FFB5A7]" />,
    color: "from-[#FFB5A7] to-[#FFC2B6]"
  },
  {
    id: 2,
    title: "2. Geometric Accuracy",
    description: "Walls, rooms, doors, and windows logically follow the exact lines and positions of the original 2D plan without shifting or resizing.",
    icon: <Cpu className="w-12 h-12 text-[#CDB4DB]" />,
    color: "from-[#CDB4DB] to-[#BDE0FE]"
  },
  {
    id: 3,
    title: "3. Visual Quality",
    description: "Ensure the output has crisp edges, balanced and bright neutral lighting, and extremely realistic materials.",
    icon: <Box className="w-12 h-12 text-[#FFC2B6]" />,
    color: "from-[#FFC2B6] to-[#CDB4DB]"
  },
  {
    id: 4,
    title: "4. Interior Details",
    description: "Add realistic furniture (such as beds, sofas, and dining tables) perfectly proportioned where they were clearly indicated in the original 2D sketch.",
    icon: <Home className="w-12 h-12 text-[#FFB5A7]" />,
    color: "from-[#FFB5A7] to-[#FFC2B6]"
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

      <div className="w-full max-w-7xl z-10 flex flex-col items-center mt-6">
        <div className="text-center mb-10 mt-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#4A4A4A] mb-3"
          >
            How Hously Thinks.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-md text-[#4A4A4A]/80 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Hously strips away technical friction. We don't require 3D modeling skills. Witness the transformation procedure below.
          </motion.p>
        </div>

        <div className="w-full flex flex-col lg:flex-row items-center gap-12 px-4">
          
          {/* Left Side: Image Demonstration */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="aether-card p-3 rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden group border border-[#EAE6DF]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFB5A7]/10 to-[#CDB4DB]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              <img 
                src="/demo_2d_to_3d.png" 
                alt="2D to 3D Demonstration" 
                className="w-full h-auto object-cover rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-700 shadow-inner" 
              />
            </div>
          </motion.div>

          {/* Right Side: Procedure Steps Carousel */}
          <div className="w-full lg:w-1/2 flex flex-col items-center min-h-[480px] justify-center">
            <div style={{ perspective: "1500px" }} className="w-full relative min-h-[380px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 100, rotateY: -5 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -100, rotateY: 5 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute w-full max-w-md"
                >
                  <TiltCard depth={10}>
                    <div className="aether-card p-10 flex flex-col items-center text-center shadow-xl border-white/60">
                      <div className={`w-24 h-24 rounded-[2rem] bg-gradient-to-br ${steps[currentStep].color} p-1 mb-6 shadow-2xl`}>
                        <div className="w-full h-full bg-[#FCFBF9] rounded-[1.8rem] flex items-center justify-center inner-shadow">
                          {steps[currentStep].icon}
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-extrabold text-[#663C35] mb-4 tracking-tight">
                        {steps[currentStep].title}
                      </h2>
                      <p className="text-[#4A4A4A]/80 text-[1rem] leading-loose max-w-sm font-medium">
                        {steps[currentStep].description}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-8 mt-6 z-20">
              <button 
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`p-3 rounded-full border border-border backdrop-blur-md transition-all ${currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#FFB5A7]/10 hover:border-[#FFB5A7] text-[#663C35]'}`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-4">
                {steps.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-2 rounded-full transition-all duration-500 ease-in-out ${currentStep === idx ? 'w-8 bg-[#FFB5A7]' : 'w-2 bg-[#CDB4DB]/40'}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className={`p-3 rounded-full border border-border backdrop-blur-md transition-all ${currentStep === steps.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#FFB5A7]/10 hover:border-[#FFB5A7] text-[#663C35]'}`}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
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
