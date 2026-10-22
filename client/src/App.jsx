import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AlumniDashboard from './pages/AlumniDashboard'; // Build similar to StudentDashboard
import AdminDashboard from './pages/AdminDashboard';   // Build similar to StudentDashboard

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRole }) => {
    const { user } = useContext(AuthContext);
    if (!user) return <Navigate to="/login" />;
    if (allowedRole && user.role !== allowedRole) return <Navigate to="/login" />;
    return children;
};

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/student" element={
                    <ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>
                } />
                <Route path="/alumni" element={
                    <ProtectedRoute allowedRole="alumni"><AlumniDashboard /></ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>
                } />
            </Routes>
        </>
    );
}