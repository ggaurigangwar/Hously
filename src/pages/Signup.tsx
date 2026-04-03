import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, ShieldAlert, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TiltCard } from '../components/TiltCard';
import puter from '@heyputer/puter.js';

export function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    
    try {
      const signedIn = await puter.signIn();
      if (signedIn) {
        navigate('/upload');
      }
    } catch (err) {
      console.error("Sign in failed", err);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex w-full min-h-[90vh] items-center justify-center px-4 relative overflow-hidden bg-background">
      <div className="orb-1" />

      <div className="absolute top-8 left-8 z-10">
        <Link to="/" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-semibold bg-background/50 px-4 py-2 rounded-xl backdrop-blur-md">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </div>

      <div style={{ perspective: "1500px" }} className="w-full max-w-md z-10">
        <TiltCard depth={12}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full aether-card p-10 md:p-12 flex flex-col relative"
          >
            <div className="w-14 h-14 rounded-2xl border border-primary/20 bg-background flex items-center justify-center mb-8 shadow-inner shadow-primary/10">
              <ShieldAlert className="w-6 h-6 text-primary" />
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Create Account</h1>
            <p className="text-foreground/60 mb-10 font-medium">Join the vanguard of precision architecture.</p>

            <form onSubmit={handleSignUp} className="flex flex-col gap-6 relative z-10">
               <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-primary uppercase tracking-widest pl-1">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input 
                    type="text" 
                    required
                    className="tactile-input w-full pl-12" 
                    placeholder="E.g. Le Corbusier"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-primary uppercase tracking-widest pl-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input 
                    type="email"
                    required 
                    className="tactile-input w-full pl-12" 
                    placeholder="mail@hously.cloud"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-primary uppercase tracking-widest pl-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input 
                    type="password"
                    required 
                    className="tactile-input w-full pl-12" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isRegistering}
                className="tactile-button mt-4 justify-between w-full"
              >
                {isRegistering ? "Processing..." : "Generate Access"}
                <span className="bg-white/20 px-2 py-0.5 rounded-md opacity-80 text-xs shadow-sm">Secure</span>
              </button>
            </form>

            <div className="mt-8 text-center pt-8 border-t border-border">
              <p className="text-sm font-semibold text-foreground/70">
                Already verified? <Link to="/login" className="text-primary hover:text-indigo-800 transition-colors font-bold underline decoration-2 underline-offset-4">Log in</Link>
              </p>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </div>
  );
}
