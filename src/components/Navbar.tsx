import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar({ isSignedIn, user, onSignIn, onSignOut }: { isSignedIn: boolean, user: any, onSignIn: () => void, onSignOut: () => void }) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-2xl shadow-[0_4px_30px_rgba(67,56,202,0.03)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-indigo-400 shadow-[0_4px_15px_rgba(67,56,202,0.3)]">
            <Layers className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">Hously</span>
        </Link>
        <div className="flex items-center gap-10">
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-foreground/60">
            <Link to="/preview" className="hover:text-primary transition-colors">Preview</Link>
            <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link to="/community" className="hover:text-primary transition-colors">Community</Link>
            {isSignedIn && <Link to="/gallery" className="hover:text-primary transition-colors">My Studio</Link>}
          </div>

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3 rounded-xl border border-primary/20 bg-background py-2 pl-2 pr-5 shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-foreground">{user?.username}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSignOut}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground/50 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </motion.button>
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="tactile-button-outline !px-6 !py-2.5 !text-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
