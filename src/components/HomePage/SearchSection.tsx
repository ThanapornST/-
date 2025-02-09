import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { books } from '../../data/books';

interface SearchProps {
  onSearch: (query: string) => void;
}

const SearchSection: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="search for books..."
          className="w-full py-3 pl-12 pr-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      
      <div className="flex mt-6 border rounded-lg overflow-hidden">
        <button className="flex-1 py-3 bg-white hover:bg-gray-50 border-r">
          Narrative Novels
        </button>
        <button className="flex-1 py-3 bg-white hover:bg-gray-50">
          Chat Style Novels
        </button>
      </div>
    </div>
  );
};

export default SearchSection;