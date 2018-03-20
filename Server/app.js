//packages
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const firebase = require('./database/database');

//express setup
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

//routes
const users = require('./Routes/Users');
const research = require('./Routes/Research');
app.use('/users', users);
app.use('/research', research);

app.get('/', (req, res) => {
    console.log("Invalid")
});

//firebase connection check
var fireConnection = firebase.database.ref('.info/connected');
fireConnection.on("value", (con) => {
    if (con.val() === true) {
        console.log("Connected to Firebase...");
    }
    else {
        console.log("Not connected to Firebase!");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});