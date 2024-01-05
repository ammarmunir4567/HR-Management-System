// eventsRouter.js
const express = require('express');
const router = express.Router();
const Event = require('../Model/Event.model'); // Import the event model

// Post an event
router.post('/add', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).send(event);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find({});
        res.send(events);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
