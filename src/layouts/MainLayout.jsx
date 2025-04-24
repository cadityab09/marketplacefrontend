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
import { useDispatch, useSelector } from 'react-redux';
import Login from '../pages/Login';
import { loginStatus, logoutStatus } from '../features/userSlice';
import FranchisorView from '../components/franchisor/FranchisorView';
import FranchiseeView from '../components/franchisee/FranchiseeView';
import FranchisorDashboard from "../pages/FranchisorDashboard";
import FranchiseeList from '../pages/FranchiseeList';
import Applications from "../pages/Applications";
import PerformanceReports from "../pages/PerformanceReports";
import MarketingMaterials from "../pages/MarketingMaterials";
import FranchiseeDashboard from "../pages/FranchiseeDashboard";


function MainLayout() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const identity = useSelector((state) => state.user.info.identity);

    useEffect(() => {
        postAccessToken().then(res=>{
            const response = res;
            console.log("JTW response=>", response)
            dispatch(loginStatus(response))
            // if(response.identity === "0"){
            //     navigate("/*")
            // }else if(response.identity === "1"){
            //     navigate("/*")
            // }
        }).catch(err=>{
            console.log("Err:", err)
            dispatch(logoutStatus())
        })
    }, [dispatch]);

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
                            <Route path="/Franchisordashboard" element={<FranchisorDashboard />} />
                            <Route path="/franchiseeslist" element={<FranchiseeList />} />
                            <Route path="/applications" element={<Applications />} />
                            <Route path="/reports" element={<PerformanceReports />} />
                            <Route path="/materials" element={<MarketingMaterials />} />
                            <Route path="/FranchiseeDashboard" element={<FranchiseeDashboard />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </div>
    )
}

export default MainLayout
