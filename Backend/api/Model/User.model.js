const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,  
        trim: true,
        unique:true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        trim: true,
 
    },
  
});

const user = mongoose.model('User', userSchema);

module.exports = user;