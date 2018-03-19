var express = require('express');
var router = express.Router();
var firebaseSDK = require('firebase');


const firebase = require('../database/database');


router.post('/addResearch', (req, res) => {
    var resKey = firebase.database.ref().child('researches').push().key;
    var resRef = firebase.database.ref('researches');

    resRef.child(resKey).set({
        Name: req.body.name,
        Field: req.body.field,
        Username: req.body.username,
        Researcher: req.body.Researcher,
        Description: req.body.description,
        Publish_Date: req.body.submitdate,
        Details: req.body.details,
    }).then((result) => {
        res.send({success: true, message: 'Research added successfully'});
    }).catch((err) => {
        console.log(err);
        res.send({success: true, message: err.message});
    })
});

router.get('/getResearches', (req, res) => {
    var resRef = firebase.database.ref('researches');
    var user = firebase.authentication.currentUser;
    if (user != null) {
        console.log('User is signed in');
    } else {
        console.log('User is not signed in');
    }

    var userRef = firebase.database.ref('users').child(user.uid);
    userRef.on("value", (snapshot) =>{
        var username = snapshot.child('Username').val();
        console.log(username);
        resRef.orderByChild("Username").equalTo(username).once("value", (snapshot) =>{
            // console.log(snapshot.val());
            res.json(snapshot.val());
        }, (error) => {
            console.log(error.message);
        })
        })
    }, (error) => {
        console.log(error.message);
});

router.post('/submitJob', (req, res) => {
    var jobKey = firebase.database.ref().child('jobs').push().key;
    var jobRef = firebase.database.ref('jobs');

    jobRef.child(jobKey).set({
        Job_Title: req.body.name,
        Field: req.body.field,
        Username: req.body.username,
        Contact_Details: req.body.contact,
        Description: req.body.description,
        Date: req.body.submitdate,
    }).then((result) => {
        res.send({success: true, message: 'Job added successfully'});
    }).catch((err) => {
        console.log(err);
        res.send({success: true, message: err.message});
    })
});

router.get('/getJobs', (req, res) => {
    var jobRef = firebase.database.ref('jobs');
    jobRef.once("value", (snapshot) => {
        // console.log(snapshot.val());
        res.send(snapshot.val())
    })
});





module.exports = router;