import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs } from 'antd';
import Constant from '../../store/constant';
import { postBrands } from '../../configs/services';

export default function FranchisorBrands() {
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    mainOfficeLocation: '',
    yearsInBusiness: '',
    numberOfEmployees: '',
    specialization: '',
    contactEmail: '',
    websiteUrl: '',
    logo: null,
  });
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const response = await axios.get('/api/franchisor-brands');
    setBrands(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => payload.append(key, value));

    console.log(payload);
    if (selectedBrandId) {
      try {
        const response = await postBrands(selectedBrandId, payload);
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    } else {
      try {
        const response = await postBrands(payload);
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
      
    }

    setFormData({
      name: '',
      mainOfficeLocation: '',
      yearsInBusiness: '',
      numberOfEmployees: '',
      specialization: '',
      contactEmail: '',
      websiteUrl: '',
      logo: null,
    });
    setSelectedBrandId(null);
    fetchBrands();
  };

  const handleEdit = (brand) => {
    setSelectedBrandId(brand.id);
    setFormData({
      name: brand.name,
      mainOfficeLocation: brand.mainOfficeLocation,
      yearsInBusiness: brand.yearsInBusiness,
      numberOfEmployees: brand.numberOfEmployees,
      specialization: brand.specialization,
      contactEmail: brand.contactEmail,
      websiteUrl: brand.websiteUrl,
      logo: null,
    });
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Franchisor Brands</h2>
      <Tabs defaultActiveKey="1">
        {/* Tab 1: View Brands */}
        <Tabs.TabPane tab="View Brands" key="1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(brands) && brands.length > 0 ? (
              brands.map((brand) => (
                <div key={brand.id} className="border p-4 rounded-lg shadow">
                  {brand.logoUrl && (
                    <img
                      src={`data:image/jpeg;base64,${brand.logoUrl}`}
                      alt="Brand Logo"
                      className="w-full h-40 object-contain mb-2"
                    />
                  )}
                  <h3 className="text-xl font-semibold">{brand.name}</h3>
                  <p className="text-sm">Office: {brand.mainOfficeLocation}</p>
                  <p className="text-sm">Years: {brand.yearsInBusiness}</p>
                  <p className="text-sm">Employees: {brand.numberOfEmployees}</p>
                  <p className="text-sm">Specialization: {brand.specialization}</p>
                  <p className="text-sm">Email: {brand.contactEmail}</p>
                  <p className="text-sm">Website: {brand.websiteUrl}</p>
                  <button onClick={() => handleEdit(brand)} className="mt-2 text-blue-600 hover:underline">
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No brands available.</p>
            )}
          </div>
        </Tabs.TabPane>

        {/* Tab 2: Add/Edit Brand */}
        <Tabs.TabPane tab="Add Brand" key="2">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" onSubmit={handleSubmit}>
            {['name', 'mainOfficeLocation', 'yearsInBusiness', 'numberOfEmployees', 'specialization', 'contactEmail', 'websiteUrl'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                className="border border-gray-300 rounded px-3 py-2"
                required
              />
            ))}
            <input type="file" name="logo" onChange={handleInputChange} className="col-span-full" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {selectedBrandId ? 'Update' : 'Add'} Brand
            </button>
          </form>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}