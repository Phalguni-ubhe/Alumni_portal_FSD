const EventModel = require('../models/eventModel');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await EventModel.findAll();
        res.json({ success: true, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch events' });
    }
};

exports.registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user.id;

        const event = await EventModel.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        const existingReg = await EventModel.checkRegistration(eventId, userId);
        if (existingReg) return res.status(400).json({ message: 'Already registered for this event' });

        await EventModel.registerStudent(eventId, userId);
        res.status(201).json({ success: true, message: 'Successfully registered for event' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
};