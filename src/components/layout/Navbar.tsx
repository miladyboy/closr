"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  
  // Placeholder authentication state - will connect to Supabase later
  const isLoggedIn = pathname === '/dashboard';
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-indigo-600">
              Closr
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/dashboard' 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </Link>
                <button 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
                  onClick={() => {
                    // Will implement logout with Supabase later
                    console.log('Logging out');
                    window.location.href = '/';
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/login' 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/register' 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
