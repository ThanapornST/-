import React from 'react';
import Navbar from './HomePage/Navbar';
import Hero from './HomePage/Hero';
import SearchSection from './HomePage/SearchSection';
import CategoryGrid from './HomePage/CategoryGrid';
import AudiobookShowcase from './HomePage/AudiobookShowcase';
import GenreSlider from './HomePage/GenreSlider';
import PopularBooks from './HomePage/PopularBooks';
import Footer from './HomePage/Footer';
import { books } from '../data/books';

const HomePage = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search functionality here
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <SearchSection onSearch={handleSearch} />
      <CategoryGrid />
      <AudiobookShowcase />
      <GenreSlider />
      <PopularBooks books={books} />
      <Footer />
    </div>
  );
};

export default HomePage;