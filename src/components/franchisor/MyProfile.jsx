import React from 'react';
import { useSelector } from 'react-redux';

const MyProfile = () => {
  // Access user info from Redux state
  const userInfo = useSelector((state) => state.user.info);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">My Profile</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-gray-800">{userInfo.username}</h2>
        <p className="text-gray-600">Email: {userInfo.email || 'Not provided'}</p>
        <p className="text-gray-600">Location: {userInfo.location || 'Not provided'}</p>
      </div>
    </div>
  );
};

export default MyProfile;