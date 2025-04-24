import React from 'react';
import { Link } from 'react-router-dom';

const FranchiseeCard = ({ franchisee }) => {
  return (
    <div className="max-w-[100%] p-4 rounded-[10px] overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-white bg-gradient-to-r from-blue-100 via-blue-150 to-blue-100 border border-blue-200">
      <div className="w-full bg-white">
      <img className="w-full h-[200px] object-contain object-center" src={franchisee.logo} alt={`${franchisee.name} logo`} />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{franchisee.name}</div>
        <p className="text-gray-700 text-base">
          {franchisee.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
      <Link
          to={`/franchisees/${franchisee.id}`}
          state={{ franchisee }}
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          More Details
        </Link>
      </div>
    </div>
  );
};

export default FranchiseeCard;