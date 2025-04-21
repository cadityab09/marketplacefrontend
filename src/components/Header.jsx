import React, { useEffect, useRef, useState } from 'react';
import applogo from '../assets/AppLogo2.png';
import { useNavigate } from 'react-router-dom';

const Header = ({ identity }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(null);
  console.log("identity", identity);
  const navigate = useNavigate();

  const list0 = [
    { name: 'Home', path: '/franchisor', icon: '🏠' },
    { name: 'Add Franchisees', path: '/franchisor/add-franchisees', icon: '➕' },
    { name: 'View Franchisees', path: '/franchisor/view-franchisees', icon: '👀' },
    { name: 'Manage Franchisees', path: '/franchisor/manage-franchisees', icon: '🛠️' },
    { name: 'My Profile', path: '/franchisor/profile', icon: '👤' },
    { name: 'View Reports', path: '/franchisor/reports', icon: '📊' },
    { name: 'Support', path: '/franchisor/support', icon: '🛎️' },
    { name: 'Logout', path: '/logout', icon: '🚪' },
  ];

  const list1 = [
    { name: 'Home', path: '/franchisee', icon: '🏠' },
    { name: 'My Franchisees', path: 'franchisee/my-franchisees', icon: '👥' },
    { name: 'Take New Franchisees', path: '/franchisee/take-franchisees', icon: '🛒' },
    { name: 'My Profile', path: 'franchisee/profile', icon: '👤' },
    { name: 'Manage Subscriptions', path: 'franchisee/subscriptions', icon: '💳' },
    { name: 'View Reports', path: 'franchisee/reports', icon: '📊' },
    { name: 'Support', path: 'franchisee/support', icon: '🛎️' },
    { name: 'Logout', path: '/logout', icon: '🚪' },
  ];

  const navItems = identity === 0 ? list1 : list0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isNavOpen]);

  return (
    <header className="bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 text-white px-4 py-2 flex items-center shadow-md">
      <div className="flex items-center">
        <img src={applogo} alt="App Logo" className="w-10 h-10 object-cover object-center" />
        <div className="p-2 px-4">
          <h1 className="text-3xl font-bold text-blue-600">Marketplace</h1>
          <p className="text-lg text-blue-600">Connecting Franchisees and Franchisors</p>
        </div>
      </div>
      <div className="ml-auto mr-4">
        {identity === '-1' ? (
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-4 px-4 rounded-[100px] ml-2"
            onClick={() => (window.location.href = '/login')}
          >
            Login
          </button>
        ) : (
          <button
            className="bg-blue-300 hover:bg-blue-400 text-blue font-bold py-2 px-4 rounded-[100px] ml-2"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
              <span className="text-2xl">☰</span> {/* Hamburger Icon */}
          </button>
        )}
      </div>

      {/* Side Navigation */}
      <div
        ref={navRef}
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${isNavOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out`}
      >
        <button className={`absolute left-[-32px] text-2xl  ${isNavOpen ? 'visible' : 'hidden'} text-blue-500`} onClick={() => setIsNavOpen(!isNavOpen)}>✖</button>
        <div className="p-4 py-6 bg-[#73aaf0] text-white">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold">
              U
            </div>
            <div>
              <h2 className="text-lg font-bold">User Name</h2>
              <p className="text-sm">user@example.com</p>
            </div>
          </div>
        </div>
        <nav className="">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.name}
                className="flex items-center space-x-2 border-b border-gray-200 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 px-2"
              >
                <span className='text-2xl p-2'>{item.icon}</span>
                <a onClick={() => navigate(item.path)} href='' className="text-gray-700 hover:text-blue-500 text-lg font-semibold">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

        </nav>
        
      </div>
    </header>
  );
};

export default Header;