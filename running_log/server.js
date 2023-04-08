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

app.post('/decodeJWT', async(req, res) => {
    console.log("JWT to decode: " + req.body);
    const decoded = await JWT.decodeJWT(req.body);
    //console.log("decoded token: " + decoded);
    //console.log(req.body);
    //const validated = await JWT.verifyJWT(req.body);
    //console.log(validated);
    res.send(req.body);

});


app.post('/JWT', async(req, res) => {
    //console.log("called JWT on server.js");
    //console.log(req.body.Email);
    const JasonWebToken = await JWT.getJWT(req.body);
    console.log("JWT Returned by the function: " + JasonWebToken);
    const decoded = await JWT.decodeJWT(JasonWebToken);
    console.log("decoded token: " + decoded);
    console.log(req.body);
    const validated = await JWT.verifyJWT(JasonWebToken);
    console.log(validated);
    res.send(JasonWebToken);

});

app.post('/createUser', async(req, res) => {
    const result = await dbOperation.createUser(req.body);
    console.log(result);
});

app.post('/loginUser', async(req, res) => {
    const result = await dbOperation.loginUser(req.body);
    console.log("Returned From Query");
    console.log(result.recordset[0]);
    res.send(result.recordset[0]);
});

app.post('/logRun', async(req, res) => {
    const result = await dbOperation.logRun(req.body);
    console.log(result);
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));