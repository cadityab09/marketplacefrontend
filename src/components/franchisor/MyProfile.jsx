import React from 'react';

const MyProfile = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">My Profile</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-gray-800">John Doe</h2>
        <p className="text-gray-600">Email: john.doe@example.com</p>
        <p className="text-gray-600">Location: New York</p>
      </div>
    </div>
  );
};

export default MyProfile;