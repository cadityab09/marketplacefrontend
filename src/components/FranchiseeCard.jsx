import React from 'react';
import { useNavigate } from 'react-router-dom';

const FranchiseeCard = ({ franchisee }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/franchisees/${franchisee.id}`, {
      state: { franchisee },
    });
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div onClick={handleClick}>
        <img
          src={franchisee.logo}
          alt={franchisee.name}
          className="w-24 h-24 mx-auto mb-4 object-contain"
        />
        <h3 className="text-xl font-semibold text-center mb-2">{franchisee.name}</h3>
        <p className="text-gray-600 text-sm text-center">{franchisee.description}</p>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default FranchiseeCard;
