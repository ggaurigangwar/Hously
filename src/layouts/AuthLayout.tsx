import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Storage, type User } from '../lib/storage';

interface AuthContextType {
  isSignedIn: boolean;
  user: User | null;
  signInLocally: (user: User) => void;
}

export function AuthLayout() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Frictionless local auth bypass
    const currentUser = Storage.getUser();
    if (currentUser) {
      setIsSignedIn(true);
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  const signInLocally = (userData: User) => {
    Storage.setUser(userData);
    setIsSignedIn(true);
    setUser(userData);
  };

  const handleSignOut = () => {
    Storage.setUser(null);
    setIsSignedIn(false);
    setUser(null);
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-[spin_1.5s_linear_infinite] rounded-full border border-primary/30 border-t-primary"></div>
          <p className="text-xs text-foreground/60 font-mono tracking-widest uppercase font-bold">Initializing Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar 
        isSignedIn={isSignedIn} 
        user={user} 
        onSignIn={() => navigate('/login')} 
        onSignOut={handleSignOut} 
      />
      <main className="flex-1 flex flex-col relative w-full items-center">
        <Outlet context={{ isSignedIn, user, signInLocally } satisfies AuthContextType} />
      </main>
    </div>
  );
}
