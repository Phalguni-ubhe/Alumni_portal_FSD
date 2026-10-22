const API_BASE = 'http://localhost:5000/api';

export const fetchAPI = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
    };

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
        const data = await response.json();
        
        if (response.status === 401 && data.message === 'Token expired') {
            localStorage.clear();
            window.location.href = '/login';
        }
        return { ok: response.ok, status: response.status, data };
    } catch (error) {
        console.error('API Error:', error);
        return { ok: false, status: 500, data: { message: 'Network error occurred' } };
    }
};