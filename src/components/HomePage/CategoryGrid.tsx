import React from 'react';
import { Book } from 'lucide-react';

const categories = [
  { 
    name: 'All', 
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Romance',
    image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Fanfic',
    image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Horror',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Fantasy',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Investigation',
    image: 'https://images.unsplash.com/photo-1461773518188-b3e86f98242f?auto=format&fit=crop&q=80&w=300'
  },
];

const CategoryGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            className="relative h-24 rounded-lg overflow-hidden group"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundImage: `url("${category.image}")`,
              }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
              <Book className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">{category.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;