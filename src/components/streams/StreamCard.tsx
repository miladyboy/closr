"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface StreamCardProps {
  id: string;
  djName: string;
  title: string;
  genre: string;
  viewers: number;
  thumbnailUrl: string;
  isLive: boolean;
}

const StreamCard = ({ id, djName, title, genre, viewers, thumbnailUrl, isLive }: StreamCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative">
        <div className="aspect-video relative bg-gray-200">
          <Image
            src={thumbnailUrl}
            alt={`${djName}'s stream`}
            fill
            className="object-cover"
          />
        </div>
        
        {isLive && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
            LIVE
          </div>
        )}
        
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          {viewers} viewers
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{title}</h3>
        <p className="text-sm text-gray-700 mb-2">DJ {djName}</p>
        <div className="flex items-center justify-between">
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {genre}
          </span>
          <Link
            href={`/stream/${id}`}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Join Stream
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StreamCard;
