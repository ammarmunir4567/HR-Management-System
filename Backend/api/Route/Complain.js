// Assuming you have Express and your model defined as 'Complain'
const express = require('express');
const router = express.Router();
const Complain = require('../Model/Complain.model');

// Route to display all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complain.find();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a new complaint
router.post('/complaints', async (req, res) => {
  const { name, category, description,status} = req.body;

  // Validate input
  if (!name || !category || !description || !status) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newComplaint = new Complain({ name, category, description, status });
    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/complaints/:id', async (req, res) => {
  try {
    const complaint = await Complain.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update a complaint by ID
router.put('/complaints/:id', async (req, res) => {
  const { name, category, description , status} = req.body;

  // Validate input
  if (!name || !category || !description || !status) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const complaint = await Complain.findByIdAndUpdate(
      req.params.id,
      { name, category, description, status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;
