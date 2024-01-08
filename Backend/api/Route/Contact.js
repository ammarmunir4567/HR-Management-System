
const express = require('express');
const Contact = require('../Model/Contact.model'); // Adjust the path as needed
const router = express.Router();

// POST route for contact form submission
router.post('/contact', async (req, res) => {
    try {
        const { email, subject, message } = req.body;

        const newContact = new Contact({ email, subject, message });
        await newContact.save();

        res.status(201).send('Contact form submitted successfully');
    } catch (error) {
        res.status(400).send('Error processing request');
    }
});

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).send('Error retrieving contacts');
    }
});

module.exports = router;
