import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Books from './Books/Books';

// Sample components for public and private routes
const Home = () => <div>Home - Public Route</div>;
const PublicPage = () => <div>Public Page - Public Route</div>;
const PrivatePage = () => <div>Private Page - Private Route</div>;

const isAuthenticated = () => {
    return localStorage.getItem('clbkUserId') != null;
};

const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? (
        element
    ) : (
        <Navigate to="/login" />
    );
};

const Layout = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/home"
                    element={<PrivateRoute element={<Books />} />}
                />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default Layout;
