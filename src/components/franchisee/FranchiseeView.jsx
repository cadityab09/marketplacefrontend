import React from 'react'
import { Route, Routes } from 'react-router-dom'

function FranchiseeView() {
    return (
        <div>
            <div className="franchisee-view">
                <h1>Hello</h1>
                <div className="franchisee-view-routes">
                    <Routes>
                        <Route path="/" element={<div>Franchisee Home</div>} />
                        <Route path="/my-franchisees" element={<div>Franchisee List</div>} />
                        <Route path="/franchisee/:id" element={<div>Franchisee Detail</div>} />
                        <Route path="/take-franchisees" element={<div>Take Franchisee</div>} />
                        <Route path="/update-franchisee/:id" element={<div>Update Franchisee</div>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default FranchiseeView
