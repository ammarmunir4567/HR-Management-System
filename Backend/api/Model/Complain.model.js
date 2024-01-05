const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complainSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        trim: true        

    },
   
    category: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
      },

      description: {
      type: String,
      required: true,
      minlength: 5,
      trim: true
    },
    status:{
      type:Boolean,
      required:true
    }
  });
  
  const Complain = mongoose.model('Complain', complainSchema);
  
  module.exports = Complain;
  