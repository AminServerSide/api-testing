const express = require('express');
const fs = require('fs');
const path = require('path');
const { Router } = require("express");
const app = express();
const port = 3000;

const userRouter = require('./routes/userRouter');

// Middleware to parse JSON request bodies
app.use(express.json()); 
const dbPath = path.join(__dirname, 'database', 'users.json');

// Utility function to read data from the JSON file
const readDb = () => {
    if (!fs.existsSync(dbPath)) {
        return [];
    }
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

// Utility function to write data to the JSON file
const writeDb = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

app.use('/users', userRouter); 


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
