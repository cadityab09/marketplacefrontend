import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Franchisees from './pages/Franchisees';
import Franchisor from './pages/Franchisor';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className='fixed top-0 left-0 right-0 z-10'>
        <Header />
        </div>
        <div className='absolute top-[96px] left-0 right-0 '>
        {/* <Navbar /> */}
        <main className="flex-grow overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/franchisees" element={<Franchisees />} />
            <Route path="/franchisor" element={<Franchisor />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;