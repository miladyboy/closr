import React from 'react';
import StreamsList from '@/components/streams/StreamsList';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Live Streams</h1>
        <p className="text-gray-600">
          Check out these trending DJ streams live now
        </p>
      </header>
      
      <main>
        <StreamsList />
      </main>
    </div>
  );
}
