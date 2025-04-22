import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Franchisees from '../pages/Franchisees';
import Franchisor from '../pages/Franchisor';
import Register from '../pages/Register';
import FranchiseeDetail from '../components/FrachiseeDetail';
import { postAccessToken } from '../configs/services';
import { useDispatch } from 'react-redux';
import Login from '../pages/Login';
import { loginStatus, logoutStatus } from '../features/userSlice';
import FranchisorView from '../components/franchisor/FranchisorView';
import FranchiseeView from '../components/franchisee/FranchiseeView';
import FranchisorDashboard from "../pages/FranchisorDashboard";
import FranchiseeList from '../pages/FranchiseeList';
import Applications from "../pages/Applications";
import PerformanceReports from "../pages/PerformanceReports";
import MarketingMaterials from "../pages/MarketingMaterials";


function MainLayout() {
    const [identity, setIdentity] = useState("-1")
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        postAccessToken().then(res=>{
            const response = JSON.parse(res.data)
            console.log("JTW response=>", response)
            setIdentity(response.object.identity)
            dispatch(loginStatus(response.object))
        }).catch(err=>{
            console.log("Err:", err)
            dispatch(logoutStatus())
        })
    }, []);

    return (
            <div className="flex flex-col min-h-screen">
                <div className='fixed top-0 left-0 right-0 z-10'>
                    <Header identity={identity}/>
                </div>
                <div className='absolute top-[96px] left-0 right-0 '>
                    {/* <Navbar /> */}
                    <main className="flex-grow overflow-y-auto">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/franchisees" element={<Franchisees />} />
                            <Route path="/franchisees/:id" element={<FranchiseeDetail />} />
                            <Route path="/franchisors" element={<Franchisor />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/franchisor/*" element={<FranchisorView/>} /> 
                            <Route path="/franchisee/*" element={<FranchiseeView/>} /> 
                            <Route path="/dashboard" element={<FranchisorDashboard />} />
                            <Route path="/franchiseeslist" element={<FranchiseeList />} />
                            <Route path="/applications" element={<Applications />} />
                            <Route path="/reports" element={<PerformanceReports />} />
                            <Route path="/materials" element={<MarketingMaterials />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </div>
    )
}

export default MainLayout
