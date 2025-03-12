"use client";

import React from 'react';
import StreamCard from './StreamCard';

// Placeholder data for streams
const placeholderStreams = [
  {
    id: '1',
    djName: 'DJ Spinz',
    title: 'Friday Night Vibes',
    genre: 'House',
    viewers: 128,
    thumbnailUrl: 'https://images.unsplash.com/photo-1571266028893-d99d697716d0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isLive: true,
  },
  {
    id: '2',
    djName: 'Melody Master',
    title: 'Chill Lofi Mix',
    genre: 'Lo-fi',
    viewers: 85,
    thumbnailUrl: 'https://images.unsplash.com/photo-1525368605728-7a21bdc87a15?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isLive: true,
  },
  {
    id: '3',
    djName: 'BeatCrafter',
    title: 'Electronic Dance Party',
    genre: 'EDM',
    viewers: 203,
    thumbnailUrl: 'https://images.unsplash.com/photo-1516873240891-996ffc47f9fd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isLive: true,
  },
  {
    id: '4',
    djName: 'Vinyl Queen',
    title: 'Retro Classics',
    genre: 'Disco',
    viewers: 76,
    thumbnailUrl: 'https://images.unsplash.com/photo-1594623274890-7b64e9fff7b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isLive: false,
  },
  {
    id: '5',
    djName: 'TechTonic',
    title: 'Deep Techno Session',
    genre: 'Techno',
    viewers: 154,
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isLive: true,
  },
  {
    id: '6',
    djName: 'Rhythm Raider',
    title: 'Hip Hop Showcase',
    genre: 'Hip Hop',
    viewers: 192,
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isLive: true,
  },
];

const StreamsList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {placeholderStreams.map((stream) => (
        <StreamCard
          key={stream.id}
          id={stream.id}
          djName={stream.djName}
          title={stream.title}
          genre={stream.genre}
          viewers={stream.viewers}
          thumbnailUrl={stream.thumbnailUrl}
          isLive={stream.isLive}
        />
      ))}
    </div>
  );
};

export default StreamsList;
