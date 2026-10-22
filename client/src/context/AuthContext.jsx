import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const name = localStorage.getItem('name');
        if (token && role) setUser({ token, role, name });
    }, []);

    const login = (userData) => {
        localStorage.setItem('token', userData.accessToken);
        localStorage.setItem('role', userData.role);
        localStorage.setItem('name', userData.name);
        setUser({ token: userData.accessToken, role: userData.role, name: userData.name });
    };

    const logout = async () => {
        await fetchAPI('/auth/logout', { method: 'POST' });
        localStorage.clear();
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};