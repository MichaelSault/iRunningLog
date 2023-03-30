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

app.post('/JWT', async(req, res) => {
    const JasonWebToken = await JWT.getJWT();
    console.log(JasonWebToken);
})

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

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));