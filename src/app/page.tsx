import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Closr</h1>
      <p className="text-xl mb-8">Connect with DJs from anywhere in the world.</p>
      
      <div className="flex gap-4">
        <Link 
          href="/login" 
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Login
        </Link>
        <Link 
          href="/register" 
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
