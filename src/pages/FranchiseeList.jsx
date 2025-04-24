import React, { useEffect, useState } from 'react';

const FranchiseeList = () => {
  const [franchisees, setFranchisees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFranchisees = async () => {
      try {
        const response = await fetch('http://localhost:8084/api/franchisor/get-franchisees');
        if (!response.ok) throw new Error('Failed to fetch franchisee data');
        const data = await response.json();
        setFranchisees(data);
      } catch (error) {
        console.error('Error fetching franchisees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFranchisees();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading franchisees...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Franchisee List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Owner</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Start Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Last Month Income</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Amount Paid</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Payment Method</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {franchisees.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-100 transition">
                  <td className="px-6 py-4">{item.owner}</td>
                  <td className="px-6 py-4">{item.location}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.startDate?.split('T')[0]}</td>
                  <td className="px-6 py-4">{item.lastMonthIncome || 'N/A'}</td>
                  <td className="px-6 py-4">₹ {item.amountPaid}</td>
                  <td className="px-6 py-4 capitalize">{item.paymentMethod}</td>
                </tr>
              ))}
              {franchisees.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">No franchisees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FranchiseeList;
