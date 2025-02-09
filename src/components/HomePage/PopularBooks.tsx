import React, { useState, useRef } from 'react';
import { Play, Pause, ChevronRight } from 'lucide-react';
import { Book } from '../../data/books';

interface PopularBooksProps {
  books: Book[];
}

const PopularBooks: React.FC<PopularBooksProps> = ({ books }) => {
  const [playingBookId, setPlayingBookId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (book: Book) => {
    if (playingBookId === book.id) {
      audioRef.current?.pause();
      setPlayingBookId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = book.audioUrl;
        audioRef.current.play();
        setPlayingBookId(book.id);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Popular</h2>
        <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <span className="mr-1">See all</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] mb-3">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <button 
                onClick={() => handlePlay(book)}
                className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors"
              >
                {playingBookId === book.id ? (
                  <Pause className="w-12 h-12 text-white opacity-100 transition-opacity" />
                ) : (
                  <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </div>
            <h3 className="font-medium mb-1 line-clamp-2">{book.title}</h3>
            <p className="text-sm text-gray-600 mb-1">{book.author}</p>
            <p className="text-sm text-gray-500">{book.duration}</p>
          </div>
        ))}
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default PopularBooks;