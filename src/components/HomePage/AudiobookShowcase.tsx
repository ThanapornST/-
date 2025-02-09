import React from 'react';
import { User, ChevronRight } from 'lucide-react';

const showcaseBooks = [
  {
    id: 1,
    title: 'The Jungle Book',
    author: 'Rudyard Kipling',
    cover: 'https://images.unsplash.com/photo-1637681068516-2b22116e68cf?auto=format&fit=crop&q=80&w=400',
    description: 'On a quest to learning to be a human child, a young boy raised by wolves faces the dangerous tiger Shere Khan.',
  },
  {
    id: 2,
    title: 'The Wolf Wilder',
    author: 'K Rundell',
    cover: 'https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?auto=format&fit=crop&q=80&w=400',
    description: "Turn your wild things wilder. That's the motto that has guided Feo and her mother's work.",
  },
  {
    id: 3,
    title: 'The Girl of Ink & Stars',
    author: 'Kiran M Hargrave',
    cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=400',
    description: "When her closest friend disappears into the island\u2019s Forgotten Territories, Isabella volunteers to guide the search.",
  },
  {
    id: 4,
    title: 'Cogheart',
    author: 'Peter Bunzl',
    cover: 'https://images.unsplash.com/photo-1533651180995-3b8dcd33e834?auto=format&fit=crop&q=80&w=400',
    description: "When her father disappears in a crash, Lily is packed off to a friend's house, but mechanical secrets are afoot.",
  },
  {
    id: 5,
    title: 'Macbeth',
    author: 'William Shakespeare',
    cover: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?auto=format&fit=crop&q=80&w=400',
    description: 'Dark ambitions and supernatural prophecies drive this tale of betrayal, murder, and madness.',
  }
];

const AudiobookShowcase = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Audiobooks showcase</h2>
        <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <span className="mr-1">See all</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {showcaseBooks.map((book) => (
          <div key={book.id} className="group">
            <div className="relative aspect-[2/3] mb-3">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 rounded-lg" />
            </div>
            <h3 className="font-medium text-sm mb-1 line-clamp-1">{book.title}</h3>
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{book.description}</p>
            <div className="flex items-center text-gray-500">
              <User className="w-3 h-3 mr-1" />
              <span className="text-xs">{book.author}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudiobookShowcase;