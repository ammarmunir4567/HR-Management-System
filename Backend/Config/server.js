const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://l201150:probook4520@cluster0.h1jztek.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const loginRouter = require('../api/Route/User');
app.use('/User', loginRouter);
const teamRouter = require('../api/Route/Team');
app.use('/Team', teamRouter);
const employeeRouter = require('../api/Route/Employee'); 
app.use('/Employee', employeeRouter);
const complainRouter=require('../api/Route/Complain');
app.use('/Complain',complainRouter)
const leaveRouter=require('../api/Route/Leave');
app.use('/Leave',leaveRouter)

const eventRouter=require('../api/Route/Event');
app.use('/Event',eventRouter)



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

