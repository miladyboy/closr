"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip redirection if still loading auth state
    if (isLoading) return;
    
    const authRoutes = ['/login', '/register'];
    
    // If user is not authenticated and trying to access protected route
    if (!user && !authRoutes.includes(pathname) && pathname !== '/') {
      router.push('/login');
    }
    
    // If user is authenticated and trying to access auth routes
    if (user && authRoutes.includes(pathname)) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router, pathname]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div 
          data-testid="loading-spinner"
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"
        ></div>
      </div>
    );
  }
  
  // Protected routes logic
  if (!user && pathname !== '/' && !pathname.includes('/login') && !pathname.includes('/register')) {
    return null; // Don't render children, redirection happening in useEffect
  }

  // Auth routes logic
  if (user && (pathname.includes('/login') || pathname.includes('/register'))) {
    return null; // Don't render children, redirection happening in useEffect
  }

  return <>{children}</>;
};

export default AuthGuard;
