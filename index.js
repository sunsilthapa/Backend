
// // Importing packages
// import express from 'express';
// import dotenv from 'dotenv';
// import connectToDB from './database/db.js';
// import cors from 'cors';

// // Making express app
// const app = express();

// // Configuring dotenv
// dotenv.config();

// // CORS config to accept req from frontend
// const corsOptions = {
//     origin: true,
//     credentials: true,
//     optionSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// // Connect to database
// connectToDB();

// // Accepting JSON data
// app.use(express.json());

// // Creating test route
// app.get("/test", (req, res) => {
//     res.send("hello from server");
// });

// // Defining routes
// import userRoutes from './routes/userRoutes.js';
// app.use('/api/user', userRoutes);
// // http://localhost:5000/api/user/create
// // import productRoutes from './routes/productRoutes.js';
// // app.use('/api/product', productRoutes);

// // Task: create /hello route
// app.get('/hello', (req, res) => {
//     res.status(200).send("hello world!");
// });

// // Defining port
// const PORT = process.env.PORT;

// // Running the server
// app.listen(PORT, () => {
//     console.log(`server is running on port ${PORT}`);
// });













//importing packages
const express = require('express');
const dotenv = require('dotenv');
const connectToDB = require('./database/db.js');
const cors = require('cors');

//making express app
const app = express();

//configuring dotenv
dotenv.config();

//cors config to accept req from frontend
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

//connect to database
connectToDB();

//accepting json data
app.use(express.json());

//creating test route
app.get("/test",(req , res)=>{
    res.send("hello from server")
});


//defining routes
app.use('/api/user', require('./routes/userRoutes'))
//http://localhost:5000/api/user/create
// app.use('/api/product',require('./routes/productRoutes'))

//task create /hello route
app.get('/hello',(req,res)=>{
    res.status(200).send("hello world!")
});

//defining port
const PORT= process.env.PORT;

//running the server
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})