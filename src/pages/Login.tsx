import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Box } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TiltCard } from '../components/TiltCard';
import puter from '@heyputer/puter.js';

export function Login() {
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const signedIn = await puter.signIn();
      if (signedIn) {
        navigate('/upload');
      }
    } catch (err) {
      console.error("Sign in failed", err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="flex w-full min-h-[90vh] items-center justify-center px-4 relative overflow-hidden bg-background">
      <div className="orb-2" />
      
      <div className="absolute top-8 left-8 z-10">
        <Link to="/" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-semibold bg-background/50 px-4 py-2 rounded-xl backdrop-blur-md">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </div>

      <div style={{ perspective: "1500px" }} className="w-full max-w-md z-10">
        <TiltCard depth={12}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 5 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full aether-card p-10 md:p-12 flex flex-col items-center relative text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-primary flex items-center justify-center mb-8 shadow-lg shadow-primary/30">
              <Box className="text-white w-8 h-8" />
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-foreground/60 mb-10 font-medium max-w-xs leading-relaxed">
              Log in to your premium architectural studio with one click.
            </p>

            <button
              onClick={handleSignIn}
              disabled={isAuthenticating}
              className="tactile-button w-full flex items-center justify-center gap-3 py-5 text-lg"
            >
              {isAuthenticating ? "Connecting..." : "Log in with Puter"}
            </button>
            
            <div className="mt-8 pt-8 border-t border-border w-full">
              <p className="text-sm font-semibold text-foreground/70">
                No studio footprint? <Link to="/signup" className="text-primary hover:text-indigo-800 transition-colors font-bold underline decoration-2 underline-offset-4">Create one</Link>
              </p>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </div>
  );
}
