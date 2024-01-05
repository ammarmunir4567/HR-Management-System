const express = require('express');
const router = express.Router();
const Leave = require('../Model/Leave.model'); 

// Route to get all leave data
router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a new leave request
router.post('/add', async (req, res) => {
  const { name,date_of_start, date_of_end, lType, reason } = req.body;

  const newLeave = new Leave({
    name,
    date_of_start,
    date_of_end,
    lType,
    reason
  });

  try {
    const savedLeave = await newLeave.save();
    res.status(201).json(savedLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a leave request by ID
router.delete('/leaves/:id', async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    res.json({ message: 'Leave request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update a leave request by ID
router.put('/leaves/:id', async (req, res) => {
  const { name,date_of_start, date_of_end, lType, reason } = req.body;

  try {
    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { name,date_of_start, date_of_end, lType, reason },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    res.json(updatedLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
