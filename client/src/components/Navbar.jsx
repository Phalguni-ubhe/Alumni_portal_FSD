import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <h2><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>College Portal</Link></h2>
            <div className="nav-links">
                {user ? (
                    <>
                        <span>Welcome, {user.name}</span>
                        <button className="btn btn-danger" onClick={logout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="btn btn-primary">Login</Link>
                )}
            </div>
        </nav>
    );
}