const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamname: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 1
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
      trim: true
    },
  });
  
  const Team = mongoose.model('Team', teamSchema);
  
  module.exports = Team;
  