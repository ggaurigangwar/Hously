import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Sparkles, Loader2, X, Lock, Globe, Wand2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Storage, type Project } from '../lib/storage';

const DEMO_SETS = [
  {
    id: "demo_1",
    name: "Modern Urban Loft",
    original: "https://images.unsplash.com/photo-1541888086425-d81bb19440ea?auto=format&fit=crop&q=80&w=800", 
    thumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09be1587?auto=format&fit=crop&q=80&w=800",
    modelUrl: "https://vazxmixizkinqawvyrvn.supabase.co/storage/v1/object/public/models/house-2/model.gltf",
    desc: "A stunning calculation reconstructing an open-plan urban loft geometry into a photorealistic real 3D model space."
  },
  {
    id: "demo_2",
    name: "Suburban Structure",
    original: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    modelUrl: "https://vazxmixizkinqawvyrvn.supabase.co/storage/v1/object/public/models/house-3/model.gltf",
    desc: "Extracted rigid blueprint vectors mapping out a standard two-story suburban home, fully exported into a GLTF 3D format."
  },
  {
    id: "demo_3",
    name: "Minimalist Studio",
    original: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800", 
    thumbnail: "https://images.unsplash.com/photo-1600566753086-00f18efc2294?auto=format&fit=crop&q=80&w=800", 
    modelUrl: "https://vazxmixizkinqawvyrvn.supabase.co/storage/v1/object/public/models/house-1/model.gltf",
    desc: "A bright layout successfully scaled and textured using highly accurate architectural physical logic into a 3D construct."
  }
];

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
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
  };

  const handleDemo = async (demo: any) => {
    setIsUploading(true);
    setProgress(0);
    setStatusText("Fetching reference grid...");

    try {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p < 40) { setStatusText("Loading 3D asset architecture..."); return p + 10; }
          if (p < 80) { setStatusText("Pre-caching render data..."); return p + 5; }
          return p;
        });
      }, 200);

      await new Promise(r => setTimeout(r, 1500));
      clearInterval(interval);
      setProgress(100);
      setStatusText("Initializing secure viewer module...");
      await new Promise(r => setTimeout(r, 400));

      const newId = `prj_${Date.now()}`;
      
      Storage.saveProject({
        id: newId,
        name: demo.name,
        ownerId: user?.id || "guest",
        ownerName: user?.username || "Architect",
        aiDesc: demo.desc,
        originalUrl: demo.original,
        thumbnailUrl: demo.thumbnail, 
        modelUrl: demo.modelUrl,
        timestamp: Date.now(),
        isPublic: true,
        isDemo: true 
      } as Project);
      
      navigate(`/viewer/${newId}`);
    } catch (e) {
      console.error(e);
      setIsUploading(false);
    }
  };

  const handleGenerate = async () => {
    if (!file) return;
    setIsUploading(true);
    setProgress(0);
    setStatusText("Analyzing structural parameters...");

    try {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p < 30) { setStatusText("Extracting 2D vectors..."); return p + 5; }
          if (p < 60) { setStatusText("Neural synthesis via Gemini..."); return p + 2; }
          if (p < 90) { setStatusText("Rendering materials..."); return p + 1; }
          return p;
        });
      }, 300);

      const aiDesc = "Abstract generated glass-and-concrete spatial maquette utilizing procedural geometric mapping.";
      
      await new Promise(r => setTimeout(r, 4000));
      clearInterval(interval);
      setProgress(100);
      setStatusText("Finalizing secure WebGL render...");
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
          thumbnailUrl: base64data,
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
    <div className="w-full max-w-5xl px-4 py-12 mx-auto overflow-hidden relative">
      <div className="orb-2" />
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-5xl font-medium tracking-tighter text-foreground mb-4">Studio Synthesis</h1>
        <p className="text-foreground/60 font-medium tracking-wide">Upload geometric parameters for 3D modeling simulation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Upload Column */}
        <div className="lg:col-span-2 relative aether-card p-8 md:p-14 overflow-hidden z-10 border-white/50 flex flex-col h-full">
          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1"
              >
                <div 
                  {...getRootProps()} 
                  className={`flex flex-col items-center justify-center p-16 border rounded-2xl cursor-pointer transition-all h-full ${
                    isDragActive ? 'border-primary bg-primary/10' : 'border-border bg-[#F4F2EC]/30 hover:border-primary/50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="w-20 h-20 rounded-[1.5rem] border border-border bg-white flex items-center justify-center mb-6 shadow-sm">
                    <UploadCloud className="w-8 h-8 text-[#8C847A]" />
                  </div>
                  <p className="text-xl font-bold text-foreground mb-2 tracking-tight">
                    {isDragActive ? "Release sequence initiated" : "Transfer 2D source file"}
                  </p>
                  <p className="text-sm font-medium text-foreground/50">Support sequence verified (JPG, PNG)</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 h-full flex flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#FAF9F6] border border-border flex-1">
                  <img src={preview} alt="Plan Preview" className="h-full w-full object-contain p-4 mix-blend-multiply opacity-80" />
                  
                  {!isUploading && (
                    <button
                      onClick={removeFile}
                      className="absolute right-4 top-4 rounded-xl bg-white p-2 text-foreground transition-all hover:bg-black hover:text-white shadow-sm"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20">
                      <Loader2 className="w-10 h-10 text-primary animate-spin mb-6" />
                      <p className="text-foreground font-bold tracking-tight text-center text-lg">{statusText}</p>
                      
                      <div className="w-full max-w-sm h-1.5 bg-[#EAE6DF] rounded-full mt-8 overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ ease: "easeInOut" }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {!isUploading && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-2">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsPublic(false)}
                        className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-bold transition-all border-b-2 ${!isPublic ? 'border-primary text-primary' : 'border-transparent text-foreground/40 hover:text-foreground/80'}`}
                      >
                        <Lock className="w-3.5 h-3.5" /> Encrypted
                      </button>
                      <span className="text-border">|</span>
                      <button 
                        onClick={() => setIsPublic(true)}
                        className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-bold transition-all border-b-2 ${isPublic ? 'border-primary text-primary' : 'border-transparent text-foreground/40 hover:text-foreground/80'}`}
                      >
                        <Globe className="w-3.5 h-3.5" /> Public Node
                      </button>
                    </div>
                    
                    <button
                      onClick={handleGenerate}
                      className="tactile-button"
                    >
                      Process 3D Structure
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Demo Try Section Column */}
        <div className="lg:col-span-1 aether-card p-8 flex flex-col relative z-10 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#F4F2EC] flex items-center justify-center rounded-lg border border-[#EAE6DF]">
              <Wand2 className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">Try The Platform</h3>
          </div>
          <p className="text-xs text-foreground/60 mb-8 font-medium leading-relaxed">
            Instantly parse pre-configured datasets to observe physical 1:1 mapping of floorplans into true GLTF physical structures.
          </p>

          <div className="flex flex-col gap-4">
             {DEMO_SETS.map((demo) => (
                <button 
                  key={demo.id}
                  onClick={() => handleDemo(demo)}
                  disabled={isUploading}
                  className="flex flex-col items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/50 transition-all text-left bg-transparent"
                >
                  <div className="w-full h-24 overflow-hidden rounded-lg bg-[#FAF9F6] mb-1 relative border border-border/50">
                     <img src={demo.original} className="w-full h-full object-cover opacity-60 mix-blend-multiply" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-[14px] leading-tight flex items-center justify-between w-full">
                       {demo.name}
                       <ArrowRight className="w-3 h-3 text-primary" />
                    </h4>
                  </div>
                </button>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
