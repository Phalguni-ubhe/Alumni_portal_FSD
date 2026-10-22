import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <main className="container hero" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                Connect. Engage. Grow.
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--muted)', marginBottom: '2rem', maxWidth: '600px' }}>
                The unified platform for student event registrations, alumni networking, and campus career opportunities.
            </p>
            <div className="hero-buttons" style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/login" className="btn btn-primary">Sign In to Dashboard</Link>
            </div>
        </main>
    );
}