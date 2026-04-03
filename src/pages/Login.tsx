import React, { useState, Suspense } from 'react';
import { useNavigate, Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, Box } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { AuthBackground3D } from '../components/ThreeDSequence';
import { motion } from 'framer-motion';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signInLocally } = useOutletContext<any>();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    signInLocally({
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      username: username || "Architect",
      email: "architect@hously.com"
    });
    navigate('/upload');
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FAF9F6] overflow-hidden flex items-center justify-center">
      {/* Immersive Pastel Architectural 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none mix-blend-multiply">
        <Canvas camera={{ position: [5, 3, 5], fov: 40 }} gl={{ antialias: true }}>
           <Suspense fallback={null}>
             <AuthBackground3D />
           </Suspense>
        </Canvas>
      </div>
      
      {/* Left side deep typography graphic */}
      <div className="absolute top-12 left-12 md:top-24 md:left-24 z-10 pointer-events-none">
         <h1 className="text-[6rem] md:text-[10rem] font-bold text-[#CDB4DB]/20 tracking-tighter leading-none select-none mix-blend-darken">
           Hously.
         </h1>
         <p className="text-xl md:text-3xl font-medium text-[#FFB5A7]/40 tracking-widest uppercase mt-4 select-none mix-blend-darken">
           Login Interface
         </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[500px] z-20 mx-4"
      >
        <div className="bg-white/40 backdrop-blur-3xl border border-white/60 p-10 md:p-14 rounded-3xl shadow-[0_40px_100px_rgba(205,180,219,0.15)] relative overflow-hidden">
          
          {/* Subtle noise/texture over the glass */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

          <div className="flex items-center gap-3 mb-10">
             <div className="w-10 h-10 bg-[#2C2C2A] rounded-xl flex items-center justify-center shadow-lg">
                <Box className="w-5 h-5 text-[#FAF9F6]" />
             </div>
             <span className="text-sm tracking-[0.2em] font-extrabold text-[#2C2C2A] uppercase">Secure Node</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tighter text-[#2C2C2A] mb-8 leading-tight">
             Access your <br/>
             <span className="italic font-normal text-[#8C847A]">Structural Data.</span>
          </h2>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8C847A] ml-2">Identified Node</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-[#FAF9F6]/50 border border-white/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]/50 transition-all font-bold text-[#2C2C2A] placeholder-[#8C847A]/30 backdrop-blur-sm"
                placeholder="Architect Alias" 
                disabled={loading}
              />
            </div>
            
            <div className="space-y-1 pt-2">
              <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8C847A] ml-2">Passkey</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#FAF9F6]/50 border border-white/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]/50 transition-all font-bold text-[#2C2C2A] placeholder-[#8C847A]/30 backdrop-blur-sm"
                placeholder="••••••••" 
                disabled={loading}
              />
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full relative group overflow-hidden bg-[#2C2C2A] text-white rounded-2xl px-5 py-5 flex items-center justify-between transition-all hover:bg-black hover:shadow-2xl hover:shadow-[#CDB4DB]/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFB5A7]/20 to-[#CDB4DB]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 font-bold tracking-wide">
                   {loading ? "Handshaking..." : "Initialize Session"}
                </span>
                {!loading && <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-xs text-[#8C847A] font-bold tracking-widest uppercase relative z-10">
             Unregistered?{' '}
             <Link to="/signup" className="text-[#2C2C2A] hover:text-[#FFB5A7] transition-colors ml-1 border-b border-[#2C2C2A]/20">Request Access</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
