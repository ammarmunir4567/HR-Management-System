const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  name:{
    type:String,
    required:true,
    minlength:2
  },
    date_of_start: {
      type: Date,
      required: true,
      
    },
    date_of_end: {
        type: Date,
        required: true,
      },
    lType: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
      },

    reason: {
      type: String,
      required: true,
      minlength: 3,
      trim: true
    },
  });
  
  const Leave = mongoose.model('Leave', leaveSchema);
  
  module.exports = Leave;
  