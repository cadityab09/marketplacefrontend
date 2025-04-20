import React from 'react';
import applogo from '../assets/AppLogo2.png'; 

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 text-white px-4 py-2 flex items-center shadow-md">
      <div className="flex items-center">
      <img src={applogo} alt="App Logo" className="w-10 h-10 object-cover object-center" />
      <div className="p-2 px-4">
      <h1 className="text-3xl font-bold text-blue-600">Marketplace</h1>
      <p className="text-lg text-blue-600">Connecting Franchisees and Franchisors</p>
      </div>
      </div>
      <div className="ml-auto mr-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-4 rounded-[100px] ml-2">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;