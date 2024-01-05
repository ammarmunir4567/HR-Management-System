const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late'],
    default: 'Present',
  },
  // You can add more attendance-related fields if needed.
});

const reviewSchema = new Schema({
  month: {
      type: Date,
      required: true
  },
  rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10
  },
  description: String
});

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    unique:true
  },
  address: {
    type: String,
    required: true,
    minlength: 2,
  },
  phoneNo: {
    type: String,
    required: true,
    maxlength: 11,
    trim: true,
    unique:true
  },
  team: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  salary: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  doj: {
    type: Date,
  },
  gender: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  attendance: [attendanceSchema],
  
  reviews: [reviewSchema]
});

// Ensure that an employee can have attendance records for a particular date only once
employeeSchema.index({ '_id': 1, 'attendance.date': 1 }, { unique: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
