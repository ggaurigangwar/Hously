import React, { useState } from 'react';
import { useNavigate, Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, Box } from 'lucide-react';
import { motion } from 'framer-motion';

export function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signInLocally } = useOutletContext<any>();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    signInLocally({
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      username: username || "New Architect",
      email: email || "unknown@system.local"
    });
    navigate('/upload');
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FAF9F6] overflow-hidden flex items-center justify-center py-20">
      {/* Rareism Ambient Glows */}
      <div className="orb-1" />
      <div className="orb-2" />

      {/* Authentic Technical Blueprint Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ 
             backgroundImage: `
               linear-gradient(#2C2C2A 1px, transparent 1px), 
               linear-gradient(90deg, #2C2C2A 1px, transparent 1px),
               linear-gradient(#2C2C2A 0.5px, transparent 0.5px), 
               linear-gradient(90deg, #2C2C2A 0.5px, transparent 0.5px)
             `,
             backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px'
           }} 
      />
      
      {/* Background Graphic elements to enhance Vogue Magazine feel */}
      <div className="absolute bottom-12 right-12 md:bottom-24 md:right-24 z-10 pointer-events-none text-right">
         <h1 className="text-[5rem] md:text-[9rem] font-bold text-[#FFB5A7]/20 tracking-tighter leading-none select-none mix-blend-darken">
           Registry.
         </h1>
         <p className="text-xl md:text-3xl font-medium text-[#CDB4DB]/50 tracking-widest uppercase mt-4 select-none mix-blend-darken">
           Enlist Node
         </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[500px] z-20 mx-4"
      >
        <div className="bg-white/40 backdrop-blur-3xl border border-white/60 p-10 md:p-14 rounded-3xl shadow-[0_40px_100px_rgba(255,181,167,0.15)] relative overflow-hidden">
          
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

          <div className="flex items-center justify-end gap-3 mb-10">
             <span className="text-sm tracking-[0.2em] font-extrabold text-[#2C2C2A] uppercase">Initial Setup</span>
             <div className="w-10 h-10 bg-[#FAF9F6] border border-[#EAE6DF] rounded-xl flex items-center justify-center shadow-sm">
                <Box className="w-5 h-5 text-[#2C2C2A]" />
             </div>
          </div>

          <h2 className="text-4xl font-bold tracking-tighter text-[#2C2C2A] mb-8 leading-tight">
             Define your <br/>
             <span className="italic font-normal text-[#8C847A]">Design Space.</span>
          </h2>

          <form onSubmit={handleSignup} className="space-y-5 relative z-10">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8C847A] ml-2">Alias</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-[#FAF9F6]/50 border border-white/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFB5A7]/50 transition-all font-bold text-[#2C2C2A] placeholder-[#8C847A]/30 backdrop-blur-sm"
                placeholder="Architect Name" 
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8C847A] ml-2">Network Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#FAF9F6]/50 border border-white/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFB5A7]/50 transition-all font-bold text-[#2C2C2A] placeholder-[#8C847A]/30 backdrop-blur-sm"
                placeholder="hello@studio.design" 
                disabled={loading}
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8C847A] ml-2">Encryption Key</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#FAF9F6]/50 border border-white/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFB5A7]/50 transition-all font-bold text-[1.5rem] tracking-widest text-[#2C2C2A] placeholder-[#8C847A]/30 backdrop-blur-sm"
                placeholder="••••••••" 
                disabled={loading}
                required
              />
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full relative group overflow-hidden bg-[#2C2C2A] text-white rounded-2xl px-5 py-5 flex items-center justify-between transition-all hover:bg-black hover:shadow-2xl hover:shadow-[#FFB5A7]/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#CDB4DB]/20 to-[#FFB5A7]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 font-bold tracking-wide">
                   {loading ? "Generating node signature..." : "Establish Registry"}
                </span>
                {!loading && <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-xs text-[#8C847A] font-bold tracking-widest uppercase relative z-10">
             Already mapped?{' '}
             <Link to="/login" className="text-[#2C2C2A] hover:text-[#CDB4DB] transition-colors ml-1 border-b border-[#2C2C2A]/20">Initialize Log In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
