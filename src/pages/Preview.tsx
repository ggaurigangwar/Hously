import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Cpu, Box, ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TiltCard } from '../components/TiltCard';

const steps = [
  {
    id: 1,
    title: "1. Upload 2D Blueprint",
    description: "Start by dropping any standard 2D floor plan. We support PDF, PNG, or DWG files.",
    icon: <Upload className="w-12 h-12 text-primary" />,
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 2,
    title: "2. Hously AI Processing",
    description: "Our proprietary engine instantly interprets walls, doors, windows, and spatial metrics.",
    icon: <Cpu className="w-12 h-12 text-primary" />,
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: 3,
    title: "3. Immersive 3D Tour",
    description: "Step into your newly generated 3D space with physically accurate lighting and materials.",
    icon: <Box className="w-12 h-12 text-primary" />,
    color: "from-purple-500 to-pink-500"
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
        <Link to="/" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-semibold bg-background/50 px-4 py-2 rounded-xl backdrop-blur-md">
          <Home className="w-5 h-5" />
          Home
        </Link>
      </div>

      <div className="w-full max-w-5xl z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            How Hously Works
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground/70 font-medium max-w-2xl mx-auto"
          >
            A mesmerizing journey from simple lines to an immersive digital reality.
          </motion.p>
        </div>

        <div style={{ perspective: "1500px" }} className="w-full relative min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: 10 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute w-full max-w-2xl"
            >
              <TiltCard depth={15}>
                <div className="aether-card p-12 flex flex-col items-center text-center">
                  <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${steps[currentStep].color} p-0.5 mb-8 shadow-2xl`}>
                    <div className="w-full h-full bg-background rounded-[23px] flex items-center justify-center inner-shadow">
                      {steps[currentStep].icon}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r text-foreground mb-4">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-foreground/70 text-lg leading-relaxed max-w-md">
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
            className={`p-4 rounded-full border border-border backdrop-blur-md transition-all ${currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/5 hover:border-primary/30'}`}
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>

          <div className="flex gap-3">
            {steps.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-500 ${currentStep === idx ? 'w-8 bg-primary' : 'w-2 bg-primary/20'}`}
              />
            ))}
          </div>

          <button 
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className={`p-4 rounded-full border border-border backdrop-blur-md transition-all ${currentStep === steps.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/5 hover:border-primary/30'}`}
          >
            <ArrowRight className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {currentStep === steps.length - 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 z-20"
          >
            <Link to="/signup">
              <button className="tactile-button">
                Start Creating Now
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
