const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const { readdirSync } = require('fs');
const connectDB = require('./Config/Db');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit:'20mb'}));
app.use(cors());

// Route
// http://localhost:5000/api
readdirSync('./Routes')
.map((fileInRoutes)=> app.use('/api',require('./Routes/'+fileInRoutes))); 

const port = process.env.PORT;
app.listen(port,()=>{
    console.log("Server is running on port ",port);
});
