const express = require('express'),
    JWT = require('./backend/JWT'),
    dbOperation = require('./backend/dbOperation'),
    cors = require('cors');

const API_PORT = process.env.PORT || 5000; 
const app = express(); //starts the server

let client;
let session;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

////////////////////////////////////////////////////
////////////////JWT Functions///////////////////////
////////////////////////////////////////////////////

//returns data from JWT payload
app.post('/decodeJWT', async(req, res) => {
    //set JWT
    const jwtToVerify = req.body.Token;
    //validate JWT
    const validated = await JWT.verifyJWT(jwtToVerify);
    console.log(validated);
    //if valid, decode the payload
    if (validated){
        console.log("JWT to decode: " + jwtToVerify);
        const decoded = await JWT.decodeJWT(jwtToVerify);
        console.log("decoded token: " + decoded);
        res.send(decoded);
    } else {
        throw new Error("Invalid Signature!");
    }
});

app.post('/JWT', async(req, res) => {
    //console.log("called JWT on server.js");
    console.log(req.body.Token);
    const JasonWebToken = await JWT.getJWT(req.body);
    console.log("JWT Returned by the function: " + JasonWebToken);
    const decoded = await JWT.decodeJWT(JasonWebToken);
    console.log("decoded token: " + decoded);
    console.log(req.body);
    const validated = await JWT.verifyJWT(JasonWebToken);
    console.log(validated);
    res.send(JasonWebToken);

});

//returns true if valid JWT
app.post('/verifyJWT', async(req, res) => {
    const jwtToVerify = req.body.Token;
    console.log("JWT to verify: " + jwtToVerify);
    const validated = await JWT.verifyJWT(jwtToVerify);
    console.log(validated);
    res.send(req.body); 
});

////////////////////////////////////////////////////
////////////////Setter Functions////////////////////
////////////////////////////////////////////////////
app.post('/createUser', async(req, res) => {
    const result = await dbOperation.createUser(req.body);
    console.log(result);
});

app.post('/logRun', async(req, res) => {
    const result = await dbOperation.logRun(req.body);
    console.log(result);
});

app.post('/setComment', async(req, res) => {
    console.log(req.body);
    const result = await dbOperation.setComment(req.body);
    console.log(result);
});

app.post('/setLike', async(req, res) => {
    console.log(req.body);
    const newLike = await dbOperation.setLike(req.body);
    console.log(newLike);
});


////////////////////////////////////////////////////
///////////////////Get Functions////////////////////
////////////////////////////////////////////////////
app.post('/getActivity', async(req, res) => {
    console.log(req.body);
    const activityData = await dbOperation.getActivity(req.body);
    console.log("User activities: ", activityData);

    res.send(activityData);
});

app.post('/runHistory', async(req, res) => {
    console.log(req.body);
    const runnerActivity = await dbOperation.getActivities(req.body);
    console.log("User activities: ", runnerActivity);

    res.send(runnerActivity);
});

app.post('/loginUser', async(req, res) => {
    const result = await dbOperation.loginUser(req.body);
    console.log("Returned From Query");
    console.log(result.recordset[0]);
    res.send(result.recordset[0]);
});

app.post('/commentHistory', async(req, res) => {
    console.log(req.body);
    const activityComments = await dbOperation.getComments(req.body);
    console.log("Activity Comments: ", activityComments);

    res.send(activityComments);
});

app.post('/getActivityLikes', async(req, res) => {
    const activityLikes = await dbOperation.getActivityLikes(req.body);

    res.send(activityLikes);
});



app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));