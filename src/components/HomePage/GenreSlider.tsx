import React from 'react';
import { Play } from 'lucide-react';

const genres = [
  { name: 'Mystery', image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80' },
  { name: 'Fantasy', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80' },
  { name: 'Horror', image: 'https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&q=80' },
  { name: 'Romantic', image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&q=80' },
  { name: 'Adventure', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80' },
];

const GenreSlider = () => {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8">Top 10 uses of narrative-style voices</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {genres.map((genre) => (
          <div key={genre.name} className="relative group cursor-pointer">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <img 
                src={genre.image} 
                alt={genre.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-200"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-10 h-10 text-white mx-auto mb-2" />
                  <span className="text-white font-medium">{genre.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreSlider;