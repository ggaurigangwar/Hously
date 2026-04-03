import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Sparkles, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const navigate = useNavigate();

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

  const handleGenerate = async () => {
    if (!file) return;
    setIsUploading(true);
    setProgress(0);
    setStatusText("Analyzing structural parameters...");

    try {
      const puter = (window as any).puter || await import('@heyputer/puter.js').then(m => m.default || m);
      
      const interval = setInterval(() => {
        setProgress(p => {
          if (p < 30) { setStatusText("Extracting 2D vectors..."); return p + 5; }
          if (p < 60) { setStatusText("Neural synthesis via Gemini..."); return p + 2; }
          if (p < 90) { setStatusText("Rendering materials..."); return p + 1; }
          return p;
        });
      }, 500);

      // Attempt AI call using puter.ai.chat
      const basePrompt = "Analyze this floor plan and return a highly detailed, descriptive architect's prompt for creating a photorealistic 3D top-down render of this specific floor plan. Focus on lighting, materials, and layout geometry.";
      
      let aiDesc = "Premium generated 3D visual mapping of a minimalist structure featuring natural light and stark geometry.";
      try {
         const resp = await puter.ai.chat(basePrompt, file);
         if (resp && resp.message && resp.message.content) {
            aiDesc = resp.message.content;
         }
      } catch (err) {
         console.warn("AI generation logic skipped or failed - using fallback description", err);
      }

      // Simulate the rest of the generation process
      clearInterval(interval);
      setProgress(100);
      setStatusText("Finalizing render...");
      await new Promise(r => setTimeout(r, 600));

      const newId = `prj_${Date.now()}`;
      
      // Attempt to save project metadata to Puter KV
      try {
        const user = await puter.auth.getUser();
        const projectData = {
          id: newId,
          name: file.name.split('.')[0] || "Untitled Structure",
          ownerName: user.username || "Architect",
          aiDesc: aiDesc,
          originalUrl: "https://picsum.photos/seed/plan/800/600",
          thumbnailUrl: "https://picsum.photos/seed/render/800/600",
          timestamp: Date.now()
        };
        await puter.kv.set(`hously_${newId}`, projectData);
      } catch (err) {
         console.warn("KV save skipped - running locally");
      }
      
      navigate(`/viewer/${newId}`, { state: { description: aiDesc } });
    } catch (e) {
      console.error(e);
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl px-4 py-12 mx-auto overflow-hidden relative">
      <div className="orb-2" />
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-5xl font-extrabold tracking-tighter text-[#022c22] mb-4">Studio Synthesis</h1>
        <p className="text-[#064e3b]/60 font-medium">Upload your flat 2D floor plan for intelligent 3D synthesis.</p>
      </div>

      <div className="relative aether-card p-8 md:p-14 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/5 to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div 
                {...getRootProps()} 
                className={`flex flex-col items-center justify-center p-16 border-2 rounded-2xl cursor-pointer transition-all ${
                  isDragActive ? 'border-[#34d399] bg-[#10b981]/10 shadow-[inner_0_2px_15px_rgba(16,185,129,0.1)]' : 'border-[#e2e8e4] bg-[#f8faf9] border-dashed hover:border-[#10b981]/50 hover:bg-white'
                }`}
              >
                <input {...getInputProps()} />
                <div className="w-20 h-20 rounded-full border border-[#10b981]/20 bg-white flex items-center justify-center mb-6 shadow-[0_4px_20px_rgba(4,120,87,0.05)]">
                  <UploadCloud className="w-8 h-8 text-[#10b981]" />
                </div>
                <p className="text-xl font-bold text-[#022c22] mb-2 tracking-tight">
                  {isDragActive ? "Release sequence initiated" : "Transfer 2D source file"}
                </p>
                <p className="text-sm font-medium text-[#064e3b]/50">Support sequence verified (JPG, PNG)</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#f2f7f4] shadow-inner">
                <img src={preview} alt="Plan Preview" className="h-full w-full object-contain p-4" />
                
                {!isUploading && (
                  <button
                    onClick={removeFile}
                    className="absolute right-4 top-4 rounded-xl bg-white/80 p-2 text-[#064e3b] backdrop-blur transition-all hover:bg-white hover:text-red-500 shadow-sm"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center p-6 rounded-2xl z-20">
                     <Loader2 className="w-10 h-10 text-[#10b981] animate-spin mb-6" />
                     <p className="text-[#064e3b] font-bold tracking-tight text-center text-lg">{statusText}</p>
                     
                     <div className="w-full max-w-sm h-1.5 bg-[#e2e8e4] rounded-full mt-8 overflow-hidden shadow-inner">
                       <motion.div 
                         className="h-full bg-gradient-to-r from-[#059669] to-[#34d399]"
                         initial={{ width: 0 }}
                         animate={{ width: `${progress}%` }}
                         transition={{ ease: "easeInOut" }}
                       />
                     </div>
                  </div>
                )}
              </div>

              {!isUploading && (
                <button
                  onClick={handleGenerate}
                  className="tactile-button w-full sm:w-auto mx-auto mt-4"
                >
                  <Sparkles className="w-5 h-5 mr-3" />
                  Initiate 3D Render
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
