import React, { useState } from 'react';

const Application = () => {
  const [formData, setFormData] = useState({
    owner: '',
    location: '',
    email: '',
    lastMonthIncome: '',
    amountPaid: '',
    paymentMethod: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Format startDate to ISO string (optional: if needed)
    const dataToSend = {
      ...formData,
      startDate: formData.startDate, // Make sure it's in yyyy-mm-dd format
    };
    console.log('Data to send:', dataToSend);
  
    try {
      const response = await fetch('http://localhost:8084/api/franchisor/create-franchisee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        throw new Error('Something went wrong while creating franchisee');
      }
  
      const result = await response.json();
      console.log('Franchisee created:', result);
      alert('Franchisee successfully created!');
  
      // Reset form
      setFormData({
        owner: '',
        location: '',
        email: '',
        lastMonthIncome: '',
        amountPaid: '',
        paymentMethod: '',
        startDate: '',
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating franchisee. Check console for details.');
    }
  };
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Franchisee</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Owner Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Owner</label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                placeholder="Rahul Deshmukh"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Pune"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="a@example.com"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            
          </div>

          {/* Divider */}
          <hr className="my-6 border-gray-200" />

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount Paid */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount Paid (₹)</label>
              <input
                type="number"
                name="amountPaid"
                value={formData.amountPaid}
                onChange={handleChange}
                placeholder="Enter payment amount"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">Select a method</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="cash">Cash</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition-all duration-300"
            >
              Submit Franchisee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Application;