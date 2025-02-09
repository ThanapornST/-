import React from 'react';
import { PenLine } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <PenLine className="h-6 w-6" />
              <span className="ml-2 text-xl font-semibold">WriteWhisper</span>
            </div>
            <p className="text-gray-400">
              Write a novel, check statistics, and respond to reader comments instantly.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">How to use</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">How to write a novel</a></li>
              <li><a href="#" className="hover:text-white">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white">Frequently Asked Questions</a></li>
              <li><a href="#" className="hover:text-white">How to top up Coins</a></li>
              <li><a href="#" className="hover:text-white">How to make payments</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Line Official</a></li>
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">X</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">More</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">News</a></li>
              <li><a href="#" className="hover:text-white">Writer's Board</a></li>
              <li><a href="#" className="hover:text-white">Read Novels</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;