import { useState, useEffect } from 'react';
import { fetchAPI } from '../utils/api';

export default function AlumniDashboard() {
    const [directory, setDirectory] = useState([]);
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [gradYear, setGradYear] = useState('');

    const loadDirectory = async () => {
        const { ok, data } = await fetchAPI('/alumni/directory');
        if (ok && data.success) {
            setDirectory(data.data);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const payload = { company, job_title: jobTitle, graduation_year: gradYear };
        
        const { ok, data } = await fetchAPI('/alumni/profile', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        
        alert(data.message);
        if (ok) {
            loadDirectory(); // Refresh directory to show updates
            setCompany(''); setJobTitle(''); setGradYear(''); // clear form
        }
    };

    useEffect(() => {
        loadDirectory();
    }, []);

    return (
        <div className="container">
            <section className="profile-section" style={{ marginBottom: '3rem' }}>
                <h3>Update Career Profile</h3>
                <form onSubmit={handleProfileUpdate} className="auth-container" style={{ margin: '1rem 0' }}>
                    <div className="form-group">
                        <label>Company</label>
                        <input type="text" value={company} onChange={e => setCompany(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Graduation Year</label>
                        <input type="number" value={gradYear} onChange={e => setGradYear(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Save Profile</button>
                </form>
            </section>

            <section className="directory-section">
                <h3>Alumni Directory</h3>
                <div className="events-grid">
                    {directory.length > 0 ? (
                        directory.map((alumnus, idx) => (
                            <div className="event-card" key={idx}>
                                <div className="event-card-body">
                                    <h3>{alumnus.name}</h3>
                                    <p className="event-meta">Class of {alumnus.graduation_year}</p>
                                    <p><strong>{alumnus.job_title}</strong> at {alumnus.company}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No alumni profiles found.</p>
                    )}
                </div>
            </section>
        </div>
    );
}