import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FranchisorHome from './FranchisorHome'
import AddFranchisees from './AddFranchisees'
import ViewFranchisees from './ViewFranchisees'
import ManageFranchisees from './ManageFranchisees'
import MyProfile from './MyProfile'
import ViewReports from './ViewReports'
import Support from './Support'

function FranchisorView() {
    return (
        <div className="franchisor-view">

            <div className="franchisor-view-routes">
                <Routes>
                    <Route path="/" element={<FranchisorHome />} />
                    <Route path="/add-franchisees" element={<AddFranchisees />} />
                    <Route path="/view-franchisees" element={<ViewFranchisees />} />
                    <Route path="/manage-franchisees" element={<ManageFranchisees />} />
                    <Route path="/profile" element={<MyProfile />} />
                    <Route path="/reports" element={<ViewReports />} />
                    <Route path="/support" element={<Support />} />
                </Routes>
            </div>
        </div>
    )
}

export default FranchisorView