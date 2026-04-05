import { Suspense, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Home as HomeIcon, Maximize2 } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { RealisticArchitecturalLanding } from '../components/ThreeDSequence';

const INSPIRATIONS = [
  {
    title: "Large Homes",
    desc: "Sprawling luxury estates with intricate architectural layers.",
    image: "/images/floor_plan_large_home.png",
    link: "/upload",
    tag: "Luxurious"
  },
  {
    title: "2 Bedroom Apartment",
    desc: "Modern urban efficiency designed for cinematic living.",
    image: "/images/floor_plan_2_bed.png",
    link: "/upload",
    tag: "Urban"
  },
  {
    title: "5 Bedroom Apartment",
    desc: "Multi-generational spatial logic with a focus on harmony.",
    image: "/images/floor_plan_5_bed.png",
    link: "/upload",
    tag: "Family"
  },
  {
    title: "Tiny Home",
    desc: "Minimalist vertical living within a compact footprint.",
    image: "/images/floor_plan_tiny_home.png",
    link: "/upload",
    tag: "Minimalist"
  }
];

function SmartCanvas({ children, ...props }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });
  
  return (
    <div ref={ref} className="w-full h-full">
      {isInView && (
        <Canvas {...props}>
           {children}
        </Canvas>
      )}
    </div>
  );
}

export function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#FAF9F6]">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* 4K Cinematic True 3D House Tour Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <SmartCanvas shadows dpr={[1, 1.5]} camera={{ position: [20, 20, 20], fov: 40 }} gl={{ alpha: true, antialias: true }}>
            <Suspense fallback={null}>
              <RealisticArchitecturalLanding />
            </Suspense>
          </SmartCanvas>
          {/* Subtle noise and glass overlay for Luxe feel */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent opacity-60" />
        </div>

        {/* Rareism Luxe Overlay UI */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-24 px-8 md:px-24 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-2 mb-6 border border-[#EAE6DF] bg-white/40 backdrop-blur-xl rounded-full pointer-events-auto shadow-sm">
              <span className="text-[10px] font-extrabold tracking-[0.3em] uppercase text-[#8C847A]">Interactive Photorealistic 3D</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-medium tracking-tighter text-[#2C2C2A] leading-[1.05] mb-8 drop-shadow-xl">
              Minimalist Modern <br />
              <span className="text-[#A3A79A] italic font-normal">Architecture.</span>
            </h1>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 pointer-events-auto">
               <Link to="/signup">
                  <button className="tactile-button group flex items-center justify-center !px-10 !py-5">
                     Enter Platform 
                     <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </Link>
               <p className="max-w-md text-[#2C2C2A]/70 text-sm leading-relaxed font-bold">
                 A clean, modern minimalist style built on simplicity, geometry, and natural materials. Seamless indoor-outdoor connections, raw concrete, refined wood paneling, and sharp rectangular volumes.
               </p>
            </div>
          </motion.div>
        </div>

        {/* Subtle Frame borders for the Rareism aesthetic */}
        <div className="absolute top-8 left-8 right-8 bottom-8 border border-[#2C2C2A]/5 pointer-events-none z-20 mix-blend-overlay" />
      </div>

      {/* Inspiration Section */}
      <section className="relative w-full py-40 px-8 md:px-24 bg-white z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-10"
            >
              <Compass className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Architectural Archetypes</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-[#2C2C2A] mb-8"
            >
              Design Inspiration.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-[#2C2C2A]/60 font-medium max-w-2xl mx-auto leading-relaxed"
            >
              Explore our curated collection of architectural archetypes designed to help you discover and start your structural journey.
            </motion.p>
          </div>

          {/* Inspiration Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-32 mb-20">
            {INSPIRATIONS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <Link to={item.link}>
                  <div className="relative aspect-[16/11] rounded-[48px] overflow-hidden bg-[#FAF9F6] border border-[#EAE6DF] mb-12 shadow-[0_40px_100px_rgba(0,0,0,0.03)] group-hover:shadow-[0_80px_160px_rgba(0,0,0,0.06)] transition-all duration-700 transform-gpu">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 opacity-90 group-hover:opacity-100 filter group-hover:brightness-105" 
                    />
                    
                    {/* Hover Overlay UI */}
                    <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-white/90 via-white/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 backdrop-blur-sm">
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                             <HomeIcon className="w-5 h-5 text-primary" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-[#2C2C2A]">Start Sequence</span>
                          </div>
                          <Maximize2 className="w-5 h-5 text-[#2C2C2A]" />
                       </div>
                    </div>

                    {/* Tag */}
                    <div className="absolute top-10 left-10">
                       <span className="px-4 py-2 bg-white/60 backdrop-blur-xl border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-[#2C2C2A] shadow-sm">
                          {item.tag}
                       </span>
                    </div>
                  </div>
                  
                  <div className="px-10">
                    <h3 className="text-4xl font-bold tracking-tighter text-[#2C2C2A] mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-lg text-[#2C2C2A]/60 font-medium leading-relaxed max-w-sm">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex justify-center mt-32"
          >
             <div className="h-px w-24 bg-primary/20" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
