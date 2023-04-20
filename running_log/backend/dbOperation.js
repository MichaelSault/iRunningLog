const config = require('./dbConfig'),
    sql = require('mssql');

const createUser = async(newUserInfo) => {
    try {
        let pool = await sql.connect(config);
        console.log(newUserInfo);
        let newUser = await pool.request().query(`INSERT INTO Runners(First, Last, Email, Display, Password) VALUES ('${newUserInfo.First}', '${newUserInfo.Last}', '${newUserInfo.Email}', '${newUserInfo.Username}', '${newUserInfo.Password}')`);
        return newUser;
    }
    catch(error) {
        console.log(error);
    }
}

const getActivities = async(runnerID) => {
    try {
        let pool = await sql.connect(config);
        console.log("getActivities", runnerID.Token);
        let returnedUserActivity = await pool.request().query(`SELECT * FROM Runs WHERE RunnerID = '${runnerID.Token}' `);
        console.log("Returned User Activities ", returnedUserActivity.recordset);

        return returnedUserActivity;
    }
    catch(error) {
        console.log(error);
    }
}

const loginUser = async(userCredentials) => {
    console.log(userCredentials);

    try {
        let pool = await sql.connect(config);
        console.log(userCredentials);
        let returnedUser = await pool.request().query(`SELECT * FROM Runners WHERE Email = '${userCredentials.Email}' AND Password = '${userCredentials.Password}'`);
        console.log("Returned User Email ", returnedUser.recordset[0].Email);
        console.log("Returned User Password ", returnedUser.recordset[0].Password);

        return returnedUser;
    }
    catch(error) {
        console.log(error);
    }
}

const logRun = async(newRunData) => {
    try {
        let pool = await sql.connect(config);
        console.log(newRunData);
        let newRun = await pool.request().query(`INSERT INTO Runs(RunnerID, Title, Date, Distance, Time, Description, Effort) VALUES ('${newRunData.RunnerID}', '${newRunData.Title}', '${newRunData.Date}', '${newRunData.Distance}', '${newRunData.Time}', '${newRunData.Description}', '${newRunData.Effort}')`);
        return newRun;
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    createUser,
    getActivities,
    loginUser,
    logRun
}