import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, LogOut, User, ChevronDown, Smartphone, Layout, Monitor, Home, Sofa, Utensils, Bath, Bed, Wind, Building2, Briefcase } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const PLATFORMS = [
  { name: 'iOS App', icon: <Smartphone className="w-4 h-4" />, desc: 'Native Apple Experience' },
  { name: 'Android App', icon: <Layout className="w-4 h-4" />, desc: 'Google Play Store' },
  { name: 'Windows Desktop', icon: <Monitor className="w-4 h-4" />, desc: 'High Performance' },
];

const USE_CASES = [
  { 
    category: 'Residential', 
    icon: <Home className="w-4 h-4" />,
    items: [
      { name: 'Full House', icon: <Building2 className="w-4 h-4" /> },
      { name: 'Floor Plan', icon: <Layout className="w-4 h-4" /> }
    ] 
  },
  { 
    category: 'Rooms', 
    icon: <Bed className="w-4 h-4" />,
    items: [
      { name: 'Living Room', icon: <Sofa className="w-4 h-4" /> },
      { name: 'Bedroom', icon: <Bed className="w-4 h-4" /> }
    ] 
  },
  { 
    category: 'Functional', 
    icon: <Utensils className="w-4 h-4" />,
    items: [
      { name: 'Kitchen', icon: <Utensils className="w-4 h-4" /> },
      { name: 'Bathroom', icon: <Bath className="w-4 h-4" /> }
    ] 
  },
  { 
    category: 'Professional', 
    icon: <Briefcase className="w-4 h-4" />,
    items: [
      { name: 'Architecture', icon: <Wind className="w-4 h-4" /> },
      { name: 'Office Space', icon: <Briefcase className="w-4 h-4" /> }
    ] 
  },
];

export function Navbar({ isSignedIn, user, onSignIn, onSignOut }: { isSignedIn: boolean, user: any, onSignIn: () => void, onSignOut: () => void }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95,
      transition: { duration: 0.15, ease: "easeIn" }
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-2xl shadow-[0_4px_30px_rgba(67,56,202,0.03)]">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-indigo-400 shadow-[0_8px_30px_rgba(67,56,202,0.2)]">
            <Layers className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-foreground">Hously</span>
        </Link>

        <div className="flex items-center gap-10">
          <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-wide text-foreground/60">
            <Link to="/preview" className="hover:text-primary transition-colors">Preview</Link>
            
            {/* Platforms Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveMenu('platforms')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-default py-8">
                Platforms <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === 'platforms' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeMenu === 'platforms' && (
                  <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 w-64 bg-white border border-[#EAE6DF] rounded-2xl shadow-2xl p-4 overflow-hidden"
                  >
                    <div className="space-y-4">
                      {PLATFORMS.map((platform) => (
                        <div key={platform.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#FAF9F6] transition-colors cursor-pointer group/item">
                          <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#EAE6DF] flex items-center justify-center text-[#8C847A] group-hover/item:text-primary group-hover/item:bg-white transition-colors">
                            {platform.icon}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#2C2C2A]">{platform.name}</p>
                            <p className="text-[10px] text-[#8C847A] uppercase tracking-widest">{platform.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Use Cases Mega Menu */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveMenu('usecases')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-default py-8">
                Use Cases <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === 'usecases' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeMenu === 'usecases' && (
                  <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed top-24 left-1/2 -translate-x-1/2 w-screen max-w-5xl bg-white border border-[#EAE6DF] rounded-3xl shadow-2xl p-10 mt-1"
                  >
                    <div className="grid grid-cols-4 gap-12">
                      {USE_CASES.map((category) => (
                        <div key={category.category} className="space-y-6">
                          <div className="flex items-center gap-2 text-primary">
                            {category.icon}
                            <h3 className="text-xs font-black uppercase tracking-[0.2em]">{category.category}</h3>
                          </div>
                          <div className="space-y-4">
                            {category.items.map((item) => (
                              <div key={item.name} className="flex items-center gap-3 p-2 -ml-2 rounded-xl hove:bg-[#FAF9F6] group/link cursor-pointer">
                                <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] flex items-center justify-center text-[#8C847A] group-hover/link:text-primary transition-colors">
                                  {item.icon}
                                </div>
                                <span className="text-sm font-bold text-[#2C2C2A]/70 group-hover/link:text-primary transition-colors">{item.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/community" className="hover:text-primary transition-colors">Community</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            {isSignedIn && <Link to="/gallery" className="hover:text-primary transition-colors">My Studio</Link>}
          </div>

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3 rounded-xl border border-primary/20 bg-background py-2.5 pl-2.5 pr-6 shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-foreground">{user?.username}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSignOut}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-foreground/50 hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/20"
                >
                  <LogOut className="h-5 w-5" />
                </motion.button>
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="tactile-button group flex items-center gap-3 !px-8 !py-3.5 !text-sm"
              >
                <span>Enter Studio</span>
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
