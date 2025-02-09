import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>
      
      <div className="relative text-center text-white z-10 max-w-3xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          welcome to the novel world!
        </h1>
        <p className="text-xl mb-4">
          Here, you can be both a reader and a writer. Craft immersive audio novels with AI
        </p>
        <p className="text-lg">
          Dive into our collection of audiobooks and find your next adventure
        </p>
      </div>
    </div>
  );
};

export default Hero;