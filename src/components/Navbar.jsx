import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
        </li>
        <li>
          <Link to="/franchisees" className="text-white hover:text-gray-200">Franchisees</Link>
        </li>
        <li>
          <Link to="/franchisor" className="text-white hover:text-gray-200">Franchisor</Link>
        </li>
        <li>
          <Link to="/register" className="text-white hover:text-gray-200">Register</Link>
        </li>
        <li>
          <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;