import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import McDonals from '../assets/mc.png'; // Replace with actual path

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
];

const FranchiseeDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const franchiseeFromState = location.state?.franchisee;
  const franchisee = franchiseeFromState || allFranchisees.find(f => f.id === parseInt(id));

  if (!franchisee) {
    return <div className="text-center mt-10 text-red-500">Franchisee not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white shadow-md rounded-xl overflow-hidden p-6">
      <div className="text-center">
        <img
          src={franchisee.logo}
          alt={`${franchisee.name} logo`}
          className="w-32 h-32 mx-auto rounded-full shadow-lg"
        />
        <h1 className="text-3xl font-bold mt-4">{franchisee.name}</h1>
        <p className="text-gray-500 mt-2 italic">{franchisee.qualification}</p>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <h3 className="text-lg font-semibold">📍 Location</h3>
          <p>{franchisee.location}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">📊 Business Info</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Years in Business: {franchisee.yearsInBusiness}</li>
            <li>Number of Employees: {franchisee.employees}</li>
            <li>Specialization: {franchisee.specialization}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">📧 Contact</h3>
          <p>Email: <a href={`mailto:${franchisee.email}`} className="text-blue-500 underline">{franchisee.email}</a></p>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <a
          href={franchisee.website}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
        >
          Visit Website
        </a>
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default FranchiseeDetail;
