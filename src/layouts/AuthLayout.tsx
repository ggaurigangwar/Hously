import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

interface PuterContextType {
  isSignedIn: boolean;
  user: any | null;
}

export function AuthLayout() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for puter script to be available. (It should be global via npm import or script tag)
    // Actually we installed @heyputer/puter.js via npm but we can access `puter` globally if imported, or import puter from '@heyputer/puter.js'.
    const initAuth = async () => {
      try {
        const puter = (window as any).puter || await import('@heyputer/puter.js').then(m => m.default || m);
        if (puter) {
          const signedIn = puter.isSignedIn();
          setIsSignedIn(signedIn);
          if (signedIn) {
            const userData = await puter.getUser();
            setUser(userData);
          }
        }
      } catch (err) {
        console.error("Failed to initialize Puter auth:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleSignIn = async () => {
    try {
      const puter = (window as any).puter || await import('@heyputer/puter.js').then(m => m.default || m);
      const signedIn = await puter.signIn();
      if (signedIn) {
        setIsSignedIn(true);
        const userData = await puter.getUser();
        setUser(userData);
      }
    } catch (err) {
      console.error("Sign in failed", err);
    }
  };

  const handleSignOut = async () => {
    try {
      const puter = (window as any).puter || await import('@heyputer/puter.js').then(m => m.default || m);
      puter.signOut();
      setIsSignedIn(false);
      setUser(null);
    } catch (err) {
      console.error("Sign out failed", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f2f7f4]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-[spin_1.5s_linear_infinite] rounded-full border border-[#10b981]/30 border-t-[#10b981]"></div>
          <p className="text-xs text-[#064e3b]/60 font-mono tracking-widest uppercase font-bold">Initializing Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f2f7f4] text-[#064e3b]">
      <Navbar isSignedIn={isSignedIn} user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />
      <main className="flex-1 flex flex-col relative w-full items-center">
        {/* We provide the auth context to all child routes */}
        <Outlet context={{ isSignedIn, user } satisfies PuterContextType} />
      </main>
    </div>
  );
}
