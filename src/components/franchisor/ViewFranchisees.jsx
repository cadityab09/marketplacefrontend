import React from 'react';

const ViewFranchisees = () => {
  const franchisees = [
    { id: 1, name: 'Franchisee One', location: 'New York', email: 'one@example.com' },
    { id: 2, name: 'Franchisee Two', location: 'Los Angeles', email: 'two@example.com' },
    { id: 3, name: 'Franchisee Three', location: 'Chicago', email: 'three@example.com' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">View Franchisees</h1>
      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Details</th>

          </tr>
        </thead>
        <tbody>
          {franchisees.map((franchisee) => (
            <tr key={franchisee.id} className="hover:bg-blue-100">
              <td className="py-2 px-4">{franchisee.id}</td>
              <td className="py-2 px-4">{franchisee.name}</td>
              <td className="py-2 px-4">{franchisee.location}</td>
              <td className="py-2 px-4">{franchisee.email}</td>
              <td className="py-2 px-4">
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                  More Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFranchisees;