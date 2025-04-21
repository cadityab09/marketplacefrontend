import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import McDonals from '../assets/mc.png';

const FranchiseeDetail = () => {
    const location = useLocation();
    const { id } = useParams();

    const franchisees = [
        {
            id: 1,
            name: 'Franchisee One',
            logo: McDonals,
            qualification: 'Bachelor\'s Degree in Business',
            location: 'New York, NY',
            yearsInBusiness: 5,
            employees: 50,
            specialization: 'Retail',
            email: 'aditya@123',
            website: 'https://franchiseeone.com',
        },
    ]

  const franchisee = franchisees.find((f) => f.id === 1);

  if (!franchisee) {
    return <div className="text-center mt-10 text-red-500">Franchisee not found!</div>;
  }

  return (
    <div className="max-w-7xl mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-500 p-6 text-white">
        <h1 className="text-2xl font-bold">{franchisee.name}</h1>
      </div>
      <div className="p-6">
        <img
          src={franchisee.logo}
          alt={`${franchisee.name} logo`}
          className="w-32 h-32 rounded-full shadow-2xl mx-auto"
        />
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800">{franchisee.name}</h2>
          <p className="text-gray-600">Qualification: {franchisee.qualification}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Main Office Location</h3>
          <p className="text-gray-600">{franchisee.location}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Additional Details</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>Years in Business: {franchisee.yearsInBusiness}</li>
            <li>Number of Employees: {franchisee.employees}</li>
            <li>Specialization: {franchisee.specialization}</li>
            <li>Contact Email: {franchisee.email}</li>
          </ul>
        </div>
        <div className="mt-6 text-center">
          <a
            href={franchisee.website}
            className="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default FranchiseeDetail;