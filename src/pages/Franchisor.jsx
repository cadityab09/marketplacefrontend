import React from 'react';

const Franchisor = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
        <h1 className="text-3xl font-bold">Franchisor Information</h1>
      </header>
      <main className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Our Franchise</h2>
        <p className="mb-4">
          As a franchisor, we offer a unique opportunity for entrepreneurs to join our successful brand. 
          Our franchise model is designed to provide support and resources to help you succeed.
        </p>
        <h3 className="text-xl font-semibold mb-2">Our Offerings:</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Comprehensive training programs</li>
          <li>Marketing and advertising support</li>
          <li>Access to our proprietary systems</li>
          <li>Ongoing operational support</li>
        </ul>
        <p>
          If you're interested in becoming a franchisee, please visit our registration page to get started!
        </p>
      </main>
      <footer className="bg-gray-800 text-white p-4">
        <p>&copy; {new Date().getFullYear()} Franchise Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Franchisor;