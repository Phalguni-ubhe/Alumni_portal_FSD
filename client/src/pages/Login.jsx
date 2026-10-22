import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchAPI } from '../utils/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { ok, data } = await fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });

        if (ok) {
            login(data);
            const routes = { admin: '/admin', alumni: '/alumni', student: '/student' };
            navigate(routes[data.role] || '/');
        } else {
            setError(data.message || 'Login failed');
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <h2 style={{ textAlign: 'center' }}>Welcome Back</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Authenticating...' : 'Login'}
                </button>
                {error && <p className="error-msg" style={{ textAlign: 'center' }}>{error}</p>}
            </form>
        </div>
    );
}