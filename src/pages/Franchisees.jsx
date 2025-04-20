import React from 'react';
import FranchiseeCard from '../components/FranchiseeCard';

const Franchisees = () => {
  const franchisees = [
    {
      id: 1,
      name: 'Franchisee One',
      logo: 'path/to/logo1.png',
      description: 'Description for Franchisee One.',
    },
    {
      id: 2,
      name: 'Franchisee Two',
      logo: 'path/to/logo2.png',
      description: 'Description for Franchisee Two.',
    },
    // Add more franchisees as needed
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Franchisees</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {franchisees.map((franchisee) => (
          <FranchiseeCard
            key={franchisee.id}
            name={franchisee.name}
            logo={franchisee.logo}
            description={franchisee.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Franchisees;