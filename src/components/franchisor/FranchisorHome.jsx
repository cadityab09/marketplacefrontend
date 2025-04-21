import React from 'react';

const FranchisorHome = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome, Franchisor!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-blue-500">Total Franchisees</h2>
          <p className="text-3xl font-bold text-gray-800 mt-4">25</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-blue-500">Pending Requests</h2>
          <p className="text-3xl font-bold text-gray-800 mt-4">5</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-blue-500">Revenue</h2>
          <p className="text-3xl font-bold text-gray-800 mt-4">$12,000</p>
        </div>
      </div>
    </div>
  );
};

export default FranchisorHome;