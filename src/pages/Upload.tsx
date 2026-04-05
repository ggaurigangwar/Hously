import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, Lock, Globe, ArrowRight, Database, Terminal, ShieldCheck, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Storage } from '../lib/storage';

export function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();
  const { user } = useOutletContext<any>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (selected) {
      setFile(selected);
      const objectUrl = URL.createObjectURL(selected);
      setPreview(objectUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  const handleGenerate = async () => {
    if (!file) return;
    setIsUploading(true);
    setProgress(0);
    setStatusText("Analyzing architectural nodes...");

    try {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p < 20) { setStatusText("Stripping text, labels, and dimensions from source..."); return p + 5; }
          if (p < 40) { setStatusText("Aligning walls and openings with geometric precision..."); return p + 4; }
          if (p < 60) { setStatusText("Baking realistic materials and neutral lighting..."); return p + 3; }
          if (p < 80) { setStatusText("Injecting semantic furniture nodes (Sofa, Bed, Table)..."); return p + 2; }
          if (p < 95) { setStatusText("Finalizing high-fidelity 3D architectural export..."); return p + 1; }
          return p;
        });
      }, 200);

      const aiDesc = "Photorealistic top-down architectural synthesis. Protocol: 1. Remove all text, letters, numbers, labels, or dimensions. 2. Maintain exact lines and positions for walls, rooms, doors, and windows without shifting/resizing. 3. Ensure crisp edges, balanced neutral lighting, and realistic materials. 4. Add realistic furniture (beds, sofas, tables) where indicated in the original sketch.";
      
      await new Promise(r => setTimeout(r, 4500));
      clearInterval(interval);
      setProgress(100);
      setStatusText("Finalizing secure WebGL export...");
      await new Promise(r => setTimeout(r, 600));

      const newId = `prj_${Date.now()}`;
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        Storage.saveProject({
          id: newId,
          name: file.name.split('.')[0] || "Untitled Structure",
          ownerId: user?.id || "guest",
          ownerName: user?.username || "Architect",
          aiDesc: aiDesc,
          originalUrl: base64data,
          thumbnailUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09be1587?auto=format&fit=crop&q=80&w=800",
          modelUrl: "https://vazxmixizkinqawvyrvn.supabase.co/storage/v1/object/public/models/house-2/model.gltf",
          timestamp: Date.now(),
          isPublic: isPublic
        });
        navigate(`/viewer/${newId}`);
      };
      reader.readAsDataURL(file);
    } catch (e) {
      console.error(e);
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full min-h-[90vh] flex flex-col lg:flex-row relative overflow-hidden bg-[#FAF9F6]">
      {/* Subtle Background Surface */}
      <div className="absolute inset-0 bg-[#FAF9F6]" />
      
      {/* Left Column: Synthesis Control */}
      <div className="w-full lg:w-[45%] p-8 lg:p-20 flex flex-col justify-center relative z-10 border-r border-[#EAE6DF]/50 shadow-sm">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="max-w-xl mx-auto lg:mx-0 w-full"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#EAE6DF] bg-white group shadow-sm mb-10">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8C847A]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8C847A]">Verified Laboratory Node</span>
          </div>
          
          <h1 className="text-7xl font-bold tracking-tighter text-[#2C2C2A] mb-4 leading-[0.9]">
            Structural <br />
            <span className="text-[#A3A79A] italic font-normal">Synthesis.</span>
          </h1>
          <p className="text-[#2C2C2A]/60 font-medium mb-16 max-w-sm text-lg leading-relaxed">
            Begin the automated reconstruction sequence of your architectural archetypes. 
          </p>

          <div className="space-y-10">
             <AnimatePresence mode="wait">
               {!preview ? (
                 <div
                   key="upload"
                   {...getRootProps()}
                   className="relative group cursor-pointer"
                 >
                   <input {...getInputProps()} />
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.98 }}
                     className="p-16 border-2 border-dashed border-[#EAE6DF] rounded-[40px] hover:border-[#8C847A]/40 transition-all flex flex-col items-center justify-center bg-white/40 group-hover:bg-white group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.03)]"
                   >
                     <div className="w-24 h-24 rounded-[2.5rem] bg-white shadow-xl flex items-center justify-center mb-8 border border-[#EAE6DF] group-hover:scale-110 transition-transform">
                       <UploadCloud className="w-8 h-8 text-[#8C847A]" />
                     </div>
                     <p className="text-xl font-bold text-[#2C2C2A] mb-2 tracking-tight">Select Architectural Source</p>
                     <p className="text-xs font-bold text-[#8C847A] uppercase tracking-widest">{isDragActive ? "Inlet Open" : "JPG, PNG Sequence Supported"}</p>
                   </motion.div>
                 </div>
               ) : (
                 <motion.div
                   key="preview"
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="space-y-8"
                 >
                   <div className="relative aspect-video rounded-[40px] overflow-hidden border border-[#EAE6DF] bg-white shadow-2xl group">
                     <img src={preview} alt="Input" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000" />
                     {!isUploading && (
                       <button onClick={removeFile} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center text-[#2C2C2A] hover:bg-black hover:text-white transition-all backdrop-blur-xl border border-white/20">
                         <X className="w-6 h-6" />
                       </button>
                     )}
                     {isUploading && (
                       <div className="absolute inset-0 bg-white/95 backdrop-blur-3xl flex flex-col items-center justify-center p-10">
                         <div className="relative mb-10 w-20 h-20">
                            <motion.div 
                               className="absolute inset-0 border-t-2 border-primary rounded-full" 
                               animate={{ rotate: 360 }}
                               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                               <Activity className="w-6 h-6 text-primary animate-pulse" />
                            </div>
                         </div>
                         <p className="text-2xl font-bold text-[#2C2C2A] mb-6 tracking-tight">{statusText}</p>
                         <div className="w-full max-w-sm h-1 bg-[#EAE6DF] rounded-full overflow-hidden">
                           <motion.div 
                             className="h-full bg-[#2C2C2A]"
                             initial={{ width: 0 }}
                             animate={{ width: `${progress}%` }}
                           />
                         </div>
                       </div>
                     )}
                   </div>

                   {!isUploading && (
                     <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-8 justify-center p-3 bg-white border border-[#EAE6DF] rounded-3xl w-fit self-center shadow-sm">
                           <button onClick={() => setIsPublic(false)} className={`flex items-center gap-2.5 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${!isPublic ? 'bg-[#2C2C2A] text-white shadow-lg' : 'text-[#8C847A] hover:text-[#2C2C2A]'}`}>
                              <Lock className="w-3.5 h-3.5" /> Secure
                           </button>
                           <button onClick={() => setIsPublic(true)} className={`flex items-center gap-2.5 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${isPublic ? 'bg-[#2C2C2A] text-white shadow-lg' : 'text-[#8C847A] hover:text-[#2C2C2A]'}`}>
                              <Globe className="w-3.5 h-3.5" /> Public
                           </button>
                        </div>
                        <button onClick={handleGenerate} className="tactile-button !py-7 !rounded-3xl group flex items-center justify-center gap-6 shadow-2xl">
                           <span className="text-lg font-bold">Initiate Structural Extraction</span>
                           <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </button>
                     </div>
                   )}
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Right Column: High-Standard Static Composition */}
      <div className="w-full lg:w-[55%] relative flex items-center justify-center bg-white overflow-hidden">
        {/* Background photorealistic render - STATIONARY and Elegant */}
        <div className="absolute inset-0 z-0">
           <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-80" 
            alt="Architectural Composition"
           />
           <div className="absolute inset-0 bg-white/40" />
           {/* Geometric Overlay */}
           <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
              {Array.from({length: 144}).map((_, i) => <div key={i} className="border-[0.5px] border-[#2C2C2A]" />)}
           </div>
        </div>

        {/* Informational Panel */}
        <div className="relative z-10 w-full h-full p-20 flex flex-col justify-between pointer-events-none">
           <div className="flex justify-between items-start">
              <div className="space-y-2">
                 <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-[#2C2C2A]/40" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2C2C2A]/40">Active Vector Node</span>
                 </div>
                 <p className="text-[#2C2C2A] font-bold text-lg tracking-tight">Hously_Precision_Cache.ENV</p>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 tracking-[0.4em]">Ready</p>
                 <div className="w-12 h-0.5 bg-primary/20 ml-auto" />
              </div>
           </div>

           <div className="flex flex-col items-end gap-10">
              {/* Technical Diagnostics */}
              <div className="p-10 border border-[#EAE6DF] rounded-[40px] bg-white/20 backdrop-blur-2xl max-w-sm w-full">
                 <div className="flex items-center gap-3 mb-8">
                    <Terminal className="w-4 h-4 text-[#2C2C2A]" />
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#2C2C2A]">Diagnostic Live Feed</h3>
                 </div>
                 <div className="space-y-4 font-mono text-[11px] font-bold tracking-tight text-[#2C2C2A]/60">
                    <div className="flex justify-between">
                       <span>Engine Synthesis</span>
                       <span className="text-primary italic animate-pulse">Online</span>
                    </div>
                    <div className="flex justify-between border-t border-[#EAE6DF] pt-4">
                       <span>Latency Cycle</span>
                       <span>0.02ms</span>
                    </div>
                    <div className="flex justify-between border-t border-[#EAE6DF] pt-4">
                       <span>Geometry Buffer</span>
                       <span>Locked_8K</span>
                    </div>
                 </div>
              </div>
              
              <div className="flex flex-col items-end">
                 <p className="text-[300px] font-black text-[#2C2C2A]/[0.03] leading-[0.7] -mr-10 select-none">H</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
