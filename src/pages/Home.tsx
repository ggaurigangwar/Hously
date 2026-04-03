import React from 'react';
import { motion } from 'framer-motion';
import { Link, useOutletContext } from 'react-router-dom';
import { TiltCard } from '../components/TiltCard';

export function Home() {
  const { isSignedIn } = useOutletContext<{ isSignedIn: boolean }>();

  return (
    <div className="flex w-full min-h-[90vh] flex-col items-center justify-center px-4 relative overflow-hidden bg-background">
      {/* 3D Core floating orbs defined in CSS */}
      <div className="orb-1" />
      <div className="orb-2" />

      <div style={{ perspective: "1500px" }} className="w-full flex justify-center mt-[-5vh]">
        <TiltCard depth={8} className="w-full max-w-4xl z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="aether-card p-16 md:p-24 text-center flex flex-col items-center w-full"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="mb-8 rounded-full bg-primary/10 px-6 py-2 text-sm font-bold text-primary"
            >
              The Next Evolution in Space
            </motion.div>

            <h1 className="mb-8 text-6xl font-extrabold tracking-tighter text-foreground sm:text-8xl leading-[1.1] drop-shadow-sm">
              Architecture,<br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">Reimagined.</span>
            </h1>
            
            <p className="mb-14 max-w-2xl text-xl text-foreground/80 font-medium leading-relaxed">
              Synthesize 2D floor plans into breathtaking, immersive 3D visualizations in seconds. Minimalist design driven by pure physical tactile feedback.
            </p>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row w-full sm:w-auto">
              <Link to={isSignedIn ? "/upload" : "/login"} className="w-full sm:w-auto">
                <button className="tactile-button w-full sm:w-auto">
                  {isSignedIn ? "Enter Studio" : "Sign in/Sign up"}
                </button>
              </Link>
              
              <Link to="/preview" className="w-full sm:w-auto">
                 <button className="tactile-button-outline w-full sm:w-auto">
                  Preview
                </button>
              </Link>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </div>
  );
}
