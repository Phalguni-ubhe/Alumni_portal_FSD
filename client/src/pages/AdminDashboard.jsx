import { useState, useEffect } from 'react';
import { fetchAPI } from '../utils/api';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');

    const loadStats = async () => {
        const { ok, data } = await fetchAPI('/admin/stats');
        if (ok && data.success) {
            setStats(data.data);
        } else {
            setError(data.message || 'Failed to load statistics.');
        }
    };

    useEffect(() => {
        loadStats();
    }, []);

    return (
        <div className="container">
            <h2>System Overview</h2>
            
            {error && <p className="error-msg">{error}</p>}
            
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                {stats ? (
                    <>
                        <div className="event-card" style={{ flex: '1', padding: '2rem', textAlign: 'center', minWidth: '250px' }}>
                            <h3>Total Users</h3>
                            <h1 style={{ color: 'var(--accent)', fontSize: '3rem', margin: '1rem 0 0' }}>
                                {stats.totalUsers}
                            </h1>
                        </div>
                        <div className="event-card" style={{ flex: '1', padding: '2rem', textAlign: 'center', minWidth: '250px' }}>
                            <h3>Total Events</h3>
                            <h1 style={{ color: 'var(--accent)', fontSize: '3rem', margin: '1rem 0 0' }}>
                                {stats.totalEvents}
                            </h1>
                        </div>
                        <div className="event-card" style={{ flex: '1', padding: '2rem', textAlign: 'center', minWidth: '250px' }}>
                            <h3>Total Registrations</h3>
                            <h1 style={{ color: 'var(--accent)', fontSize: '3rem', margin: '1rem 0 0' }}>
                                {stats.totalRegistrations}
                            </h1>
                        </div>
                    </>
                ) : (
                    !error && <p>Loading statistics...</p>
                )}
            </div>
        </div>
    );
}