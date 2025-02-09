import React from 'react';
import { Play } from 'lucide-react';

const genres = [
  { name: 'Mystery', image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=800&h=400' },
  { name: 'Fantasy', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800&h=400' },
  { name: 'Horror', image: 'https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&q=80&w=800&h=400' },
  { name: 'Romantic', image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&q=80&w=800&h=400' },
  { name: 'Adventure', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800&h=400' },
];

const HeroWithGenres = () => {
  return (
    <div className="relative min-h-[600px]">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white z-10">
        <div className="text-center max-w-xl mx-auto px-4 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            welcome to the novel world!
          </h1>
          <p className="text-xl mb-4">
            Here, you can be both a reader and a writer. Craft immersive audio novels with AI
          </p>
          <p className="text-lg mb-12">
            Dive into our collection of audiobooks and find your next adventure
          </p>
        </div>

        {/* Genres Overlay */}
        <div className="w-full max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Top 10 uses of narrative-style voices
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {genres.map((genre) => (
              <div 
                key={genre.name} 
                className="relative group cursor-pointer flex-none w-[280px] snap-start"
              >
                <div className="relative h-[140px] rounded-lg overflow-hidden">
                  <img 
                    src={genre.image} 
                    alt={genre.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-200"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-8 h-8 text-white mx-auto mb-1" />
                      <span className="text-white font-medium text-sm">{genre.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWithGenres