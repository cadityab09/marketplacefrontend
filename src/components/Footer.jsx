import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-500 to-blue-700 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">© {new Date().getFullYear()} Marketplace. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-gray-300">Facebook</a>
          <a href="#" className="hover:text-gray-300">Twitter</a>
          <a href="#" className="hover:text-gray-300">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;