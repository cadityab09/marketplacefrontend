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
import FranchiseeDetail from './components/FrachiseeDetail';
import MainLayout from './layouts/MainLayout';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <MainLayout />
        </Provider>
      </Router>
    </>
  );
}

export default App;