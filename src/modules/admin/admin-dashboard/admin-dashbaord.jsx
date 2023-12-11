import React from 'react';
import "./admin-dashboard.css"
import UserListComponent from '../user-list/user-list';
const AdminDashboard = () => {
    return (
        <div className="main-div">
            <div className="sidebar">
                <h3>Admin Dashboard</h3>
                <div className="sidebar-navbar">
                    <h4>User List</h4>
                </div>
            </div>
            <div className="side-body">
                <UserListComponent />
            </div>
        </div>
    )
}

export default AdminDashboard