import { useState, useEffect } from 'react';
import { fetchAPI } from '../utils/api';

export default function StudentDashboard() {
    const [events, setEvents] = useState([]);

    const loadEvents = async () => {
        const { ok, data } = await fetchAPI('/events');
        if (ok) setEvents(data.data);
    };

    const register = async (id) => {
        const { ok, data } = await fetchAPI(`/events/${id}/register`, { method: 'POST' });
        alert(data.message);
        if (ok) loadEvents();
    };

    useEffect(() => { loadEvents(); }, []);

    return (
        <div className="container">
            <h2>Upcoming Events</h2>
            <div className="events-grid">
                {events.map(event => (
                    <div className="event-card" key={event.event_id}>
                        <div className="event-card-body">
                            <h3>{event.title}</h3>
                            <p className="event-meta">📅 {new Date(event.event_date).toLocaleDateString()}</p>
                            <p>{event.description}</p>
                            <button className="btn btn-primary" onClick={() => register(event.event_id)}>
                                Register Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}