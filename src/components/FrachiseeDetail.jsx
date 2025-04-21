import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import McDonals from '../assets/mc.png'; // Add other logos too

const allFranchisees = [
  {
    id: 1,
    name: 'McDonalds',
    logo: McDonals,
    qualification: "Bachelor's Degree in Business",
    location: 'New York, NY',
    yearsInBusiness: 5,
    employees: 50,
    specialization: 'Fast Food',
    email: 'contact@mcdonalds.com',
    website: 'https://mcdonalds.com',
  },
  {
    id: 2,
    name: 'KFC',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png',
    qualification: "Master's in Management",
    location: 'Louisville, KY',
    yearsInBusiness: 10,
    employees: 120,
    specialization: 'Chicken Fast Food',
    email: 'support@kfc.com',
    website: 'https://kfc.com',
  },
  {
    id: 3,
    name: 'Subway',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Subway_2016_logo.svg/1280px-Subway_2016_logo.svg.png',
    qualification: "Diploma in Franchise Operations",
    location: 'Milford, CT',
    yearsInBusiness: 8,
    employees: 80,
    specialization: 'Healthy Fast Food',
    email: 'help@subway.com',
    website: 'https://subway.com',
  },
  // Add more if needed
];

const FranchiseeDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const franchiseeFromState = location.state?.franchisee;
  const franchisee =
    franchiseeFromState || allFranchisees.find((f) => f.id === parseInt(id));

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
          {/* <p className="text-gray-600">Qualification: {franchisee.qualification}</p> */}
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
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default FranchiseeDetail;
