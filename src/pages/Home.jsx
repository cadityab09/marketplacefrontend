import React from 'react';
import FranchiseeCard from '../components/FranchiseeCard';
import McDonals from '../assets/mc.png';
import Subway from '../assets/subway.png';
import KFC from '../assets/kfc.png';
import Dominos from '../assets/dominos.png';
import pizza from '../assets/pizza hut.png';
import Starbucks from '../assets/startbucks.jpeg';
import burgurKing from '../assets/burgur king.png';


const Home = () => {
  const featuredFranchisees = [
    { id: 1, name: 'McDonals', logo: McDonals, description: 'Description of McDonals' },
    { id: 2, name: 'Subway', logo: Subway, description: 'Description of Subway' },
    { id: 3, name: 'KFC', logo: KFC, description: 'Description of KFC' },
    { id: 4, name: 'Dominos', logo: Dominos, description: 'Description of Dominos' },
    { id: 5, name: 'Pizza Hut', logo: pizza, description: 'Description of Pizza Hut' },
    { id: 6, name: 'Starbucks', logo: Starbucks, description: 'Description of Starbucks' },
    { id: 7, name: 'Burger King', logo: burgurKing, description: 'Description of Burger King' },
  ];
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-300 p-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">Welcome to the Marketplace</h1>
      <p className="text-lg text-white text-center mb-12">Discover amazing franchise opportunities!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {featuredFranchisees.map(franchisee => (
          <FranchiseeCard key={franchisee.id} franchisee={franchisee} />
        ))}
        {featuredFranchisees.map(franchisee => (
          <FranchiseeCard key={franchisee.id} franchisee={franchisee} />
        ))}
        {featuredFranchisees.map(franchisee => (
          <FranchiseeCard key={franchisee.id} franchisee={franchisee} />
        ))}
      </div>
      
    </div>
  );
};

export default Home;